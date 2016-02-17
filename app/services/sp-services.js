/**
  @module service-desk
*/
import Ember from 'ember';
import ENV from '../config/environment';
import FieldVersionObject from 'servicedesk/models/field-version';

/*
  Mock the SPServices object for when we're in dev/test mode
*/
const SPServices = function (/*params*/) {
  // switch(params.operation) {
  //   case 'GetVersionCollection':
  //     let xml = `<Version>
  //       <Comment>Abc</Comment>
  //       <Modified>2015-11-13T10:21:02Z</Modified>
  //       <Editor>11;#Test User,#DOMAIN\test.user,#test.user@example.com,#,#Test User</Editor>
  //     </Version>`;
  //     params.completefunc({
  //       responseText: Ember.$.parseXML(xml)
  //     });
  //     break;
  // }
};

/*
  Create a mock current user
*/
SPServices.SPGetCurrentUser = () => {
  return {
    Id: 10,
    Title: 'Test User',
    EMail: 'test.user@example.com'
  };
};

/*
  Create a mock FieldVersionObject
*/
function createFieldVersion(store, value, modified) {
  return FieldVersionObject.create({
    store: store,
    value: value,
    modified: modified,
    editor: `11;#Test User,#DOMAIN\test.user,#test.user@example.com,#,#Test User`
  });
}


/**
  ## SpServices Service

  This is a wrapper around the jQuery.SPServices library for SharePoint.

  https://github.com/sympmarc/SPServices

  @class SpServicesService
  @namespace Services
*/
export default Ember.Service.extend({

  /**
    @property store
    @type {Object}
    @private
  */
  store: Ember.inject.service(),

  /**
    The `SPServices` object.

    @property SPServices
    @type {Object}
    @private
  */
  _SPServices: (ENV.environment === 'production') ? Ember.$().SPServices : SPServices,

  /**
    ## GetCurrentUser

    Get the current user.

    @method getCurrentUser
    @return {Object}
  */
  getCurrentUser() {
    let _SPServices = this.get('_SPServices');
    if (!_SPServices) { return; }
    let currentUser =  _SPServices.SPGetCurrentUser({
      fieldNames: ["Id", "Title", 'EMail']
    });
    return Ember.Object.create({
      id: currentUser.Id,
      title: currentUser.Title,
      email: currentUser.EMail
    });
  },

  /**
    ## GetVersionCollection

    Call the `GetVersionCollection` operation.

    ```
    // an array to store the version collection in
    let versionCollection = [];

    spServices.getVersionCollection(listName, itemId, fieldName, versionCollection);
    ```

    @method getVersionCollection
    @param {String} strlistID
    @param {String} strlistItemID
    @param {String} strFieldName
    @param {Array} versionCollection
  */
  getVersionCollection(strlistID, strlistItemID, strFieldName, versionCollection) {
    let {_SPServices, store} = this.getProperties('_SPServices', 'store');
    if (ENV.environment === 'development') {
      versionCollection.pushObject(createFieldVersion(store, 'abc', '2015-11-03T10:20:02Z'));
      versionCollection.pushObject(createFieldVersion(store, 'def', '2015-11-10T10:20:02Z'));
    } else {
      if (!_SPServices || !strlistID || !strlistItemID || !strFieldName) { return; }
      _SPServices({
        operation: "GetVersionCollection",
        async: true,
        strlistID: strlistID,
        strlistItemID: strlistItemID,
        strFieldName: strFieldName,
        completefunc: function (xData /*, Status*/) {
          Ember.$(xData.responseText).find("Version").each(function(/*i*/) {
            versionCollection.pushObject(FieldVersionObject.create({
              store: store,
              // [ Ember.String.camelize(strFieldName) ]: Ember.$(this).attr(strFieldName),
              value: Ember.$(this).attr(strFieldName),
              modified: Ember.$(this).attr("Modified"),
              editor: Ember.$(this).attr("Editor")
            }));
          });
        }
      });
    }
  }
});
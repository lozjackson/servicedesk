/**
  @module service-desk
*/
import Ember from 'ember';
import SpServicesService from 'ember-spservices/services/sp-services';
import ENV from '../config/environment';
import FieldVersionObject from 'servicedesk/models/field-version';

const run = Ember.run;

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
export default SpServicesService.extend({

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
    ## GetVersionCollection

    Call the `GetVersionCollection` operation.

    ```
    // an array to store the version collection in
    let versionCollection = [];

    spServices.getVersionCollection(listName, itemId, fieldName, versionCollection, callback);
    ```

    @method getVersionCollection
    @param {String} strlistID
    @param {String} strlistItemID
    @param {String} strFieldName
    @param {Array} versionCollection
    @param {Function} callback
  */
  getVersionCollection(strlistID, strlistItemID, strFieldName, versionCollection, callback) {
    let store = this.get('store');
    if (ENV.environment === 'development') {
      run.later(this, function () {
        if (typeof callback === 'function') {
          callback.call(this, null, 'success');
        }
        versionCollection.pushObject(createFieldVersion(store, 'abc', '2015-11-03T10:20:02Z'));
        versionCollection.pushObject(createFieldVersion(store, 'def', '2015-11-10T10:20:02Z'));
      }, 500);
    } else {
      this._super(strlistID, strlistItemID, strFieldName, function (xData, status) {
        if (typeof callback === 'function') {
          callback.call(this, xData, status);
        }
        Ember.$(xData.responseText).find("Version").each(function(/*i*/) {
          versionCollection.pushObject(FieldVersionObject.create({
            store: store,
            value: Ember.$(this).attr(strFieldName),
            modified: Ember.$(this).attr("Modified"),
            editor: Ember.$(this).attr("Editor")
          }));
        });
      });
    }
  }
});

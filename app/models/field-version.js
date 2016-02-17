/**
  @module service-desk
*/
import Ember from 'ember';
import FieldVersionObject from 'ember-spservices/objects/field-version';

const computed = Ember.computed;

/**
  @class FieldVersionObject
  @namespace Models
*/
export default FieldVersionObject.extend({

  /**
    @property store
    @type {Object}
    @private
  */
  store: null,

  /**
    Computed property

    The `person` model for the version.

    @property _editor
    @type {Object}
  */
  _editor: computed('_editorId', 'store', function () {
    let { store, _editorId:id } = this.getProperties('store', '_editorId');
    if (!store || !id) { return; }
    return store.findRecord('person', id);
  })
});

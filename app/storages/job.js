/**
  @module service-desk
*/
import StorageObject from 'ember-local-storage/local/object';

/**
  @class JobStorage
  @namespace Storages
*/
const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      /**
        The edit panel will close when the `job` model is saved.

        @property closeEditPanelOnSave
        @type {Boolean}
        @default true
      */
      closeEditPanelOnSave: true,

      /**
        Transition to the `index` route when the `job` model is saved.

        @property gotoIndexOnSave
        @type {Boolean}
        @default true
      */
      gotoIndexOnSave: true
    };
  }
});

export default Storage;

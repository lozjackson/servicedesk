/**
  @module service-desk
*/
import StorageObject from 'ember-local-storage/local/object';

/**
  ## Job Config

  This storage object is for the jobs page to store config settings.

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

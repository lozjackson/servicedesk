/**
  @module service-desk
*/
import Ember from 'ember';

/**
  @class EditPanelComponent
  @namespace Components
*/
export default Ember.Component.extend({

  /**
    @property classNames
    @type {Array}
    @private
    @default `['edit-panel']`
  */
  classNames: ['edit-panel'],

  actions: {

    /**
      ACTION

      Close the edit panel.

      @method close
    */
    close() {
      this.sendAction('close');
    }
  }
});

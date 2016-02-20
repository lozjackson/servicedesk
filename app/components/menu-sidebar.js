/**
  @module service-desk
*/
import Ember from 'ember';

/**
  @class MenuSidebarComponent
  @namespace Components
*/
export default Ember.Component.extend({

  /**
    @property classNames
    @type {Array}
    @private
    @default `['top-level-container']`
  */
  classNames: ['top-level-container'],

  /**
    @property menuOpen
    @type {Boolean}
  */
  menuOpen: false,

  /**
    @property showSettings
    @type {Boolean}
  */
  showSettings: false,

  /**
    @method _toggleShowSettings
    @private
  */
  _toggleShowSettings() {
    this.toggleProperty('showSettings');
  },

  /**
    @method _gotoIndex
    @private
  */
  _gotoIndex() {
    this.sendAction('transitionToRoute', 'index');
  },

  actions: {

    /**
      ACTION

      @method toggleShowSettings
    */
    toggleShowSettings() {
      this._toggleShowSettings();
    },

    /**
      ACTION

      @method gotoIndex
    */
    gotoIndex() {
      this.set('menuOpen', false);
      this._gotoIndex();
    }
  }
});

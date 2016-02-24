/**
  @module service-desk
*/
import Ember from 'ember';

const computed = Ember.computed;
const alias = computed.alias;

/**
  @class JobController
  @namespace Controllers
*/
export default Ember.Controller.extend({

  /**
    ## Job Config

    Alias of `config.job`.

    This is a localStorage object that is saved on the user's machine.  Any properties
    set on this object will be persisted, but will be specific to the user's machine.

    @property jobConfig
    @type {Object}
    @private
  */
  jobConfig: alias('config.job'),

  /**
    @property showEditPanel
    @type {Boolean}
    @default `false`
  */
  showEditPanel: false,

  /**
    @property problemDescriptionRequired
    @type {Boolean}
    @default `true`
  */
  problemDescriptionRequired: true,

  /**
    ## Status Options

    * Active
    * Awaiting External Action
    * Solution in Test
    * Complete
    * Closed

    @property statusOptions
    @type {Array}
  */
  statusOptions: [
    'Active',
    'Awaiting External Action',
    'Solution in Test',
    'Completed',
    'Closed'
  ],

  /**
    Computed property

    True means the save button will be disabled

    @property saveDisabled
    @type {Boolean}
  */
  saveDisabled: computed('model.hasDirtyAttributes', 'model.newProblemDescription', 'problemDescriptionRequired', function () {
    return (this.get('model.hasDirtyAttributes') && this.checkProblemDescription()) ? false : true;
  }),

  /**
    Computed property

    True means the cancel button will be disabled

    @property cancelDisabled
    @type {Boolean}
  */
  cancelDisabled: computed('model.hasDirtyAttributes', function () {
    return (this.get('model.hasDirtyAttributes')) ? false : true;
  }),

  /**
    Check that the `problemDescription` property is not empty.

    True means the `problemDescription` property is not empty, or the
    `problemDescriptionRequired` property is false.

    @method checkProblemDescription
    @return {Boolean}
  */
  checkProblemDescription() {
    if (this.get('problemDescriptionRequired') && !this.get('model.newProblemDescription')) {
      this.set('showEditPanel', true);
      return false;
    }
    return true;
  },

  /**
    Transition to the index route

    @method _gotoIndex
    @private
  */
  _gotoIndex() {
    this.transitionToRoute('index');
  },

  /**
    @method _openEditPanel
    @private
  */
  _openEditPanel() {
    this.set('showEditPanel', true);
  },

  /**
    @method _closeEditPanel
    @private
  */
  _closeEditPanel() {
    this.set('showEditPanel', false);
  },

  /**
    Save the model, close the edit panel and transition to Index.

    @method _save
    @private
  */
  _save() {
    let model = this.get('model');
    let jobConfig = this.get('jobConfig');

    model.set('problemDescription', model.get('newProblemDescription'));
    model.set('newProblemDescription', null);
    model.save();

    if (jobConfig) {
      if (jobConfig.get('closeEditPanelOnSave')) {
        this._closeEditPanel();
      }
      if (jobConfig.get('gotoIndexOnSave')) {
        this._gotoIndex();
      }
    }
  },


  /**
    Cancel - call `rollbackAttributes` on the model and close the edit panel

    @method _cancel
    @private
  */
  _cancel() {
    let model = this.get('model');
    model.rollbackAttributes();
    model.set('newProblemDescription', null);
    this._closeEditPanel();
  },

  actions: {

    /**
      ACTION

      @method gotoIndex
    */
    gotoIndex() {
      this._gotoIndex();
    },

    /**
      ACTION

      @method addProblemDescription
    */
    addProblemDescription() {
      this._openEditPanel();
    },

    /**
      ACTION

      @method save
    */
    save() {
      this._save();
    },

    /**
      ACTION

      @method cancel
    */
    cancel() {
      this._cancel();
    },

    /**
      ACTION

      @method closeProblemDescription
    */
    closeProblemDescription() {
      this._closeEditPanel();
    }
  }
});

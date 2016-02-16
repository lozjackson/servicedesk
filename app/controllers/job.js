/**
  @module service-desk
*/
import Ember from 'ember';

const computed = Ember.computed;

/**
  @class JobController
  @namespace Controllers
*/
export default Ember.Controller.extend({

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
    'Complete',
    'Closed'
  ],

  /**
    Computed property

    True means the save button will be disabled

    @property saveDisabled
    @type {Boolean}
  */
  saveDisabled: computed('model.hasDirtyAttributes', 'model.problemDescription', 'problemDescriptionRequired', function () {
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
    if (this.get('problemDescriptionRequired') && !this.get('model.problemDescription')) {
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
    Save the model and close the edit panel

    @method _save
    @private
  */
  _save() {
    let model = this.get('model');
    model.save();
    this._closeEditPanel();
  },

  /**
    Cancel - call `rollbackAttributes` on the model and close the edit panel

    @method _cancel
    @private
  */
  _cancel() {
    let model = this.get('model');
    model.rollbackAttributes();
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

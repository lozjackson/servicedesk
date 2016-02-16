/**
  @module service-desk
*/
import Ember from 'ember';

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

  // saveDisabled: computed('model.hasDirtyAttributes', 'model.problemDescription', 'problemDescriptionRequired', function () {
  //   let model = this.get('model');
  //   return (model.get('hasDirtyAttributes') && this.checkProblemDescription()) ? false : true;
  // }),
  //
  // cancelDisabled: computed('model.hasDirtyAttributes', function () {
  //   let model = this.get('model');
  //   return (model.get('hasDirtyAttributes')) ? false : true;
  // }),
  //
  // checkProblemDescription() {
  //   let model = this.get('model');
  //   let problemDescription = model.get('problemDescription');
  //   if (this.get('problemDescriptionRequired') && !problemDescription) {
  //     this.set('showEditPanel', true);
  //     return false;
  //   }
  //   return true;
  // },

  actions: {

    // gotoIndex() {
    //   this.transitionToRoute('index');
    // },

    // addProblemDescription() {
    //   this.set('showEditPanel', true);
    // },
    //
    // save() {
    //   let model = this.get('model');
    //   model.save();
    //   this.set('showEditPanel', false);
    // },
    //
    // cancel() {
    //   let model = this.get('model');
    //   model.rollbackAttributes();
    //   this.set('showEditPanel', false);
    // },
    //
    // closeProblemDescription() {
    //   this.set('showEditPanel', false);
    // }
  }
});

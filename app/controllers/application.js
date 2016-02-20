/**
  @module service-desk
*/
import Ember from 'ember';

/**
  @class ApplicationController
  @namespace Controllers
*/
export default Ember.Controller.extend({

  actions: {

    /**
      ACTION

      @method transitionToRoute
    */
    transitionToRoute() {
      this.transitionToRoute(...arguments);
    }
  }
});

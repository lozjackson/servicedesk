/**
  @module service-desk
*/
import Ember from 'ember';

/**
  @class IndexRoute
  @namespace Routes
*/
export default Ember.Route.extend({

  /**
    findAll `job`

    @method model
    @return {Array}
  */
  model() {
    return this.store.findAll('job');
  }
});

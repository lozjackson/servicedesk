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
    let id = this.get('user.id');
    return id ? this.store.query('job', { $filter: `AssignedTo/Id eq ${id}`}) : this.store.findAll('job');
  }
});

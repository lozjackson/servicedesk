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
    @property queryParams
    @type {Object}
  */
  queryParams: {
    status: {
      refreshModel: true
    }
  },

  /**
    ## Model

    Query `job` models (apply these query params).

    * $select: `Id,Modified,Title,StatusValue,ProblemDescription,AssignedTo/Id,Requester/Id`,
    * $expand: `AssignedTo,Requester`,
    * $filter: `substringof('${this.user.email}',OriginalAssignee) and StatusValue eq '${status}'`

    `this.user.email` is the current user's email, and `status` is the value of the
    `status` query param in the URL.

    @method model
    @param {Object} params
    @return {Array} An array of `JobModel`s
  */
  model(params) {
    let status = params.status || 'Active';
    let filter = `StatusValue eq '${status}'`;
    let email = this.get('user.email');

    if (email) {
      filter = `substringof('${email}',OriginalAssignee) and ${filter}`;
    }

    return this.store.query('job', {
      $select: 'Id,Modified,Title,StatusValue,ProblemDescription,AssignedTo/Id,Requester/Id',
      $expand: 'AssignedTo,Requester',
      $filter: filter
    });
  }
});

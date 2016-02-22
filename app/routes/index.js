/**
  @module service-desk
*/
import Ember from 'ember';

/**
  @class IndexRoute
  @namespace Routes
*/
export default Ember.Route.extend({

  queryParams: {
    status: {
      refreshModel: true
    }
  },
  /**
    findAll `job`

    @method model
    @return {Array}
  */
  model(params) {
    // let id = this.get('user.id');
    // return id ? this.store.query('job', { $filter: `AssignedTo/Id eq ${id}`}) : this.store.findAll('job');

    let select = 'Id,Modified,Title,StatusValue,ProblemDescription,AssignedTo/Id,Requester/Id';
    let expand = 'AssignedTo,Requester';
    let status = params.status || 'Active';
    let email = this.get('user.email');
    let filter = `StatusValue eq '${status}'`;
    if (email) {
      filter = `substringof('${email}',OriginalAssignee) and ` + filter;
    }

    return this.store.query('job', {
      $select: select,
      $expand: expand,
      $filter: filter
    });
  }
});

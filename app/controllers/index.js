/**
  @module service-desk
*/
import Ember from 'ember';

const computed = Ember.computed;
const alias = computed.alias;

/**
  @class IndexController
  @namespace Controllers
*/
export default Ember.Controller.extend({

  /**
    The `JobController`

    This is used to get the `job.statusOptions` property.

    @property job
    @type {Object}
  */
  job: Ember.inject.controller(),

  /**
    An array of `job` models.

    @property model
    @type {Array}
  */
  model: null,

  /**
    ## Query Params

    @property queryParams
    @type {Array}
    @default `['status']`
  */
  queryParams: ['status'],

  /**
    @property status
    @type {String}
    @default `Active`
  */
  status: 'Active',

  /**
    ## Status Options

    An alias of `job.statusOptions`

    * Active
    * Awaiting External Action
    * Solution in Test
    * Complete
    * Closed

    @property statusOptions
    @type {Array}
  */
  statusOptions: alias('job.statusOptions'),

  /**
    Computed Property.

    @property myJobs
    @type {Array}
  */
  myJobs: computed('model.[]', 'model.@each.assignedToEmail', 'user.email', function () {
    let model = this.get('model');
    let currentUserEmail = this.get('user.email');
    return model.filter(function (job) {
      let assignedToEmail = job.get('assignedToEmail');
      return assignedToEmail.indexOf(currentUserEmail) !== -1;
    });
  }),

  /**
    @property jobSortProperties
    @type {Array}
    @default `['_modified:desc']`
  */
  jobSortProperties: ['_modified:desc'],

  /**
    @property sortedJobs
    @type {Array}
  */
  sortedJobs: computed.sort('myJobs', 'jobSortProperties'),

  /**
    @property filteredJobs
    @type {Array}
  */
  filteredJobs: computed('sortedJobs.@each.status', 'status', function () {
    let { sortedJobs, status } = this.getProperties('sortedJobs', 'status');
    return sortedJobs.filterBy('status', status);
  })
});

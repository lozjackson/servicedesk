/**
  @module service-desk
*/
import attr from 'ember-data/attr';
import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

/**
  @class PersonModel
  @namespace Models
*/
export default DS.Model.extend({

  /**
    @property name
    @type {String}
  */
  name: attr('string'),

  /**
    @property workEMail
    @type {String}
  */
  workEMail: attr('string'),

  /**
    @property assignedJobs
    @type {hasMany}
  */
  assignedJobs: hasMany('job', {async: true, inverse: 'assignedTo'}),

  /**
    @property requestedJobs
    @type {hasMany}
  */
  requestedJobs: hasMany('job', {async: true, inverse: 'requester'})
});

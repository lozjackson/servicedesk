/**
  @module service-desk
*/
import Ember from 'ember';
import attr from 'ember-data/attr';
import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

const computed = Ember.computed;
const alias = computed.alias;

/**
  @class JobModel
  @namespace Models
*/
export default DS.Model.extend({

  /**
    @property modified
    @type {String}
  */
  modified: attr('string'),

  /**
    @property title
    @type {String}
  */
  title: attr('string'),

  /**
    @property statusValue
    @type {String}
  */
  statusValue: attr('string'),

  /**
    @property problemDescription
    @type {String}
  */
  problemDescription: attr('string'),

  /**
    @property assignedTo
    @type {hasMany}
  */
  assignedTo: hasMany('person', {async: true, inverse: 'assignedJobs'}),

  /**
    @property requester
    @type {hasMany}
  */
  requester: hasMany('person', {async: true, inverse: 'requestedJobs'}),

  newProblemDescription: null,

  /**
    If this property is `true` the record is in the `dirty` state. The
    record has local changes that have not yet been saved by the
    adapter. This includes records that have been created (but not yet
    saved) or deleted.
    Example
    ```javascript
    var record = store.createRecord('model');
    record.get('hasDirtyAttributes'); // true
    store.findRecord('model', 1).then(function(model) {
      model.get('hasDirtyAttributes'); // false
      model.set('foo', 'some value');
      model.get('hasDirtyAttributes'); // true
    });
    ```
    @property hasDirtyAttributes
    @type {Boolean}
    @readOnly
  */
  hasDirtyAttributes: Ember.computed('currentState.isDirty', 'newProblemDescription', function() {
    return this.get('currentState.isDirty') || this.get('newProblemDescription');
  }),

  /**
    Alias of `statusValue`

    @property status
    @type {String}
  */
  status: alias('statusValue'),

  /**
    ## _modified

    Computed Property.

    Returns a `Date` object with the value of `modified`.

    @property _modified
    @type {Object}
  */
  _modified: computed('modified', function () {
    let modified = this.get('modified');
    return new Date(parseInt(modified.match(/\/Date\(([0-9]+)(?:.*)\)\//)[1]));
  }),

  /**
    An array of email addresses mapped from the `assignedTo` array.

    @property assignedToEmailArray
    @type {Array}
    @private
  */
  assignedToEmailArray: computed.mapBy('assignedTo', 'workEMail'),

  /**
    An array of email addresses mapped from the `requester` array.

    @property requesterEmailArray
    @type {Array}
    @private
  */
  requesterEmailArray: computed.mapBy('requester', 'workEMail'),

  /**
    A string containing the email addresses of all assignees of the job.  Each
    email address is separated by a semicolon.

    ```
    one@domain.com;two@example.com
    ```

    @property assignedToEmail
    @type {String}
  */
  assignedToEmail: computed('assignedToEmailArray.[]', function () {
    return this.get('assignedToEmailArray').join(';');
  }),

  /**
    A string containing the email addresses of all requesters of the job.  Each
    email address is separated by a semicolon.

    ```
    one@domain.com;two@example.com
    ```

    @property requesterEmail
    @type {String}
  */
  requesterEmail: computed('requesterEmailArray.[]', function () {
    return this.get('requesterEmailArray').join(';');
  }),
});

import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const run = Ember.run;

moduleFor('controller:index', {
  needs: [
    'model:job',
    'model:person'
  ],
  beforeEach: function () {
      this.inject.service('store', { as: 'store' });
  }
});

test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});

test('queryParams', function(assert) {
  var controller = this.subject();
  assert.equal(controller.get('queryParams.length'), 1);
  assert.equal(controller.get('queryParams.firstObject'), 'status');
});

test('status should be Active', function(assert) {
  var controller = this.subject();
  assert.equal(controller.get('status'), 'Active');
});

test('statusOptions should be an array', function(assert) {
  var controller = this.subject();
  controller.set('job', Ember.Object.create({
    statusOptions: ['Active', 'Complete', 'Closed']
  }));
  assert.equal(controller.get('statusOptions.length'), 3);
  assert.equal(controller.get('statusOptions')[0], 'Active');
  assert.equal(controller.get('statusOptions')[1], 'Complete');
  assert.equal(controller.get('statusOptions')[2], 'Closed');
});

test('myJobs', function(assert) {
  let controller = this.subject();
  let store = this.store;
  let job1, job2, assignee1, assignee2;
  let model = Ember.A();
  controller.set('user', {email: 'test@example.com'});
  controller.set('model', model);
  run(() => {
    job1 = store.createRecord('job');
    job2 = store.createRecord('job');
    model.pushObjects([job1, job2]);
    assignee1 = store.createRecord('person', {workEMail: 'test@example.com'});
    assignee2 = store.createRecord('person', {workEMail: 'another@example.com'});
  });

  assert.equal(controller.get('myJobs.length'), 0);

  run(() => job1.get('assignedTo').pushObject(assignee1));
  assert.equal(controller.get('myJobs.length'), 1);

  run(() => job2.get('assignedTo').pushObject(assignee2));
  assert.equal(controller.get('myJobs.length'), 1);

  run(() => job1.get('assignedTo').pushObject(assignee2));
  assert.equal(controller.get('myJobs.length'), 1);

  run(() => job2.get('assignedTo').pushObject(assignee1));
  assert.equal(controller.get('myJobs.length'), 2);

  run(() => job1.get('assignedTo').removeObject(assignee1));
  assert.equal(controller.get('myJobs.length'), 1);

  run(() => job2.get('assignedTo').removeObject(assignee1));
  assert.equal(controller.get('myJobs.length'), 0);
});

// jobSortProperties: ['_modified:desc'],
test('jobSortProperties', function (assert) {
  let controller = this.subject();
  assert.equal(controller.get('jobSortProperties.length'), 1);
  assert.equal(controller.get('jobSortProperties')[0], '_modified:desc');
});

test('sortedJobs', function (assert) {

  let controller = this.subject();
  let store = this.store;
  let job1, job2, assignee;
  let model = Ember.A();
  controller.set('user', {email: 'test@example.com'});
  controller.set('model', model);
  run(() => {
    job1 = store.createRecord('job', { _modified: 1 });
    job2 = store.createRecord('job', { _modified: 2 });
    model.pushObjects([job1, job2]);
    assignee = store.createRecord('person', {workEMail: 'test@example.com'});
    job1.get('assignedTo').pushObject(assignee);
    job2.get('assignedTo').pushObject(assignee);
  });
  assert.equal(controller.get('myJobs.length'), 2);
  assert.equal(controller.get('myJobs.firstObject'), job1);
  assert.equal(controller.get('sortedJobs.length'), 2);
  assert.equal(controller.get('sortedJobs.firstObject'), job2);

  run(() => job1.set('_modified', 3));
  assert.equal(controller.get('sortedJobs.firstObject'), job1);

  run(() => job2.set('_modified', 4));
  assert.equal(controller.get('sortedJobs.firstObject'), job2);
});

test('filteredJobs', function (assert) {
  let controller = this.subject();
  let store = this.store;
  let job1, job2, assignee;
  let model = Ember.A();
  controller.set('user', {email: 'test@example.com'});
  controller.set('model', model);
  run(() => {
    job1 = store.createRecord('job', { statusValue: 'Active', _modified: 1 });
    job2 = store.createRecord('job', { statusValue: 'Complete', _modified: 2 });
    model.pushObjects([job1, job2]);
    assignee = store.createRecord('person', {workEMail: 'test@example.com'});
    job1.get('assignedTo').pushObject(assignee);
    job2.get('assignedTo').pushObject(assignee);
  });
  assert.equal(controller.get('myJobs.length'), 2);
  assert.equal(controller.get('filteredJobs.length'), 1);

  run(() => job2.set('statusValue', 'Active'));
  assert.equal(controller.get('filteredJobs.length'), 2);

  run(() => job1.set('statusValue', 'Closed'));
  assert.equal(controller.get('filteredJobs.length'), 1);

  run(() => job2.set('statusValue', 'Closed'));
  assert.equal(controller.get('filteredJobs.length'), 0);
});

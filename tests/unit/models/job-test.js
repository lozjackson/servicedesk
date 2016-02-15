import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

const { get, run } = Ember;

moduleForModel('job', 'Unit | Model | job', {
  needs: [
    'model:person'
  ]
});

test('should be 2 relationships', function(assert) {
  var Model = this.store().modelFor('job');
  var relationships = Ember.get(Model, 'relationshipsByName');
  assert.equal(relationships.size, 2, 'job should have 2 relationships');
});

test('assignedTo should be hasMany', function(assert) {
  var Model = this.store().modelFor('job');
  var relation = get(Model, 'relationshipsByName').get('assignedTo');
  assert.equal(relation.key, 'assignedTo');
  assert.equal(relation.kind, 'hasMany', '`assignedTo` should be `hasMany`' );
});
test('Requester should be hasMany', function(assert) {

  var Model = this.store().modelFor('job');
  var relation = get(Model, 'relationshipsByName').get('requester');
  assert.equal(relation.key, 'requester');
  assert.equal(relation.kind, 'hasMany', '`requester` should be `hasMany`' );
});

test('status should be an alias of statusValue', function (assert) {
  let model = this.subject();
  run(() => model.set('statusValue', 'Active'));
  assert.equal(model.get('status'), 'Active');
});

test('_modified should return a date object', function (assert) {
  let model = this.subject();
  var date = new Date(1455396209000).getTime();
  run(() => model.set('modified', "\/Date(1455396209000)\/"));
  assert.equal(model.get('_modified').getTime(), date);
});

test('assignedToEmailArray', function(assert) {
  let model = this.subject();
  let store = this.store();
  let assignedTo = model.get('assignedTo');
  let assignee1, assignee2;
  run(() => {
    assignee1 = store.createRecord('person', {
      workEMail: 'test1@domain.com'
    });
    assignee2 = store.createRecord('person', {
      workEMail: 'test2@domain.com'
    });
  });
  assert.equal(model.get('assignedToEmailArray.length'), 0, `'assignedToEmailArray.length' should be 0`);
  assert.equal(model.get('assignedToEmailArray'), '', `'assignedToEmailArray' should be empty string`);

  run(() => model.get('assignedTo').pushObject(assignee1));
  assert.equal(assignedTo.get('length'), 1, `'assignedTo.length' should be '1'`);
  assert.equal(model.get('assignedToEmailArray.length'), 1, `'assignedToEmailArray.length' should be 1`);
});

test('assignedToEmail', function(assert) {
  let model = this.subject();
  let store = this.store();
  let assignedTo = model.get('assignedTo');
  let assignee1, assignee2;
  run(() => {
    assignee1 = store.createRecord('person', {
      workEMail: 'test1@domain.com'
    });
    assignee2 = store.createRecord('person', {
      workEMail: 'test2@domain.com'
    });
  });
  assert.equal(model.get('assignedToEmail'), '', `'assignedToEmail' should be empty string`);

  run(() => model.get('assignedTo').pushObject(assignee1));
  assert.equal(assignedTo.get('length'), 1, `'assignedTo.length' should be '1'`);
  assert.equal(model.get('assignedToEmail'), 'test1@domain.com', `'assignedToEmail' should be 'test1@domain.com'`);

  run(() => assignedTo.pushObject(assignee2));
  assert.equal(model.get('assignedToEmail'), 'test1@domain.com; test2@domain.com', `'assignedToEmail' should be 'test1@domain.com; test2@domain.com'`);
});

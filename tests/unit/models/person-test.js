import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

const get = Ember.get;

moduleForModel('person', 'Unit | Model | person', {
  needs: [
    'model:job'
  ]
});

test('should be 2 relationships', function(assert) {
  var Model = this.store().modelFor('person');
  var relationships = Ember.get(Model, 'relationshipsByName');
  assert.equal(relationships.size, 2, 'person should have 2 relationships');
});

test('assignedJobs should be hasMany', function(assert) {
  var Model = this.store().modelFor('person');
  var relation = get(Model, 'relationshipsByName').get('assignedJobs');
  assert.equal(relation.key, 'assignedJobs');
  assert.equal(relation.kind, 'hasMany', '`assignedJobs` should be `hasMany`' );
});

test('requestedJobs should be hasMany', function(assert) {
  var Model = this.store().modelFor('person');
  var relation = get(Model, 'relationshipsByName').get('requestedJobs');
  assert.equal(relation.key, 'requestedJobs');
  assert.equal(relation.kind, 'hasMany', '`requestedJobs` should be `hasMany`' );
});

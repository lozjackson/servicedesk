import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:index', 'Unit | Route | index', {
  needs: [
    'model:job',
    'model:person'
  ]
});

test('queryParams', function (assert) {
    var route = this.subject();
    let queryParams = route.get('queryParams');
    let keys = Object.keys(queryParams);
    assert.ok(queryParams);
    assert.equal(keys.length, 1);
    assert.equal(keys[0], 'status');
    assert.equal(Object.keys(route.get('queryParams.status')).length, 1);
    assert.equal(Object.keys(route.get('queryParams.status'))[0], 'refreshModel');
    assert.equal(route.get('queryParams.status.refreshModel'), true);
});

test('model() method should send query', function(assert) {
  assert.expect(5);
  var route = this.subject();
  let _findAll = route.store.findAll;
  let _query = route.store.query;
  route.set('user', Ember.Object.create({ email: 'test.user@example.com' }));

  route.store.findAll = function () {
    assert.ok(false, `'findAll() should not be called'`);
  };

  route.store.query = function (modelName, query) {
    assert.equal(modelName, 'job');
    assert.equal(query.$select, 'Id,Modified,Title,StatusValue,ProblemDescription,AssignedTo/Id,Requester/Id');
    assert.equal(query.$expand, 'AssignedTo,Requester');
    assert.equal(query.$filter, `substringof('test.user@example.com',OriginalAssignee) and StatusValue eq 'Active'`);
    return [ {id:1}, {id:2} ];
  };

  let jobs = route.model({status:'Active'});
  assert.equal(jobs.get('length'), 2);

  route.store.findAll = _findAll;
  route.store.query = _query;
});

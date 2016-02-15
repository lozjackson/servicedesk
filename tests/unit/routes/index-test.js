import { moduleFor, test } from 'ember-qunit';

moduleFor('route:index', 'Unit | Route | index', {
  needs: [
    'model:job',
    'model:person'
  ]
});

test('model() method should findAll jobs', function(assert) {
  assert.expect(2);
  var route = this.subject();
  let _findAll = route.store.findAll;

  route.store.findAll = function (modelName) {
    assert.equal(modelName, 'job');
    return [ {id:1}, {id:2} ];
  };

  let jobs = route.model();
  assert.equal(jobs.get('length'), 2);

  route.store.findAll = _findAll;
});

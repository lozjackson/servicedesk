import { moduleFor, test } from 'ember-qunit';
import ENV from '../../../config/environment';
import Ember from 'ember';

moduleFor('adapter:application', 'Unit | Adapter | application', {
});

test('host should be ENV.host', function(assert) {
  let adapter = this.subject();
  assert.equal(adapter.get('host'), ENV.host);
});

test('namespace should be ENV.namespace', function(assert) {
  let adapter = this.subject();
  assert.equal(adapter.get('namespace'), ENV.namespace);
});

test('query() method', function (assert) {
  assert.expect(4);
  let adapter = this.subject();
  adapter.setProperties({
    namespace: 'api/server.php',
    ajax: (url, method, obj) => {
      assert.equal(url, '/api/server.php/people?test=1');
      assert.equal(method, 'GET');
      assert.equal(typeof obj, 'undefined');
    }
  });
  let modelType = Ember.Object.create({
    modelName: 'person'
  });
  adapter.query(null, modelType, { test: 1 });
  assert.ok(adapter);
});

test('query() method - add to existing query params', function (assert) {
  assert.expect(4);
  let adapter = this.subject();
  adapter.setProperties({
    queryStringParams: ['$select=Id,Name,Person/id', '$expand=Person'],
    namespace: 'api/server.php',
    ajax: (url, method, obj) => {
      assert.equal(url, '/api/server.php/people?$select=Id,Name,Person/id&$expand=Person&test=1');
      assert.equal(method, 'GET');
      assert.equal(typeof obj, 'undefined');
    }
  });
  let modelType = Ember.Object.create({
    modelName: 'person'
  });
  adapter.query(null, modelType, { test: 1 });
  assert.ok(adapter);
});

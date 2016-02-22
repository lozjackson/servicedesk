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

test('_buildQueryString', function (assert) {
  let adapter = this.subject();

  assert.equal(adapter._buildQueryString({ test: 'Abc' }), 'test=Abc');

  let query = {
    anotherKey: `A longer string with spaces and 'other' ch@racters/and $tuff!!`,
    $key: 2,
    oneMoreForLuck: 'go on then'
  };
  assert.equal(adapter._buildQueryString(query), `anotherKey=A%20longer%20string%20with%20spaces%20and%20'other'%20ch@racters/and%20$tuff!!&$key=2&oneMoreForLuck=go%20on%20then`);
});

test('_appendQueryString', function (assert) {
  let adapter = this.subject();
  let queryString = 'testKey=1&anotherKey=abc';
  let query = { testKey: 1, anotherKey: 'abc' };
  assert.equal(adapter._appendQueryString('example.com/page', query), `example.com/page?${queryString}`);
  assert.equal(adapter._appendQueryString('example.com/page?firstKey=test', query), `example.com/page?firstKey=test&${queryString}`);
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

test('queryRecord() method', function (assert) {
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
  adapter.queryRecord(null, modelType, { test: 1 });
  assert.ok(adapter);
});

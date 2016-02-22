import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:job', 'Unit | Adapter | job', {
  // needs: ['serializer:foo']
});

test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

// test('queryStringParams', function(assert) {
//   let adapter = this.subject();
//   let queryStringParams = adapter.get('queryStringParams');
//   assert.equal(queryStringParams.length, 2);
//   assert.equal(queryStringParams[0], '$select=Id,Modified,Title,StatusValue,ProblemDescription,AssignedTo/Id,Requester/Id');
//   assert.equal(queryStringParams[1], '$expand=AssignedTo,Requester');
// });

test('pathForType() method', function(assert) {
  let adapter = this.subject();
  assert.equal(adapter.pathForType(), 'ServiceDeskLog');
});

test('ajaxOptions() method', function(assert) {
  let adapter = this.subject();
  let hash = adapter.ajaxOptions('example.com', 'PUT', {
    data: {
      job: { id: 1 }
    }
  });
  assert.equal(hash.data, JSON.stringify({ id: 1 }));
});

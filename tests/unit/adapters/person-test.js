import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:person', 'Unit | Adapter | person', {
  // needs: ['serializer:foo']
});

test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('pathForType() method', function(assert) {
  let adapter = this.subject();
  assert.equal(adapter.pathForType(), 'UserInformationList');
});

import { moduleForModel, test } from 'ember-qunit';
import PersonSerializer from 'servicedesk/serializers/person';

moduleForModel('person', 'Unit | Serializer | person', {
  needs: [
    'serializer:person',
    'model:job'
  ]
});

test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});

test('modelNameFromPayloadKey() should return job', function(assert) {
  let serializer = PersonSerializer.create();
  assert.equal(serializer.modelNameFromPayloadKey(), 'person');
});

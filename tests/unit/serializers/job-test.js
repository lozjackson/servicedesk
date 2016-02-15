import { moduleForModel, test } from 'ember-qunit';
import JobSerializer from 'servicedesk/serializers/job';

moduleForModel('job', 'Unit | Serializer | job', {
  needs: [
    'serializer:job',
    'model:person'
  ]
});

test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});

test('serializeHasMany should return undefined', function(assert) {
  let serializer = JobSerializer.create();
  assert.equal(serializer.serializeHasMany(), undefined);
});

test('modelNameFromPayloadKey() should return job', function(assert) {
  let serializer = JobSerializer.create();
  assert.equal(serializer.modelNameFromPayloadKey(), 'job');
});

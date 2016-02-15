import { moduleFor, test } from 'ember-qunit';
import ENV from '../../../config/environment';

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

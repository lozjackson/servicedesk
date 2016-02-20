import { moduleFor, test } from 'ember-qunit';

moduleFor('service:config', 'Unit | Service | config', {
  needs: [
    'storage:job'
  ]
});

test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

test('job set', function(assert) {
  assert.expect(1);
  var service = this.subject();
  let job = service.get('job');
  job.set('closeEditPanelOnSave', true);
  assert.ok(service);
});

test('job get', function(assert) {
  assert.expect(1);
  var service = this.subject();
  let job = service.get('job');
  assert.equal(job.get('closeEditPanelOnSave'), true);
});

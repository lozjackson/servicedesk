import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:job', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});

test('showEditPanel should be false', function(assert) {
  var controller = this.subject();
  assert.equal(controller.get('showEditPanel'), false);
});

test('problemDescriptionRequired should be true', function(assert) {
  var controller = this.subject();
  assert.equal(controller.get('problemDescriptionRequired'), true);
});

test('statusOptions should be an array', function(assert) {
  var controller = this.subject();
  assert.equal(controller.get('statusOptions.length'), 5);
  assert.equal(controller.get('statusOptions')[0], 'Active');
  assert.equal(controller.get('statusOptions')[1], 'Awaiting External Action');
  assert.equal(controller.get('statusOptions')[2], 'Solution in Test');
  assert.equal(controller.get('statusOptions')[3], 'Complete');
  assert.equal(controller.get('statusOptions')[4], 'Closed');
});

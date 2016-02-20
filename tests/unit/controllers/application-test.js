import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:application', {
});

test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});

test('transitionToRoute action', function(assert) {
  assert.expect(2);
  var controller = this.subject();
  controller.set('transitionToRoute', (routeName) => {
    assert.equal(routeName, 'index');
  });
  controller.send('transitionToRoute', 'index');
  assert.ok(controller);
});

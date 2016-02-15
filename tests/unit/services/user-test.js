import { moduleFor, test } from 'ember-qunit';

moduleFor('service:user', 'Unit | Service | user', {
  // needs: ['service:foo']
});

test('init() method sets the model property with the current user', function (assert) {
  var service = this.subject();
  let model = service.get('model');
  assert.equal(model.get('id'), 10);
  assert.equal(model.get('title'), 'Test User');
  assert.equal(model.get('email'), 'test.user@example.com');
});

test('id should be an alias of model.id', function (assert) {
  var service = this.subject();
  let id = service.get('model.id');
  assert.equal(service.get('id'), id);
});

test('title should be an alias of model.title', function (assert) {
  var service = this.subject();
  let title = service.get('model.title');
  assert.equal(service.get('title'), title);
});

test('email should be an alias of model.email', function (assert) {
  var service = this.subject();
  let email = service.get('model.email');
  assert.equal(service.get('email'), email);
});

test('getUser() method returns a user object', function (assert) {
  var service = this.subject();
  let user = service.getUser();
  assert.equal(user.id, 10);
  assert.equal(user.title, 'Test User');
  assert.equal(user.email, 'test.user@example.com');
});

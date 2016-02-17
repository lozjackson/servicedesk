import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:user', 'Unit | Service | user', {
});

test('init() method sets the model property with the current user', function (assert) {

  var service = this.subject();
  service.set('spServices', Ember.Object.create({
    getCurrentUser() {
      return Ember.Object.create({
        id: 10,
        title: 'Test User',
				email: 'test.user@example.com'
			});
    }
  }));
  service.init();
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

test('email should be an alias of model.eMail', function (assert) {
  var service = this.subject();
  let email = service.get('model.eMail');
  assert.equal(service.get('email'), email);
});

test('getUser() method returns a user object', function (assert) {
  var service = this.subject();
  service.set('spServices', Ember.Object.create({
    getCurrentUser() {
      return Ember.Object.create({
        id: 10,
        title: 'Test User',
				email: 'test.user@example.com'
			});
    }
  }));
  let user = service.getUser();
  assert.equal(user.get('id'), 10);
  assert.equal(user.get('title'), 'Test User');
  assert.equal(user.get('email'), 'test.user@example.com');
});

import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const run = Ember.run;

moduleFor('model:field-version', {
  needs: [
    'model:job',
    'model:person'
  ],
  beforeEach: function () {
      this.inject.service('store', { as: 'store' });
  }
});

test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});

test('_modified', function(assert) {
  var object = this.subject();
  object.set('modified', '2015-11-13T10:20:02Z');
  assert.equal(object.get('_modified'), new Date('2015-11-13T10:20:02Z').getTime());
});

test('_editorId', function(assert) {
  var object = this.subject();
  object.set('editor', `11;#Test User,#DOMAIN\testuser,#test.user@example.com,#,#Test User`);
  assert.equal(object.get('_editorId'), 11);
});

test('_editor', function(assert) {
  var object = this.subject();
  let store = Ember.Object.create({
    findRecord: (type, id) => {
      assert.equal(type, 'person');
      assert.equal(id, 11);
      return Ember.Object.create({ id: id });
    }
  });
  let editor;
  run(() => {
    object.set('store', store);
    object.set('_editorId', 11);
  });
  run(() => editor = object.get('_editor'));
  assert.equal(editor.get('id'), 11);
});

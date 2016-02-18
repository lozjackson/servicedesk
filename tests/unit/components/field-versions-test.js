import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import FieldVersionObject from 'servicedesk/models/field-version';

const run = Ember.run;

moduleForComponent('field-versions', 'Unit | Component | field versions', {
  needs: ['helper:moment-format'],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);
  var component = this.subject();
  assert.equal(component._state, 'preRender');
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('init() method should reset versionCollection property', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  run(() => {
    component.set('versionCollection', [
      FieldVersionObject.create()
    ]);
    component.init();
  });

  assert.equal(component.get('versionCollection.length'), 0);
});

test('init() method should call getVersionCollection() method', function(assert) {
  assert.expect(2);
  var component = this.subject();
  component.set('getVersionCollection', () => assert.ok(true));
  this.render();

  run(() => component.init());
  assert.equal(component.get('versionCollection.length'), 0);
});

test('isLoading should be false', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('isLoading'), false);
});

test('versionSortProperties', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();
  assert.equal(component.get('versionSortProperties.length'), 1);
  assert.equal(component.get('versionSortProperties')[0], '_modified:desc');
});

test('versionCollection should be empty array', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('versionCollection.length'), 0);
});

test('sortedVersions', function(assert) {
  assert.expect(3);
  var component = this.subject();
  let version1 = FieldVersionObject.create({modified: '2015-11-13T10:21:02Z'});
  let version2 = FieldVersionObject.create({modified: '2015-11-13T10:21:03Z'});
  component.set('versionCollection', [
    version1, version2
  ]);
  this.render();
  assert.equal(component.get('sortedVersions.length'), 2);
  assert.equal(component.get('sortedVersions.firstObject'), version2);

  run(() => version1.set('modified', '2015-11-13T10:21:04Z'));
  assert.equal(component.get('sortedVersions.firstObject'), version1);
});

test('itemId should be alias of model.id', function(assert) {
  assert.expect(1);
  var component = this.subject();
  component.set('model', Ember.Object.create({id: 1}));
  this.render();
  assert.equal(component.get('itemId'), 1);
});

test('getVersionCollection() method', function(assert) {
  assert.expect(5);
  var component = this.subject();
  this.render();
  run(() => {
    component.setProperties({
      listName: 'Test List',
      model: Ember.Object.create({id: 1}),
      fieldName: 'Comment'
    });
    component.set('spServices', {
      getVersionCollection: (listName, itemId, fieldName, versionCollection) => {
        assert.equal(listName, 'Test List');
        assert.equal(itemId, 1);
        assert.equal(fieldName, 'Comment');
        assert.equal(typeof versionCollection, 'object');
        versionCollection.pushObject({});
      }
    });
    component.getVersionCollection();
  });
  assert.equal(component.get('versionCollection.length'), 1);
});

test('getVersionCollection() method should set isLoading property', function(assert) {
  assert.expect(7);
  var component = this.subject();
  this.render();
  run(() => {
    component.setProperties({
      isLoading: false,
      listName: 'Test List',
      model: Ember.Object.create({id: 1}),
      fieldName: 'Comment'
    });
    component.set('spServices', {
      getVersionCollection: (listName, itemId, fieldName, versionCollection, callback) => {
        assert.equal(listName, 'Test List');
        assert.equal(itemId, 1);
        assert.equal(fieldName, 'Comment');
        assert.equal(typeof versionCollection, 'object');
        assert.equal(component.get('isLoading'), true, `'isLoading' should be true`);

        if (typeof callback === 'function') {
          run(() => callback.call(this, {}, 'success'));
          assert.equal(component.get('isLoading'), false, `'isLoading' should be false`);
        }
        versionCollection.pushObject({});
      }
    });
    component.getVersionCollection();
  });
  assert.equal(component.get('versionCollection.length'), 1);
});

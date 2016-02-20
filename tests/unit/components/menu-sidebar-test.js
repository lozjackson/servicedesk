import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

const run = Ember.run;

moduleForComponent('menu-sidebar', 'Unit | Component | menu sidebar', {
  needs: [
    'storage:job',
    'component:checkbox-slider'
  ],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);
  var component = this.subject();
  assert.equal(component._state, 'preRender');
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('classNames', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();
  assert.equal(component.get('classNames.length'), 2);
  assert.equal(component.get('classNames')[1], 'top-level-container');
});

test('menuOpen should be false', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('menuOpen'), false);
});

test('showSettings should be false', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('showSettings'), false);
});

test('_toggleShowSettings() method', function(assert) {
  assert.expect(3);
  var component = this.subject();
  this.render();
  assert.equal(component.get('showSettings'), false);

  run(() => component._toggleShowSettings());
  assert.equal(component.get('showSettings'), true);

  run(() => component._toggleShowSettings());
  assert.equal(component.get('showSettings'), false);
});

test('_gotoIndex() method', function(assert) {
  assert.expect(3);
  var component = this.subject();
  component.set('transitionToRoute', (routeName) => {
    assert.equal(arguments.length, 1);
    assert.equal(routeName, 'index');
  });
  this.render();
  run(() => component._gotoIndex());
  assert.ok(component);
});

test('toggleShowSettings action', function(assert) {
  assert.expect(2);
  var component = this.subject();
  component.set('_toggleShowSettings', () => assert.ok(true));
  this.render();
  component.send('toggleShowSettings');
  assert.ok(component);
});

test('gotoIndex action', function(assert) {
  assert.expect(3);
  var component = this.subject();
  component.set('menuOpen', true);
  component.set('_gotoIndex', () => assert.ok(true));
  this.render();
  run(() => component.send('gotoIndex'));
  assert.ok(component);
  assert.equal(component.get('menuOpen'), false);
});

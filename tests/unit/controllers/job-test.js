import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
const run = Ember.run;

const Config = Ember.Object.extend({
  job: Ember.Object.create()
});

moduleFor('controller:job', {
  needs: [
    'model:job',
    'model:person',
    'storage:job'
  ],
  beforeEach: function () {
    this.inject.service('store', { as: 'store' });
  }
});

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

test('saveDisabled should be true', function(assert) {
  let controller = this.subject();
  let job;
  run(() => {
    job = Ember.Object.create({hasDirtyAttributes: false});//store.createRecord('job');
    controller.set('model', job);
  });
  assert.equal(controller.get('saveDisabled'), true);
});

test('saveDisabled - problemDescriptionRequired false', function(assert) {
  let controller = this.subject();
  controller.set('problemDescriptionRequired', false);
  let job;
  run(() => {
    job = Ember.Object.create({hasDirtyAttributes: false});//store.createRecord('job');
    controller.set('model', job);
  });
  assert.equal(controller.get('saveDisabled'), true);

  run(() => controller.set('model.hasDirtyAttributes', true));
  assert.equal(controller.get('saveDisabled'), false);
});

test('saveDisabled - problemDescriptionRequired true', function(assert) {
  let controller = this.subject();
  controller.set('problemDescriptionRequired', true);
  let job;
  run(() => {
    job = Ember.Object.create({hasDirtyAttributes: false});//store.createRecord('job');
    controller.set('model', job);
  });
  assert.equal(controller.get('saveDisabled'), true);

  run(() => controller.set('model.hasDirtyAttributes', true));
  assert.equal(controller.get('saveDisabled'), true);

  run(() => controller.set('model.newProblemDescription', 'abc'));
  assert.equal(controller.get('saveDisabled'), false);
});

test('cancelDisabled', function(assert) {
  let controller = this.subject();

  run(() => controller.set('model', Ember.Object.create({hasDirtyAttributes: false})));
  assert.equal(controller.get('cancelDisabled'), true);

  run(() => controller.set('model.hasDirtyAttributes', true));
  assert.equal(controller.get('cancelDisabled'), false);

  run(() => controller.set('model.hasDirtyAttributes', false));
  assert.equal(controller.get('cancelDisabled'), true);
});

test('checkProblemDescription() method - problemDescriptionRequired false', function(assert) {
  let controller = this.subject();
  controller.set('problemDescriptionRequired', false);
  let store = this.store;
  let job;
  run(() => {
    job = store.createRecord('job');
    controller.set('model', job);
  });
  assert.equal(controller.checkProblemDescription(), true);
});

test('checkProblemDescription() method - problemDescriptionRequired true', function(assert) {
  let controller = this.subject();
  controller.set('problemDescriptionRequired', true);
  controller.set('showEditPanel', false);
  let store = this.store;
  let job;
  run(() => {
    job = store.createRecord('job');
    controller.set('model', job);
  });
  assert.equal(controller.checkProblemDescription(), false);
  assert.equal(controller.get('showEditPanel'), true, `'showEditPanel' should be true`);

  run(() => controller.set('model.newProblemDescription', 'abc', `'showEditPanel' should be true`));
  assert.equal(controller.checkProblemDescription(), true);
});

test('_gotoIndex() method', function(assert) {
  assert.expect(1);
  let controller = this.subject();
  controller.set('transitionToRoute', (route) => assert.equal(route, 'index'));
  controller._gotoIndex();
});

test('_openEditPanel() method', function(assert) {
  assert.expect(1);
  let controller = this.subject();
  controller.set('showEditPanel', false);
  controller._openEditPanel();
  assert.equal(controller.get('showEditPanel'), true);
});

test('_closeEditPanel() method', function(assert) {
  assert.expect(1);
  let controller = this.subject();
  controller.set('showEditPanel', true);
  controller._closeEditPanel();
  assert.equal(controller.get('showEditPanel'), false);
});

test('_save() method', function(assert) {
  assert.expect(3);
  let controller = this.subject();
  controller.set('_gotoIndex', () => {});
  controller.set('model', Ember.Object.create({
    problemDescription: null,
    newProblemDescription: 'abc',
    save() {
      assert.ok(true);
    }
  }));
  controller._save();
  assert.equal(controller.get('model.problemDescription'), 'abc', `'problemDescription' should be 'abc'`);
  assert.equal(controller.get('model.newProblemDescription'), null, `'newProblemDescription' should be null`);
});

test('_save() method - closeEditPanelOnSave false', function(assert) {
  assert.expect(1);
  let controller = this.subject();
  controller.set('_gotoIndex', () => {});
  controller.set('config', Config.create());
  controller.set('jobConfig.closeEditPanelOnSave', false);
  controller.set('model', Ember.Object.create({
    save() {}
  }));
  controller.set('showEditPanel', true);
  controller._save();
  assert.equal(controller.get('showEditPanel'), true, `'showEditPanel' should be true`);
});

test('_save() method - closeEditPanelOnSave true', function(assert) {
  assert.expect(1);
  let controller = this.subject();
  controller.set('_gotoIndex', () => {});
  controller.set('config', Config.create());
  controller.set('jobConfig.closeEditPanelOnSave', true);
  controller.set('model', Ember.Object.create({
    save() {}
  }));
  controller.set('showEditPanel', true);
  controller._save();
  assert.equal(controller.get('showEditPanel'), false, `'showEditPanel' should be false`);
});

test('_save() method - gotoIndexOnSave false', function(assert) {
  assert.expect(1);
  let controller = this.subject();
  controller.set('config', Config.create());
  controller.set('jobConfig.gotoIndexOnSave', false);
  controller.set('model', Ember.Object.create({
    save() {}
  }));
  controller.set('_gotoIndex()', () => assert.ok(false));
  controller._save();
  assert.ok(controller);
});

test('_save() method - gotoIndexOnSave true', function(assert) {
  assert.expect(1);
  let controller = this.subject();
  controller.set('config', Config.create());
  controller.set('jobConfig.gotoIndexOnSave', true);
  controller.set('model', Ember.Object.create({
    save() {}
  }));
  controller.set('_gotoIndex', () => assert.ok(true));
  controller._save();
});

test('_cancel() method should rollback attributes', function(assert) {
  assert.expect(2);
  let controller = this.subject();
  controller.set('model', Ember.Object.create({
    rollbackAttributes() {
      assert.ok(true);
    }
  }));
  controller.set('showEditPanel', true);
  controller._cancel();
  assert.equal(controller.get('showEditPanel'), false, `'showEditPanel' should be false`);
});

test('gotoIndex action', function(assert) {
  assert.expect(1);
  let controller = this.subject();
  controller.set('_gotoIndex', () => assert.ok(true));
  controller.send('gotoIndex');
});

test('addProblemDescription action should call _openEditPanel', function(assert) {
  assert.expect(1);
  let controller = this.subject();
  controller.set('_openEditPanel', () => assert.ok(true));
  controller.send('addProblemDescription');
});

test('save action', function(assert) {
  assert.expect(1);
  let controller = this.subject();
  controller.set('_save', () => assert.ok(true));
  controller.send('save');
});

test('cancel action', function(assert) {
  assert.expect(1);
  let controller = this.subject();
  controller.set('_cancel', () => assert.ok(true));
  controller.send('cancel');
});

test('closeProblemDescription action should call _closeEditPanel', function(assert) {
  assert.expect(1);
  let controller = this.subject();
  controller.set('_closeEditPanel', () => assert.ok(true));
  controller.send('closeProblemDescription');
});

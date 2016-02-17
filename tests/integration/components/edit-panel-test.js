import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-panel', 'Integration | Component | edit panel', {
  integration: true
});

test('className should be edit-panel', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edit-panel}}`);

  assert.equal(this.$('div.edit-panel').length, 1, `'classNames.length' should be 1`);
});

test('close', function(assert) {
  assert.expect(1);
  this.on('close', () => assert.ok(true));
  this.render(hbs`{{edit-panel close="close"}}`);
  $('button.close-button').click();
});

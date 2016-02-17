import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('field-versions', 'Integration | Component | field versions', {
  integration: true
});

test('className should be field-versions', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{field-versions}}`);

  assert.equal(this.$('ul.field-versions').length, 1, `'classNames.length' should be 1`);
});

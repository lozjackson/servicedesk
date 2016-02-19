import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('menu-sidebar', 'Integration | Component | menu sidebar', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{menu-sidebar}}`);

  assert.equal(this.$('div.top-level-container').length, 1);

  // Template block usage:
  this.render(hbs`
    {{#menu-sidebar}}
      <div class="inner-page-content"></div>
    {{/menu-sidebar}}
  `);
  assert.equal(this.$('div.top-level-container').length, 1);
  assert.equal(this.$('div.inner-page-content').length, 1);
});

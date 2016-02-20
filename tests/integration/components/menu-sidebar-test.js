import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('menu-sidebar', 'Integration | Component | menu sidebar', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{menu-sidebar}}`);

  assert.equal(this.$('div.top-level-container').length, 1);

});

test('it renders', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{#menu-sidebar}}
      <div class="inner-page-content"></div>
    {{/menu-sidebar}}
  `);
  assert.equal(this.$('div.top-level-container').length, 1);
  assert.equal(this.$('div.inner-page-content').length, 1);
});

test('_gotoIndex() method', function(assert) {
  assert.expect(1);
  this.on('transitionToRoute', (routeName) => assert.equal(routeName, 'index'));
  this.render(hbs`
    {{#menu-sidebar transitionToRoute="transitionToRoute"}}
      <div class="inner-page-content"></div>
    {{/menu-sidebar}}
  `);
  Ember.$('div.menu-button-index').click();
});

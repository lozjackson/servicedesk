/**
  @module service-desk
*/
import Ember from 'ember';

/**
  @class CheckboxSliderComponent
  @namespace Arms
*/
export default Ember.Component.extend({

  /**
    @property classNames
    @type {Array}
    @private
    @default `['checkbox-slider']`
  */
  classNames: ['checkbox-slider'],

  /**
    ## Checkbox Id

    This is the `id` attribute of the checkbox element.  This is required.

    @property checkboxId
    @type {String}
    @required
  */
  checkboxId: null
});

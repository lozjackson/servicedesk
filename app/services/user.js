/**
  @module service-desk
*/
import Ember from 'ember';
// import ENV from '../config/environment';

const computed = Ember.computed;

/**
  @class UserService
  @namespace Services
*/
export default Ember.Service.extend({

  /**
    Get the current user and store it in the `model` property.

    @method init
    @private
  */
  init() {
    this.set('model', this.getUser());
    this._super(...arguments);
  },

  /**
    The user model.

    @property model
    @type {Object}
    @private
    @readonly
  */
  model: null,

  /**
    Alias of 'model.id'.

    @property id
    @type {Integer}
    @readonly
  */
  id: computed.readOnly('model.id'),

  /**
    Alias of 'model.title'.

    @property title
    @type {String}
    @readonly
  */
  title: computed.readOnly('model.title'),

  /**
    Alias of 'model.email'.

    @property email
    @type {String}
    @readonly
  */
  email: computed.readOnly('model.email'),

  /**
    Get the current user.

    @method getUser
    @private
    @return {Object}
  */
  getUser() {
    if (!this.spServices) { return; }
    return this.spServices.getCurrentUser();
  }
});

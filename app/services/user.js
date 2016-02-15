/**
  @module service-desk
*/
import Ember from 'ember';
import ENV from '../config/environment';

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
    The current user is returned.

    @method getUser
    @private
    @return {Object}
  */
  getUser() {
    if (ENV.environment === 'production') {
      // call the SPGetCurrentUser function to get the current user from SharePoint
			var userObject = Ember.$().SPServices.SPGetCurrentUser({
				fieldNames: ["Id", "Title", 'EMail']
			});

			// return an object with a single property, the `user` model, with data
      // from the userObject created above
			return Ember.Object.create({
        id: userObject.Id,
        title: userObject.Title,
				email: userObject.EMail
			});
    } else {
      return Ember.Object.create({
        id: 10,
        title: 'Test User',
				email: 'test.user@example.com'
			});
    }
  }
});

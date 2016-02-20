/**
  @module service-desk
*/
import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

/**
  @class ConfigService
  @namespace Services
*/
export default Ember.Service.extend({

  /**
    ## Job Config

    This is a localStorage object that is saved on the user's machine.  Any properties
    set on this object will be persisted, but will be specific to the user's machine.

    @property job
    @type {Object}
    @private
  */
  job: storageFor('job')
});

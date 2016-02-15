/**
  @module service-desk
*/
import OdataAdapter from 'ember-odata/adapters/odata';
import ENV from '../config/environment';

/**
  @class ApplicationAdapter
  @namespace Adapters
*/
export default OdataAdapter.extend({

  /**
    This is set in the `config/environment.js` file.

    @property host
    @type {String}
  */
  host: ENV.host,

  /**
    This is set in the `config/environment.js` file.

    @property namespace
    @type {String}
  */
  namespace: ENV.namespace
});

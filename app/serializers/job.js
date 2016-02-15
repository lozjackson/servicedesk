/**
  @module service-desk
*/
import OdataSerializer from 'ember-odata/serializers/odata';

/**
  @class JobSerializer
  @namespace Serializers
*/
export default OdataSerializer.extend({

  /**
    @method serializeHasMany
    @return {undefined}
  */
  serializeHasMany(/*snapshot, json, relationship*/) {
    return;
  },

  /**
    @method modelNameFromPayloadKey
    @param {String} key
    @return {String}
    @default `job`
  */
  modelNameFromPayloadKey() {
    return 'job';
  }
});

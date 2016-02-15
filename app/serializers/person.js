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
    @method modelNameFromPayloadKey
    @param {String} key
    @return {String} the model's modelName
    @default `person`
  */
  modelNameFromPayloadKey() {
    return 'person';
  }
});

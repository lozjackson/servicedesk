/**
  @module service-desk
*/
import OdataSerializer from 'ember-odata/serializers/odata';

/**
  @class PersonSerializer
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

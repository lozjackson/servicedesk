/**
  @module service-desk
*/
import ApplicationAdapter from './application';

/**
  @class PersonAdapter
  @extends Adapters.ApplicationAdapter
  @namespace Adapters
*/
export default ApplicationAdapter.extend({

  /**
    Determines the pathname for a given type.
    By default, it pluralizes the type's name (for example,
    'post' becomes 'posts' and 'person' becomes 'people').
    ### Pathname customization
    For example if you have an object LineItem with an
    endpoint of "/line_items/".
    ```app/adapters/application.js
    import DS from 'ember-data';
    export default DS.RESTAdapter.extend({
      pathForType: function(modelName) {
        var decamelized = Ember.String.decamelize(modelName);
        return Ember.String.pluralize(decamelized);
      }
    });
    ```
    @method pathForType
    @param {String} modelName
    @return {String} path
  **/
  pathForType: function(/*modelName*/) {
    return 'UserInformationList';
  }
});

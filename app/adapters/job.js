/**
  @module service-desk
*/
import Ember from 'ember';
import ApplicationAdapter from './application';

const get = Ember.get;

/**
  @class JobAdapter
  @extends Adapters.ApplicationAdapter
  @namespace Adapters
*/
export default ApplicationAdapter.extend({

  /**
    @property queryStringParams
    @type {Array}
  */
  queryStringParams: [
    '$select=Id,Modified,Title,StatusValue,ProblemDescription,AssignedTo/Id,Requester/Id',
    '$expand=AssignedTo,Requester'
  ],

  /**
    @method ajaxOptions
    @private
    @param {String} url
    @param {String} type The request type GET, POST, PUT, DELETE etc.
    @param {Object} options
    @return {Object}
  */
  ajaxOptions: function(url, type, options) {
    var hash = options || {};
    hash.url = url;
    hash.type = type;
    hash.dataType = 'json';
    hash.context = this;

    if (hash.data && type !== 'GET') {
      hash.contentType = 'application/json; charset=utf-8';

      ///////////////
      // odata doesn't like the 'job' object key and expects the params to be in
      // the `data` (root) object.
      if (typeof hash.data.job !== 'undefined') {
        hash.data = hash.data.job;
      }
      ///////////////

      hash.data = JSON.stringify(hash.data);
    }

    var headers = get(this, 'headers');
    if (hash.type === 'PUT') {

      hash.type = 'POST';
      if (typeof headers === 'undefined') {
        headers = {};
      }
      headers["X-HTTP-Method"] = "MERGE";
      headers["If-Match"] = '*';
    }

    if (headers !== undefined) {
      hash.beforeSend = function (xhr) {
        Object.keys(headers).forEach((key) =>  xhr.setRequestHeader(key, headers[key]));
      };
    }
    return hash;
  },

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
  pathForType(/*modelName*/) {
    return 'ServiceDeskLog';
  }
});

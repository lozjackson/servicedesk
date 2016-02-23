/**
  @module service-desk
*/
import Ember from 'ember';

const computed = Ember.computed;
const alias = computed.alias;

/**
  ## Field Versions Component

  Use this component to display the version history for a field as a list.

  ```
  {{field-versions
    model=model // the `model` is required to have an `id` property.
    fieldName="Field Name"
    listName="List Name"}}
  ```

  @class FieldVersionsComponent
  @namespace Components
*/
export default Ember.Component.extend({

  /**
    ## spServices

    The `spServices` service, which is a wrapper around the SPServices library.

    @property spServices
    @type {Object}
    @private
  */
  spServices: Ember.inject.service(),

  /**
    @property tagName
    @type {String}
    @private
    @default `ul`
  */
  tagName: 'ul',

  /**
    @property classNames
    @type {Array}
    @private
    @default `['field-versions']`
  */
  classNames: ['field-versions'],

  /**
    ## Model

    The `model` is required to have an `id` property.  The `model.id` is the `id`
    of the list item we are getting the version collection for.

    @property model
    @type {Object}
  */
  model: null,

  /**
    ## FieldName

    The name of the field/column that we want from the list.

    @property fieldName
    @type {String}
  */
  fieldName: null,

  /**
    ## ListName

    The name of the list.

    @property listName
    @type {String}
  */
  listName: null,

  /**
    If this property is true the component is in the loading state.  It enters
    this state when it asks the `SpServicesService` for data and remains in this
    state until the service provides the requested data.

    @property isLoading
    @type {Boolean}
    @private
  */
  isLoading: false,

  /**
    ## Version Sort Properties

    @property versionSortProperties
    @type {Array}
    @private
    @default `['_modified:desc']`
  */
  versionSortProperties: ['_modified:desc'],

  /**
    ## Version Collection

    The version collection array.

    @property versionCollection
    @type {Array}
    @private
  */
  versionCollection: [],

  /**
    ## Sorted Versions

    Sort the `versionCollection` using the `versionSortProperties`

    @property sortedVersions
    @type {Array}
    @private
  */
  sortedVersions: computed.sort('versionCollection', 'versionSortProperties'),

  /**
    Alias of `model.id`

    @property itemId
    @type {Integer}
    @private
  */
  itemId: alias('model.id'),

  /**
    ## init

    * reset the version collection array
    * call the `getVersionCollection()` method

    @method init
    @private
  */
  init() {
    this._super(...arguments);
    this.set('versionCollection', []);
    this.getVersionCollection();
  },

  // reload: Ember.observer('model.problemDescription', function() {
  //   Ember.run.debounce(this, this.getVersionCollection, 500);
  // }),

  /**
    This method gets the version collection using the `SPServices` `GetVersionCollection`
    operation.  It is called from the component's `init()` method.

    @method getVersionCollection
    @private
  */
  getVersionCollection() {
    let {spServices, listName, itemId, fieldName, versionCollection} = this.getProperties('spServices', 'listName', 'itemId', 'fieldName', 'versionCollection');
    if (!spServices) { return; }
    this.set('isLoading', true);
    spServices.getVersionCollection(listName, itemId, fieldName, versionCollection, () => this.set('isLoading', false));
  }
});

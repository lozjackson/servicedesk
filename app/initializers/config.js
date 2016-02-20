/*
  Inject the `ConfigService` into all routes, controllers and components.
*/
export function initialize(application) {
  application.inject('route', 'config', 'service:config');
  application.inject('controller', 'config', 'service:config');
  application.inject('component', 'config', 'service:config');
}

export default {
  name: 'config',
  initialize: initialize
};

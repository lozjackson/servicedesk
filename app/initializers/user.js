/*
  Inject the `UserService` into all routes, controllers and components.
*/
export function initialize() {
  let application = arguments[1] || arguments[0];
  application.inject('route', 'user', 'service:user');
  application.inject('controller', 'user', 'service:user');
  application.inject('component', 'user', 'service:user');
  application.inject('service:user', 'spServices', 'service:sp-services');
}

export default {
  name: 'user',
  initialize: initialize
};

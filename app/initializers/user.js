/*
  Inject the `UserService` into all routes, controllers and components.
*/
export function initialize() {
  let application = arguments[1] || arguments[0];
  application.inject('route', 'user', 'service:user');
  application.inject('controller', 'user', 'service:user');
  application.inject('component', 'user', 'service:user');
}

export default {
  name: 'user',
  initialize: initialize
};

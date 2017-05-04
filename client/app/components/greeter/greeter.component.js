import template from './greeter.html';
import controller from './greeter.controller';
import './greeter.scss';

let greeterComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller
};

export default greeterComponent;

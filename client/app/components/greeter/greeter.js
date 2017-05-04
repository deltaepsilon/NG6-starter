import angular from 'angular';
import uiRouter from 'angular-ui-router';
import greeterComponent from './greeter.component';

let greeterModule = angular.module('greeter', [
  uiRouter
])

.component('greeter', greeterComponent)

.name;

export default greeterModule;

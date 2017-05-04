import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Greeter from './greeter/greeter';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Greeter
])

.name;

export default componentModule;

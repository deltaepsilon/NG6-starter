import angular from 'angular';
import AlgorithmService from './algorithm/algorithm.service';
import GreetingService from './greeting/greeting.service';
import UtilitiesService from './utilities/utilities.service';

let servicesModule = angular.module('app.services', [])
  .service('AlgorithmService', AlgorithmService)
  .service('GreetingService', GreetingService)
  .service('UtilitiesService', UtilitiesService)
  .name;

export default servicesModule;
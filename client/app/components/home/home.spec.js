import HomeModule from './home'

describe('Home', () => {
  let $rootScope, $state, $location, $componentController, $compile;

  beforeEach(window.module(HomeModule));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    it('default component should be home', () => {
      $location.url('/');
      $rootScope.$digest();
      expect($state.current.component).toEqual('home');
    });
  });

  describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = $componentController('home', {
        $scope: $rootScope.$new()
      });
    });

    it('has a name property', () => {
      expect(controller.name).toBeDefined();
    });

    it('should return the correct greeting', () => {
      let myName = 'Lukas';
      expect(controller.greet(myName)).toEqual(`Hello ${myName}`);
    });
  });

  describe('View', () => {
    // view layer specs.
    let scope, template;

    beforeEach(() => {
      scope = $rootScope.$new();
      template = $compile('<home></home>')(scope);
      scope.$apply();
    });

    it('has name in template', () => {
      expect(template.find('h1').html()).toEqual('Found in home.html');
    });

  });
});

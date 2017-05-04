import GreeterModule from './greeter';
import ServicesModule from './../../services/services';
import GreeterController from './greeter.controller';
import GreeterComponent from './greeter.component';
import GreeterTemplate from './greeter.html';

describe('Greeter', () => {
  let $componentController, makeController, GreetingService;

  beforeEach(window.module(ServicesModule));
  beforeEach(window.module(GreeterModule));

  // Overriding dependency with $provide
  // beforeEach(window.module(GreeterModule, $provide => {
  //   $provide.value('GreetingService', {
  //     greet(name) { return `Yo ${name}!`; }
  //   })
  // }));

  beforeEach(inject(($injector) => {
    $componentController = $injector.get('$componentController')
    GreetingService = $injector.get('GreetingService');

    // Alternate way to instantiate controller
    makeController = () => {
      return new GreeterController(GreetingService);
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property', () => {
      let controller = makeController();
      expect(controller.name).toBeDefined();
    });

    it('should return the correct greeting', () => {
      let controller = makeController();
      let myName = 'Lukas';
      expect(controller.greet(myName)).toEqual(`Hello ${myName}`);
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template', () => {
      expect(GreeterTemplate).toMatch(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = GreeterComponent;
    let controller;
    beforeEach(() => {
      controller = $componentController('greeter', {
        GreetingService
      });
    });

    it('includes the intended template', () => {
      expect(component.template).toEqual(GreeterTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).toEqual(GreeterController);
    });

    it('should return the correct greeting', () => {
      let myName = 'Lukas';
      expect(controller.greet(myName)).toEqual(`Hello ${myName}`);
    });

    it('should call the GreetingService on greet', () => {
      let myName = 'Lukas';
      spyOn(GreetingService, 'greet').and.callThrough();

      expect(controller.greet(myName)).toEqual(`Hello ${myName}`);
      expect(GreetingService.greet).toHaveBeenCalledWith(myName);
    });

    it('should call the GreetingService on greet', () => {
      let myName = 'Lukas';
      spyOn(GreetingService, 'greet').and.returnValue(myName);

      expect(controller.greet(myName)).toEqual(myName);
      expect(GreetingService.greet).toHaveBeenCalledWith(myName);
    });
  });
});

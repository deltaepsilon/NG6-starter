class GreeterController {
  constructor(GreetingService) {
    "ngInject";

    this.GreetingService = GreetingService;
    this.name = 'greeter';
  }

  greet(name) {
    return this.GreetingService.greet(name);
  }
}

export default GreeterController;

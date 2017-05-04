class HomeController {
  constructor() {
    this.name = 'home';
  }

  greet(name) {
    return `Hello ${name}`;
  }
}

export default HomeController;

import Service from './greeting.service';

describe('GreetingsService', () => {
  let service;
  beforeEach(() => {
    service = new Service();
  });

  it('should return the correct greeting', () => {
    const myName = 'Lukas';
    expect(service.greet(myName)).toEqual(`Hello ${myName}`);
  });
});
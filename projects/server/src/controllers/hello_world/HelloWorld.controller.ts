import { Controller, Resolver, Route } from 'maestro';

export class HelloWorldController extends Controller {
  get baseURL(): string {
    return '';
  }

  @Route({
    url : '',
    methods : 'get'
  })
  public sayHello : Resolver = (req) => {
    return 'hello, ' + (req.get('name') ?? 'world');
  }

}
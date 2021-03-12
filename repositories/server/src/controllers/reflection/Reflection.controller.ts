import { Controller, Maestro, Resolver, Route } from 'maestro';

export class ReflectionController extends Controller {

  get baseURL(): string {
    return 'maestro';
  }

  constructor(private server : Maestro) {
    super();
  }

  @Route({
    url : '',
    methods : 'get'
  })
  public listAllRoutes : Resolver = (req) => {
    return 'all';
  }
}
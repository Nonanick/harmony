import type { Route } from '../router/Route';

const AboutRoute: Route = {
  pattern: 'about',
  async onActivation() {

  }
}

const NotAboutRoute: Route = {
  pattern: 'not-about',
  async onActivation() {

  }
}

export { AboutRoute as Another };

export default NotAboutRoute;
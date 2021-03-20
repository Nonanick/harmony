import type { AppRoute } from '../components/router/AppRoute';

const AboutRoute: AppRoute = {
  pattern: 'about',
  async onActivation() {

  }
}

const NotAboutRoute: AppRoute = {
  pattern: 'not-about',
  async onActivation() {

  }
}

export { AboutRoute as Another };

export default NotAboutRoute;
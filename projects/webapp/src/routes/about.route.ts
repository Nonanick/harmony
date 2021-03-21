import type { AppRoute } from '../components/router/AppRoute';
import { DisplayRoutedComponent } from '../components/router/DisplayRoutedComponent';
import LandingPage from '../pages/LandingPage.svelte';
import UIKit from '../pages/UIKit.svelte';

const UIKitRoute: AppRoute = {
  url_pattern: 'about',
  onActivation : DisplayRoutedComponent(UIKit)
}

const NotAboutRoute: AppRoute = {
  url_pattern: 'not-about',
  onActivation : DisplayRoutedComponent(LandingPage)
}

export { UIKitRoute };

export default NotAboutRoute;
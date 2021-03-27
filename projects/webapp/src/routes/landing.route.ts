import LandingPage from '../pages/LandingPage.svelte';
import type { AppRoute } from '../components/router/AppRoute';
import { DisplayRoutedComponent } from '../components/router/DisplayRoutedComponent';

export const LandingRoute: AppRoute = {
  url_pattern: '',
  onActivation: DisplayRoutedComponent(LandingPage)
}
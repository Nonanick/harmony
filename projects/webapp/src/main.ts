import App from './App.svelte';
import CurrentRoute from './components/router/CurrentRoute';
import { AppRouter } from './router/Router';
import { HistoryApiStrategy } from './router/strategies/HistoryApiStrategy';
import * as Routes from './routes/routes';
import RouteNotFoundPage from './pages/not_found/RouteNotFound.svelte';

AppRouter.setStrategy(new HistoryApiStrategy);

AppRouter.addRoute(
  ...Object.entries(Routes).map(
    ([_, r]) => r
  )
);

AppRouter.routeNotFound = (url) => {
  CurrentRoute.set({
    visibleComponent: RouteNotFoundPage,
    componentProperties: { url },
    url: url,
    queryParams: {},
    urlParams: {},
    state: 'route-not-found'
  });
};

AppRouter.start();

const app = new App({
  target: document.body,
  props: {}
});

export default app;
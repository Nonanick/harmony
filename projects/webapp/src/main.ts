import App from './App.svelte';
import { AppRouter } from './router/Router';
import { HistoryApiStrategy } from './router/strategies/HistoryApiStrategy';
import * as Routes from './routes/routes';

AppRouter.setStrategy(new HistoryApiStrategy);

AppRouter.addRoute(
  ...Object.entries(Routes).map(
    ([_, r]) => {
      return r;
    }
  )
);

AppRouter.start();

const app = new App({
  target: document.body,
  props: {}
});

export default app;
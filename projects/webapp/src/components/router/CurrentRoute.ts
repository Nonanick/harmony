import { writable } from 'svelte/store';
import type { RouteState } from './RouteState';
import RouteStateHistory from './RouteStateHistory';
import LoadingPage from '../../pages/LoadingPage.svelte';

const CurrentRoute = writable<RouteState>({
  url: '',
  queryParams: {},
  urlParams: {},
  visibleComponent: LoadingPage,
  componentProperties: {},
  state: 'ok'
});


export default {
  subscribe: CurrentRoute.subscribe,
  set: (newRoute: RouteState) => {
    RouteStateHistory.add(newRoute);
    CurrentRoute.set(newRoute);
  }
};
import type { SvelteComponent } from 'svelte';
import type { RouteActivation } from '../../router/RouteActivation';
import CurrentRoute from './CurrentRoute';

export const DisplayRoutedComponent: (comp: typeof SvelteComponent, properties?: any) => RouteActivation = (comp, props = {}) => {

  return async ({ url, queryParams, urlParams }) => {
    CurrentRoute.set({
      url,
      queryParams,
      urlParams,
      visibleComponent: comp,
      componentProperties: props,
      state: 'ok',
    })
  };
};
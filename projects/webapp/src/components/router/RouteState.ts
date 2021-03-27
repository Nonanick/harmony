import type { SvelteComponent } from 'svelte';

export interface RouteState {
  url : string;
  queryParams : any;
  urlParams : any;
  state : 'ok' | 'route-not-found' | 'unauthorized-access' | 'faulty-route';
  visibleComponent : typeof SvelteComponent;
  componentProperties: any;
}
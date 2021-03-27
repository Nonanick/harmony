import { writable } from 'svelte/store';
import type { RouteState } from './RouteState';

const RouteStateHistory = writable<RouteState[]>([]);

export default {
  subscribe: RouteStateHistory.subscribe,
  add(state: RouteState) {

    RouteStateHistory.update((states) => {
      states.push(state);
      return states;
    });

  },
  reset() {
    RouteStateHistory.set([]);
  },
}
import {writable } from 'svelte/store';
import type { RouteState } from './RouteState';

const CurrentRoute = writable<RouteState>(undefined, () => {

});

export default CurrentRoute;
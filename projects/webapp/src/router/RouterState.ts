import { writable, Writable } from 'svelte/store';

export interface RouterState {
  url: string;
  queryParams: any;
  urlParams: any;
  displayComponent: any
}

const CurrentRoute: Writable<RouterState> = writable<RouterState>(undefined, () => {

});

export default CurrentRoute;
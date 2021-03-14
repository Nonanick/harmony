import type { ProjectWatcher } from '../project.watcher';

export interface ProjectHook {
  name : string;
  project? : string | string[];
  event : ProjectEvent & string | ProjectEvent[];
  pattern : RegExp | RegExp[];
  mustMatchAllPatterns? : boolean;
  debounce? : number;
  hook : (eventName : ProjectEvent, filepath : string, isInitial : boolean, watcher : ProjectWatcher) => Promise<void>;
}

export type ProjectEvent = 'add' | 'change' | 'unlink' | 'all' & string;
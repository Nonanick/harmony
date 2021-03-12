import type { ProjectWatcher } from '../project.watcher';

export interface ProjectHook {
  name : string;
  project? : string | string[];
  event : ProjectEvent & string;
  hook : (eventName : ProjectEvent, filepath : string, watcher : ProjectWatcher) => Promise<void>;
}

export type ProjectEvent = 'add' | 'change' | 'remove' | 'all' & string;
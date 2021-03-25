import { HarmonyManager } from '../manager/HarmonyManager';
import { ProjectManager } from '../manager/project/ProjectManager';
import type { ProjectWatcher } from './ProjectWatcher';

export interface WatcherHook {
  name: string;
  project?: string | string[];
  event: ProjectEvent & string | ProjectEvent[];
  pattern: RegExp | RegExp[];
  mustMatchAllPatterns?: boolean;
  debounce?: number;
  hook: (hookContext: {
    eventName: ProjectEvent,
    filepath: string,
    isInitial: boolean,
    root: string,
    manager : ProjectManager,
    watcher: ProjectWatcher,
    workspace_root: string,
    workspace_manager : HarmonyManager,
  }) => Promise<void>;
}

export type ProjectEvent = 'add' | 'change' | 'unlink' | 'all' & string;
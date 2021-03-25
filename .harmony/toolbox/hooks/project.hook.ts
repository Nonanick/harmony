import type { ProjectWatcher } from '../../watcher/project.watcher';

export interface ProjectHook {
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
    watcher: ProjectWatcher,
    project_root: string,
    workspace_root: string,
  }) => Promise<void>;
}

export type ProjectEvent = 'add' | 'change' | 'unlink' | 'all' & string;
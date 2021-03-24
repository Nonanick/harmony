import { ProjectWatcherConfig } from '../../toolbox/watcher/ProjectWatcherConfig';

export interface ProjectManagerConfig {
  config_file : string;
  harmony_folder : string;
  hooks_folder : string;
  watcher? : ProjectWatcherConfig;
}
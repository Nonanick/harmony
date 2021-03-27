import type { ProjectWatcherConfig } from '../watcher/ProjectWatcherConfig';

export interface ProjectManagerConfig {
  config_file : string;
  harmony_folder : string;
  hooks_folder : string;
  scripts_folder : string;
  commands_folder : string;
  watcher : ProjectWatcherConfig;
}
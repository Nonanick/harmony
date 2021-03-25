import type { ProjectManagerConfig } from '../project_manager/ProjectManagerConfig';
import { DefaultWatcherConfig } from '../watcher/watcher_config.default';

export const ProjectManagerDefaultConfig: ProjectManagerConfig = {
  config_file: './harmony.config.js',
  harmony_folder: '.harmony',
  hooks_folder: 'hooks',
  scripts_folder : 'scripts',
  commands_folder : 'commands',
  watcher: DefaultWatcherConfig
};
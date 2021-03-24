import { DefaultWatcherConfig } from '../../toolbox/watcher/watcher_config.default';
import { ProjectManagerConfig } from './ProjectManagerConfig';

export const ProjectManagerDefaultConfig: ProjectManagerConfig = {
  config_file: './harmony.config.js',
  harmony_folder: '.harmony',
  hooks_folder: 'hooks',
  watcher: DefaultWatcherConfig
};
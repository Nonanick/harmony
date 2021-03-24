import path from 'path';
import { promises as fs } from 'fs';
import glob from 'glob';
import { ProjectManagerConfig } from './config/ProjectManagerConfig';
import { ProjectManagerDefaultConfig } from './config/project_config.default';
import { ProjectHook } from '../toolbox/hooks/project.hook';
import { ProjectWatcher } from '../toolbox/watcher/project.watcher';

export class ProjectManager {

  started = false;

  hooks: ProjectHook[] = [];

  config: ProjectManagerConfig = ProjectManagerDefaultConfig;

  watcher?: ProjectWatcher;

  constructor(public root: string, public packageJson: any) {
    if (packageJson.harmony != null) {
      this.config = {
        ...this.config,
        ...packageJson.harmony
      };
    }

  }

  async start() {
    // Lookup for harmony.config.js
    await this.lookupForConfigFile();

    // Lookup for project 'hooks' inside .harmony folder
    await this.loadHooksFromProject();

    // Lookup for harmony scripts

    // Lookup for harmony commands

    // Start file watcher
    this.watcher = new ProjectWatcher(this.root, this.packageJson.name);
    this.watcher.start();
    
    this.started = true;
  }

  async lookupForConfigFile() {
    try {
      let configContent: string = await fs.readFile(
        path.join(this.root, this.config.config_file), 'utf-8'
      );
      this.config = {
        ...this.config,
        ...JSON.parse(configContent)
      };
    } catch (err) {
      //console.warn('Could not load harmony config file "' + this.config.config_file + '" in project root!');
    }
  }

  async loadHooksFromProject() {
    return new Promise((resolve, reject) => {
      glob('**/*.js', {
        cwd: path.join(this.root, this.config.harmony_folder, this.config.hooks_folder)
      }, async (err, matches) => {
        if (err) {
          reject(err);
          return;
        }

        for (let filepath of matches) {
          let fullpath = path.join(this.root, this.config.harmony_folder, this.config.hooks_folder, filepath);
          console.log('Found hook', fullpath);
          await import(fullpath).then(hooks => {
            for (let exportedHook in hooks) {
              this.addHook(hooks[exportedHook]);
            }
          });
        }

        resolve(matches);
      });

    });
  }

  addHook(...hook: ProjectHook[]) {
    this.hooks = [...this.hooks, ...hook];
    if (this.started) {
      this.watcher!.add(...hook);
    }
  }
}
import { Worker } from 'worker_threads';
import { ChildProcess } from 'child_process';
import path from 'path';
import { promises as fs } from 'fs';
import glob from 'glob';
import { ProjectManagerDefaultConfig } from '../../config/project_manager/project_config.default';
import { ProjectWatcher } from '../../watcher/ProjectWatcher';
import type { ProjectManagerConfig } from '../../config/project_manager/ProjectManagerConfig';
import type { WatcherHook } from '../../watcher/WatcherHook';
import type { ManagerCommandListener } from '../commands/ManagerCommandListener';
import type { HarmonyScript } from '../../scripts/HarmonyScript';
import { RunHarmonyScriptOptions } from '../../scripts/RunHarmonyScriptOptions';
import { RunHarmonyCommandOptions } from '../commands/RunHarmonyCommandOptions';
import { HarmonyManager } from '../HarmonyManager';

export class ProjectManager {

  started = false;

  hooks: WatcherHook[] = [];

  scripts: {
    [name: string]: HarmonyScript
  } = {};

  commands: ManagerCommandListener[] = [];

  config: ProjectManagerConfig = ProjectManagerDefaultConfig;

  watcher?: ProjectWatcher;

  workers : {
    [name : string] : Worker | ChildProcess
  } = {};

  constructor(public root: string, public packageJson: any, public harmony : HarmonyManager) {
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
    await this.loadScriptsFromProject();

    // Lookup for harmony commands
    await this.loadCommandsFromProject();

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
              if (typeof hooks[exportedHook] === "object") {
                this.addHook(hooks[exportedHook]);
              }
            }
          });
        }

        resolve(matches);
      });

    });
  }

  async loadScriptsFromProject() {
    return new Promise((resolve, reject) => {
      glob('**/*.js', {
        cwd: path.join(this.root, this.config.harmony_folder, this.config.scripts_folder)
      }, async (err, matches) => {
        if (err) {
          reject(err);
          return;
        }

        for (let filepath of matches) {
          let fullpath = path.join(this.root, this.config.harmony_folder, this.config.scripts_folder, filepath);
          console.log('Found script', fullpath);

          await import(fullpath).then(scripts => {
            for (let exportedScript in scripts) {
              if (typeof scripts[exportedScript] === "object") {
                this.addScript(scripts[exportedScript]);
              }
            }
          });
        }

        resolve(matches);
      });

    });
  }

  async loadCommandsFromProject() {
    return new Promise((resolve, reject) => {
      glob('**/*.js', {
        cwd: path.join(this.root, this.config.harmony_folder, this.config.commands_folder)
      }, async (err, matches) => {
        if (err) {
          reject(err);
          return;
        }

        for (let filepath of matches) {
          let fullpath = path.join(this.root, this.config.harmony_folder, this.config.commands_folder, filepath);
          console.log('Found command', fullpath);

          await import(fullpath).then(commands => {
            for (let exportedCommand in commands) {
              if (typeof commands[exportedCommand] === "object") {
                this.addCommand(commands[exportedCommand]);
              }
            }
          });
        }

        resolve(matches);
      });

    });
  }

  addHook(...hook: WatcherHook[]) {
    this.hooks = [...this.hooks, ...hook];
    if (this.started) {
      this.watcher!.add(...hook);
    }
  }

  hasHook(hook: WatcherHook | string): boolean {
    if (typeof hook === "string") {
      return this.hooks.filter(h => h.name === hook).length > 0;
    }
    return this.hooks.includes(hook);
  }


  addScript(...scripts: HarmonyScript[]) {
    for (let script of scripts) {
      this.scripts[script.name] = script;
    }
  }

  runScript(
    script: string | HarmonyScript,
    options?: RunHarmonyScriptOptions
  ) {

  }

  addCommand(...command: ManagerCommandListener[]) {
    this.commands = [
      ...this.commands,
      ...command
    ];
  }

  runCommand(
    command: string | ManagerCommandListener, args: any,
    options?: RunHarmonyCommandOptions
  ) {

  }
}
import { Worker } from 'worker_threads';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import glob from 'glob';
import path from 'path';
import type { ProjectManagerConfig } from '../../config/project_manager/ProjectManagerConfig';
import { ProjectManagerDefaultConfig } from '../../config/project_manager/project_config.default';
import type { HarmonyScript } from '../../scripts/HarmonyScript';
import { RunHarmonyScriptOptions } from '../../scripts/RunHarmonyScriptOptions';
import { ProjectWatcher } from '../../watcher/ProjectWatcher';
import type { WatcherHook } from '../../watcher/WatcherHook';
import type { HarmonyCommand } from '../commands/HarmonyCommand';
import { RunHarmonyCommandOptions } from '../commands/RunHarmonyCommandOptions';
import { HarmonyManager } from '../HarmonyManager';
import { ChildSubprocess, ProjectSubprocess, WorkerSubprocess } from './ProjectSubprocess';
import { SpawnProcessOptions } from './SpawnProcessOptions';
import { SpawnWorkerOptions } from './SpawnWorkerOptions';
import { isHarmonyHook, isHarmonyScript } from '../../toolbox/validation';
import chalk from 'chalk';

export class ProjectManager {

  started = false;

  hooks: WatcherHook[] = [];

  scripts: {
    [name: string]: HarmonyScript
  } = {};

  commands: HarmonyCommand[] = [];

  config: ProjectManagerConfig = ProjectManagerDefaultConfig;

  watcher?: ProjectWatcher;

  subprocesses: { [name: string]: ProjectSubprocess & { created_at: Date; buffers: { [name: string]: string } }; } = {};

  constructor(
    public root: string,
    public packageJson: any,
    public harmony: HarmonyManager
  ) {
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

    // Start file watcher if any hook was found
    if (this.hooks.length > 0) {
      this.watcher = new ProjectWatcher(this.root, this.packageJson.name);
      this.watcher.start();
    }

    this.started = true;

    console.log(
      chalk.bold.hex('#009991')(
        `---[${this.packageJson.name.charAt(0).toLocaleUpperCase() + this.packageJson.name.substr(1)}]`
      )
    );

    if (this.hooks.length > 0) {
      console.log('➡',
        chalk.magentaBright(' Hooks\n') + `${this.hooks.map(h => ' - ' + h.name).join(';\n')};`
      );
    }

    if (Object.values(this.scripts).length > 0) {
      console.log('➡',
        chalk.green(' Scripts\n') + `${Object.values(this.scripts).map(s => ` - ${(s.title ?? s.name)} (${chalk.bold('run ' + s.name)} || ${chalk.bold(`run @${this.packageJson.name} ${s.name}`)})`).join('\n')}`
      );
    }

    if (this.commands.length > 0) {
      console.log('➡', chalk.blueBright(' Commands\n') + `${this.commands.map(c => ` - ${c.name} (${chalk.bold(`@${this.packageJson.name} ${c.command.toString()}`)})`).join(';\n')}`);
    }
    console.log();
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
          await import(fullpath).then(hooks => {
            let count = 0;
            for (let exportedHook in hooks) {
              if (isHarmonyHook(hooks[exportedHook])) {
                this.addHook(hooks[exportedHook]);
                count++;
              }
            }
            if (count === 0) {
              console.warn(`⚠️  [Manager:${chalk.bold(this.packageJson.name)}] No valid hooks found in file "${filepath}"!\n`);
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
          await import(fullpath).then(scripts => {
            let count = 0;
            for (let exportedScript in scripts) {
              if (isHarmonyScript(scripts[exportedScript])) {
                this.addScript(scripts[exportedScript]);
                count++;
              }
            }
            if (count === 0) {
              console.warn(`⚠️  [Manager:${chalk.bold(this.packageJson.name)}] No valid scripts found in file "${filepath}"!\n`);
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

  addCommand(...command: HarmonyCommand[]) {
    this.commands = [
      ...this.commands,
      ...command
    ];
  }

  runCommand(
    command: string | HarmonyCommand, args: any,
    options?: RunHarmonyCommandOptions
  ) {
    console.log('RUN COMMAND', command);
  }

  async spawnWorker(args: SpawnWorkerOptions) {

    if (this.subprocesses[args.name] != null) {
      await this.killSubprocess(args.name);
    }
    try {
      let newWorker = new Worker(args.path, {
        argv: Object.entries(args.args).flat(1).map(unknown => String(unknown)),
        stderr: (args.io?.err ?? 'pipe') != 'pipe' ? true : false,
        stdout: (args.io?.out ?? 'pipe') != 'pipe' ? true : false,
        stdin: (args.io?.in ?? 'pipe') != 'pipe' ? true : false,
        env: process.env,
      });

      let newSubprocess: WorkerSubprocess & { created_at: Date; buffers: { [name: string]: string } } = {
        type: 'worker',
        process: newWorker,
        spawn: args,
        created_at: new Date(),
        buffers: {},
      };

      this.subprocesses[args.name] = newSubprocess;

      return newSubprocess;
    } catch (err) {
      console.error('Failed to launch worker!', err);
    }
  }

  async restartSubprocess(name: string) {
    if (this.subprocesses[name] == null) {
      return;
    }

    let subprocess = this.subprocesses[name];
    await this.killSubprocess(name);

    switch (subprocess.type) {
      case 'worker':
        await this.spawnWorker(subprocess.spawn);
        break;
      case 'process':
        await this.spawnChildProcess(subprocess.spawn);
        break;
    }
  }

  async killSubprocess(name: string) {

    if (this.subprocesses[name] == null) {
      return;
    }

    let subprocess = this.subprocesses[name];

    switch (subprocess.type) {
      case 'worker':
        await subprocess.process.terminate();
        break;
      case 'process':
        subprocess.process.kill('SIGTERM');
        break;
    }

    delete this.subprocesses[name];
  }

  async spawnChildProcess(args: SpawnProcessOptions) {

    if (this.subprocesses[args.name] != null) {
      await this.killSubprocess(args.name);
    }

    let newChild = exec(args.launch, {
      cwd: args.cwd ?? this.root,
      env: process.env,
    });

    let newSubprocess: ChildSubprocess & { created_at: Date; buffers: { [name: string]: string } } = {
      type: 'process',
      process: newChild,
      spawn: args,
      created_at: new Date(),
      buffers: {},
    };

    if (args.out) {
      newChild.stdout?.on("data", (data) => {
        if (newSubprocess.buffers['out'] == null) newSubprocess.buffers['out'] = '';
        newSubprocess.buffers['out'] += String(data);
        if (args.out?.filter != null) {
          let filtered = args.out.filter(data);
          if (filtered !== false) {
            (args.out.pipeTo ?? process.stdout).write(filtered);
          }
        } else {
          (args.out?.pipeTo ?? process.stdout).write(data);
        }
      });
    }

    if (args.err) {
      newChild.stderr?.on("data", (data) => {
        if (newSubprocess.buffers['err'] == null) newSubprocess.buffers['err'] = '';
        newSubprocess.buffers['err'] += String(data);
        if (args.err?.filter != null) {
          let filtered = args.err.filter(data);
          if (filtered !== false) {
            (args.err.pipeTo ?? process.stderr).write(filtered);
          }
        } else {
          (args.err?.pipeTo ?? process.stderr).write(data);
        }
      });
    }


    return newChild;

  }
}

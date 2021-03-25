import { exec, ChildProcess } from 'child_process';
import { Worker } from 'worker_threads';
import path from 'path';
import {WorkspaceRoot} from '../../../workspace.root';
import { ProjectWatcher } from '../../../watcher/project.watcher';
import chalk from 'chalk';
import { RestartServerOnDistFolderChanges } from '../../../toolbox/hooks/server/restart_on_dist_changes';

const compileErrorListener = (data: any) => {
  let errorMatch = String(data).match(/(?<source_file>[\s\S]*?)\((?<line>[0-9]*?),[0-9]*?\): error (?<error_code>\w*?): (?<error_message>.*)?./);
  if (errorMatch) {
    console.error(
      `🚨 ${chalk.bold('[ServerCompiler]')} ${chalk.red('ERROR ' + chalk.bold(errorMatch.groups!.error_code))} \n` +
      `${chalk.bold(errorMatch.groups!.source_file)} @ line ${errorMatch.groups!.line};\n` +
      `${chalk.red('='.repeat(process.stdout.columns))}\n` +
      `${chalk.bold(errorMatch.groups!.error_message)}\n` + 
      `${chalk.red('='.repeat(process.stdout.columns))}\n`
    );
  }
};

const doneLoadingListener = (data: any) => {
  if (String(data).match(/Found [0-9]*? errors\./)) {
    console.log(`💻 ${chalk.bold('[Project: Server]')} Typescript compiler finished compiling!`);
    if(resolveCompiler != null) {
      resolveCompiler();
      resolveCompiler = undefined;
    }
  }
};

let resolveCompiler : any;

// Server Project
const Server: {
  Boot(): Promise<void>;

  BootCompiler(): Promise<void>;
  RestartCompiler(): Promise<void>;
  Compiler?: ChildProcess;

  BootWatcher(): void;
  Watcher?: ProjectWatcher;

  BootWorker(): void;
  RestartWorker(): Promise<void>;
  WorkerThread?: Worker;

  [name: string]: any
} = {

  ProjectRoot: path.join(WorkspaceRoot, 'projects', 'server'),

  async Boot() {
    await Server.BootCompiler();
    Server.BootWatcher();
    Server.BootWorker(); // Worker shall be booted after the generation of entities!
  },

  BootWatcher: () => {
    const watcher = new ProjectWatcher(Server.ProjectRoot, 'Server');

    watcher.start();

    watcher.watcher.on("ready", () => {
      watcher.add(RestartServerOnDistFolderChanges);
    });

    Server.Watcher = watcher;
  },

  async BootCompiler() {
    const serverCompiler = exec('tsc -w', { cwd: Server.ProjectRoot });
    Server.Compiler = serverCompiler;
    return new Promise((resolve) => {
      serverCompiler.stdout?.on("data", compileErrorListener);
      serverCompiler.stdout?.on("data", doneLoadingListener);
      resolveCompiler = resolve;
    });
  },

  async RestartCompiler() {
    if (Server.Compiler == null) {
      Server.BootCompiler();
    } else {
      try {
        Server.Compiler!.stdout?.off("data", compileErrorListener);
        Server.Compiler!.stdout?.off("data", doneLoadingListener);
        Server.Compiler!.kill(0);
        Server.BootCompiler();
      } catch (err) {
        console.error("🚨 [Project: Server] ERROR!\nFailed to restart server compiler thread!", err);
      }
    }
  },

  BootWorker: () => {
    const worker = new Worker(
      path.join(Server.ProjectRoot, 'dist', 'server.boot.esm.js'),
    );
    Server.WorkerThread = worker;
    console.log(`💻 ${chalk.bold('[Project: Server]')} Server worker procces loaded!`);
  },

  async RestartWorker() {
    if (Server.WorkerThread == null) {
      Server.BootWorker();
    } else {
      try {
        await Server.WorkerThread!.terminate();
        Server.BootWorker();
      } catch (err) {
        console.error("🚨 [Project: Server] ERROR!\nFailed to restart server worker thread!", err);
      }
    }
  }

};

export { Server };
import { exec, ChildProcess } from 'child_process';
import { Worker } from 'worker_threads';
import path from 'path';
import ProjectRoot from '../../../project.root';
import { ProjectWatcher } from '../../../toolbox/project.watcher';
import chalk from 'chalk';
import { RestartServerOnDistFolderChanges } from '../../../toolbox/hooks/server/restart_on_dist_changes';

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

  ProjectRoot: path.join(ProjectRoot, 'projects', 'server'),

  async Boot() {
    await Server.BootCompiler();
    Server.BootWatcher();
    //Server.BootWorker(); // Worker shall be booted after the generation of entities!
  },

  BootWatcher: () => {
    const watcher = new ProjectWatcher(Server.ProjectRoot);

    watcher.add(RestartServerOnDistFolderChanges);
    watcher.start();

    Server.Watcher = watcher;
  },

  async BootCompiler() {
    const serverCompiler = exec('tsc -w', { cwd: Server.ProjectRoot });
    Server.Compiler = serverCompiler;

    serverCompiler.stderr?.on("data", (a) => {
      process.stderr.write(a);
    });

    return new Promise((resolve, reject) => {
      let compilerOutput = "";
      let listener = (data: any) => {
        compilerOutput += String(data);
        if (compilerOutput.match(/Found [0-9]*? errors\./)) {
          serverCompiler.stdout?.off("data", listener);
          console.log(`💻 ${chalk.bold('[Project: Server]')} Typescript compiler finished loading!`);
          resolve();
        }
      };

      serverCompiler.stdout?.on("data", listener);
    });
  },

  async RestartCompiler() {
    if (Server.Compiler == null) {
      Server.BootCompiler();
    } else {
      try {
        Server.Compiler!.kill(0);
        Server.BootCompiler();
      } catch (err) {
        console.error("🚨 [Project: Server] ERROR!\nFailed to restart server compiler thread!", err);
      }
    }
  },

  BootWorker: () => {
    const worker = new Worker(
      path.join(Server.ProjectRoot, 'dist', 'server.boot.esm.js')
    );
    Server.WorkerThread = worker;
    console.log(`💻 ${chalk.bold('[Project: Server]')} Project worker loaded!`);
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
import chalk from 'chalk';
import { ChildProcess, exec } from 'child_process';
import path from 'path';
import ProjectRoot from '../../../project.root';
import { ProjectWatcher } from '../../../toolbox/project.watcher';

// WebApp Project
const WebApp: {
  ProjectRoot: string;
  Boot(): Promise<void>;

  BootCompiler(): Promise<void>;
  Compiler?: ChildProcess;

  BootWatcher(): void;
  Watcher?: ProjectWatcher;

  [name: string]: any
} = {

  ProjectRoot: path.join(ProjectRoot, 'projects', 'webapp'),

  async Boot() {
    await WebApp.BootCompiler();
    WebApp.BootWatcher();
  },

  BootWatcher: () => {
    const watcher = new ProjectWatcher(WebApp.ProjectRoot, 'WebApp');

    watcher.start();

    WebApp.Watcher = watcher;
  },

  async BootCompiler() {
    const webappCompiler = exec('pnpx rollup -c -w', { cwd: WebApp.ProjectRoot });
    WebApp.Compiler = webappCompiler;



    return new Promise((resolve) => {
      let resolved = false;
      let compilerOutput = "";
      let listener = (data: any) => {
        compilerOutput += String(data);
        if (compilerOutput.match(/Your application is ready\~!/) && !resolved) {
          console.log(`🌍 ${chalk.bold('[Project: WebApp]')} WebApp compiler finished loading!`);
          resolve();
          resolved = true;
        }

        let matchLocalWebAppPort = compilerOutput.match(/Local:.*\:([0-9]*)/);
        if (matchLocalWebAppPort) {
          console.log(
            `🚀 ${chalk.bold('[Project: WebApp]')} WebApp is running locally on port ${chalk.bold(matchLocalWebAppPort[1])}!`
            + `\n\t-Link:   http://localhost:${matchLocalWebAppPort[1]}`
          );
          compilerOutput = "";
          webappCompiler.stdout?.off("data", listener);
          webappCompiler.stderr?.on("data", (a) => {
            process.stderr.write(a);
          });
        }
      };
      webappCompiler.stdout?.on("data", listener);
    });
  },
};

process.on("beforeExit", () => {
  WebApp.Compiler?.kill("SIGTERM");
});

export { WebApp };

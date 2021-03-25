import chalk from 'chalk';
import { ChildProcess, exec } from 'child_process';
import path from 'path';
import { WorkspaceRoot } from '../../../workspace.root';
import { GenerateWebappRoutesArray } from '../../../../projects/webapp/.harmony/hooks/generate_route_array';
import { ProjectWatcher } from '../../../watcher/ProjectWatcher';

// WebApp Project
const WebApp: {
  WorkspaceRoot: string;
  Boot(): Promise<void>;

  BootCompiler(): Promise<void>;
  Compiler?: ChildProcess;

  BootWatcher(): void;
  Watcher?: ProjectWatcher;

  [name: string]: any
} = {

  WorkspaceRoot: path.join(WorkspaceRoot, 'projects', 'webapp'),

  async Boot() {
    WebApp.BootCompiler();
    WebApp.BootWatcher();
  },

  BootWatcher: () => {
    const watcher = new ProjectWatcher(WebApp.WorkspaceRoot, 'WebApp');
    watcher.add(
      GenerateWebappRoutesArray
    );
    
    watcher.start();

    WebApp.Watcher = watcher;
  },

  async BootCompiler() {
    const webappCompiler = exec('pnpx rollup -c -w', { cwd: WebApp.WorkspaceRoot });
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
            if(
              String(data).match(/bundles src\/.* → public\/.*.../)
            ) {
              console.log('Bundled:', chalk.red(data));
            }
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

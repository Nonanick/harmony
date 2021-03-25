import { HarmonyScript } from '@harmony';
import chalk from 'chalk';
import path from 'path';

const TSCErrorMatcher = /(?<file_name>.*?)\((?<line>[0-9]*),(?<column>[0-9]*)\): error\s(?<code>\w*): (?<message>.*)/;

export const DevServerScript: HarmonyScript = {
  name: 'dev',
  title: 'Server Worker [Development]',
  run: async ({ manager, root, args }) => {
    let compileChild = await manager.spawnChildProcess({
      name: 'server-compiler',
      title: 'Server compiler',
      launch: 'tsc -w',
      out: {
        pipeTo: process.stdout,
        filter(data: string) {
          if (String(data).match(/Found 0 errors\. Watching for file changes\./)) {
            return '✅ Server compilation completed without errors!\n';
          }

          let errorMatch = data.match(TSCErrorMatcher);
          if (errorMatch) {
            return chalk.bold(`🚨 ${chalk.bgRed.white('Typescript Error')} [${errorMatch.groups!.code }]`)
              + '@' + chalk.bold(errorMatch.groups!.file_name) + ':' + errorMatch.groups!.line + ',' + errorMatch.groups!.column + '\n'
              + chalk.red.bold('='.repeat(process.stdout.columns)) + '\n'
              + errorMatch.groups!.message.replace(/\.\s/g,'.\n') + '\n'
              + chalk.red.bold('='.repeat(process.stdout.columns)) + '\n';
          }

          return false as false;
        }
      }
    });

    compileChild.stdout?.on("data", (data) => {
      if (String(data).match(/Found 0 errors\. Watching for file changes\./)) {
        manager.spawnWorker({
          name: 'server-worker',
          title: 'Server Worker',
          path: path.join(root, 'dist', 'server.boot.esm.js'),
          args
        })
      }
    });


  }
}
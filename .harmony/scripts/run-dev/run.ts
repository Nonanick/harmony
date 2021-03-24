//import 'v8-compile-cache';
import chalk from 'chalk';
import { CLIInputListener } from '../../toolbox/cli.input.listener';
import { Library } from './projects/run.library';
import { Server } from './projects/run.server';
import { WebApp } from './projects/run.webapp';

console.clear();
let title = '| HARMONY |';

console.log
  (chalk.bold(`
${chalk.white(chalk.bold(chalk.bgBlue('='.repeat(Math.floor((process.stdout.columns - title.length) / 2)))))
    + title
    + chalk.white(chalk.bold(chalk.bgBlue('='.repeat(Math.floor((process.stdout.columns - title.length) / 2 + (process.stdout.columns - title.length) % 2)))))
    }\n\n`)
    + `${chalk.italic('Starting projects in development mode!')}`
  )

const inputListener = new CLIInputListener(process.stdin);

// Server Project
Server.Boot();

// Library Project
Library.Boot();

// WebApp Project
WebApp.Boot();

inputListener.on("rs:lib", async _ => {
  await Library.RestartCompiler();
});

inputListener.on("rs:server", _ => {
  DemandServerRestart();
});

inputListener.on("rs:server-build", _ => {
  DemandServerCompilerRestart();
});

inputListener.on("exit", _ => {
  process.exit(0);
});

export function DemandServerCompilerRestart() {
  console.log(`❕ ${chalk.bold('[Harmony]')} Demanding manual server compiler restart!`);
  Server.RestartCompiler().then(_ => {
    //process.stdout.clearLine(0);
  });
}

export function DemandServerRestart() {
  console.log(`❕ ${chalk.bold('[Harmony]')} Demanding manual server restart!`);
  Server.RestartWorker();
}

//import 'v8-compile-cache';
import chalk from 'chalk';
import { ReadableStreamListener } from '../../toolbox/readable.stream..listener';
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

const stdinListener = new ReadableStreamListener(process.stdin);

// Server Project
Server.Boot();

// Library Project
Library.Boot();

// WebApp Project
WebApp.Boot();

stdinListener.on("rs:lib", async _ => {
  await Library.RestartCompiler();
});

stdinListener.on("rs:server", _ => {
  DemandServerRestart();
});

stdinListener.on("rs:server-build", _ => {
  DemandServerCompilerRestart();
});

stdinListener.on("exit", _ => {
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

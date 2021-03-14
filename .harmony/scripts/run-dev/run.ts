import chalk from 'chalk';
import { CLIInputListener } from '../../toolbox/cli.input.listener';
import { Library } from './projects/run.library';
import { Server } from './projects/run.server';
import { WebApp } from './projects/run.webapp';

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

inputListener.on("rs:web", async _ => {
  await WebApp.RestartCompiler();
});
inputListener.on("rs:ui", async _ => {
  await WebApp.RestartCompiler();
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
    process.stdout.clearLine(0);
  });
}

export function DemandServerRestart() {
  console.log(`❕ ${chalk.bold('[Harmony]')} Demanding manual server restart!`);
  Server.RestartWorker();
}

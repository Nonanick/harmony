import path from 'path';
import { promises as fs } from 'fs';
import chalk from 'chalk';
import { ReadableStreamListener } from '../toolbox/readable.stream..listener';
import { HarmonyManagerConfig } from '../config/manager/HarmonyManagerConfig';
import { ManagerCommandListener } from './commands/ManagerCommandListener';
import { DefaultManagerConfig } from '../config/manager/config.default';
import { ProjectManager } from './project/ProjectManager';

export class HarmonyManager {

  config: HarmonyManagerConfig = DefaultManagerConfig;

  stdinListener?: ReadableStreamListener;

  managerCLICommands: ManagerCommandListener[] = [];

  projectManagers : {
    [projectName : string] : ProjectManager
  } = {};

  started = false;

  constructor(config: Partial<HarmonyManagerConfig> = {}) {
    this.config = {
      ...this.config,
      ...config
    };
  }

  async start() {

    this.started = true;

    if (this.config.onInit?.displayCLIHeader === true) {
      console.clear();
      console.log(this.outputManagerHeader());
    }

    this.startListeningForInput();

    await this.searchForProjects();

  }

  async searchForProjects() {
    let lookupIn = this.config.projects_location;
    return fs.readdir(lookupIn, { withFileTypes: true })
      .then(async folderContents => {
        for (let folderInfo of folderContents) {
          if (folderInfo.isDirectory()) {
            try {
              let packageJSONContent = await fs.readFile(
                path.join(lookupIn, folderInfo.name, 'package.json'), 'utf-8'
              );
              this.addProject(
                path.join(lookupIn, folderInfo.name),
                JSON.parse(packageJSONContent)
              );
            } catch (err) {
              console.error('Folder', folderInfo.name, 'inside of project root does not contain a readable package.json file!');
            }
          }
        }
      });
  }

  async addProject(path: string, packageConfig?: any) {
    if (packageConfig == null) {
      try {
        let packageJSONContent = await fs.readFile(
          path, 'utf-8'
        );
        packageConfig = JSON.parse(packageJSONContent);
      }
      catch (err) {
        console.error('Folder', path, 'does not contain a readable package.json file!');
      }
    }
    console.log('Spawning new project manager for', packageConfig.name);

    this.projectManagers[packageConfig.name] = new ProjectManager(
      path, packageConfig
    );

    if(this.started) {
      await this.projectManagers[packageConfig.name].start();
    }
  }

  startListeningForInput() {
    this.stdinListener = new ReadableStreamListener(process.stdin);

    this.stdinListener.on(ReadableStreamListener.CommandSentEvent, (command) => {
      console.log("User sent a new command to harmony:", command);
    });
  }

  outputManagerHeader() {
    const headerContent = '| HARMONY WORKSPACE MANAGER |';

    return (
      `${chalk.white(chalk.bold(chalk.bgBlue('='.repeat(Math.floor((process.stdout.columns - headerContent.length) / 2)))))
      + headerContent
      + chalk.white(chalk.bold(chalk.bgBlue('='.repeat(Math.floor((process.stdout.columns - headerContent.length) / 2 + (process.stdout.columns - headerContent.length) % 2)))))
      }\n\n`
    );
  }
}


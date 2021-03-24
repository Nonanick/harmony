import path from 'path';
import { promises as fs } from 'fs';
import chalk from 'chalk';
import { CLIInputListener } from '../toolbox/cli.input.listener';
import { DefaultManagerConfig } from './config/config.default';
import { HarmonyManagerConfig } from './config/HarmonyManagerConfig';
import { ProjectManager } from './ProjectManager';
import { ManagerCommandListener } from './commands/ManagerCommandListener';

export class HarmonyManager {

  config: HarmonyManagerConfig = DefaultManagerConfig;

  inputListener?: CLIInputListener;

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
    this.inputListener = new CLIInputListener(process.stdin);

    this.inputListener.on(CLIInputListener.CommandSentEvent, (command) => {
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

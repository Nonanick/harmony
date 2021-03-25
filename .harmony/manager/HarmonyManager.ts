import path from 'path';
import { promises as fs } from 'fs';
import chalk from 'chalk';
import { ReadableStreamListener } from '../toolbox/readable.stream.listener';
import { HarmonyManagerConfig } from '../config/manager/HarmonyManagerConfig';
import { HarmonyCommand } from './commands/HarmonyCommand';
import { DefaultManagerConfig } from '../config/manager/config.default';
import { ProjectManager } from './project/ProjectManager';
import { isHarmonyCommand } from '../toolbox/validation';
import { WorkspaceRoot } from '../workspace.root';

export class HarmonyManager {

  config: HarmonyManagerConfig = DefaultManagerConfig;

  stdinListener?: ReadableStreamListener;

  commands: HarmonyCommand[] = [];

  projectManagers: {
    [projectName: string]: ProjectManager
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
      this.outputManagerHeader();
    }

    this.startListeningForInput();

    await this.searchForProjects();

    await this.loadCommands();

  }

  async loadCommands() {
    let lookupIn = path.resolve(__dirname, 'commands');
    return fs.readdir(lookupIn, { withFileTypes: true })
      .then(async folderContents => {
        for (let file of folderContents) {
          if (file.isFile() && file.name.match(/\.js$/)) {
            import(
              path.join(lookupIn, file.name)
            ).then(exported => {
              for (let commandName in exported) {
                if (isHarmonyCommand(exported[commandName])) {
                  this.commands.push(exported[commandName]);
                }
              }
            }).catch(err => {
              console.error('Error importing command file!');
            });
          }
        }
      }).then(_ => {
        console.log(
          '✅', chalk.bold('Finished loading commands (' + this.commands.length + ')!')
        );
      });
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
              await this.addProject(
                path.join(lookupIn, folderInfo.name),
                JSON.parse(packageJSONContent)
              );
            } catch (err) {
              console.error('Folder', folderInfo.name, 'inside of project root does not contain a readable package.json file!');
            }
          }
        }
      }).then(_ => {
        console.log(
          '✅', chalk.bold('Finished loading projects (' + Object.keys(this.projectManagers).length + ')!')
        );
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

    this.projectManagers[packageConfig.name] = new ProjectManager(
      path, packageConfig, this
    );

    if (this.started) {
      await this.projectManagers[packageConfig.name].start();
    }
  }

  startListeningForInput() {
    this.stdinListener = new ReadableStreamListener(process.stdin);

    this.stdinListener.on(
      ReadableStreamListener.CommandSentEvent,
      (command: string) => {
        // See if it's project specific script
        let targetedCommandMatch = command.match(/^@(?<project_name>\w*)/);
        if (targetedCommandMatch) {
          console.log('command directed to project', targetedCommandMatch.groups!.project_name);
          return;
        }

        // Check for harmony commands
        for (let cmd of this.commands) {
          let matchesWithCmd: RegExpMatchArray | null | true = null;

          if (cmd.command instanceof RegExp) {
            matchesWithCmd = command.match(cmd.command)
          }

          if (typeof cmd.command === "string") {
            matchesWithCmd = true;
          }

          if (Array.isArray(cmd.command)) {
            for (let subMatcher of cmd.command) {
              if (subMatcher instanceof RegExp) {
                matchesWithCmd = command.match(subMatcher)
              }

              if (typeof subMatcher === "string") {
                matchesWithCmd = true;
              }

              if (matchesWithCmd != null) {
                break;
              }
            }
          }

          if (matchesWithCmd != null) {
            cmd.run({
              harmony : this,
              manager : {} as any,
              root : WorkspaceRoot,
              workers : {},
              commandArgs : (typeof matchesWithCmd === "object" ? matchesWithCmd.groups ?? {} : {})
            });
          }
        }

      }
    );
  }

  outputManagerHeader() {
    console.clear();

    const headerContent = '[ Harmony\'s Workspace ] ';
    console.log('\n🍃',
      // `${chalk.bgBlueBright.bold(' '.repeat(Math.floor((process.stdout.columns - headerContent.length) / 2)))
      chalk.bold(headerContent)
      + chalk.white.bgHex("#009091").bold('='.repeat((process.stdout.columns - headerContent.length - 5)))
      + '\n'
    );
  }
}


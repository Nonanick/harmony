import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { WorkspaceRoot } from '../../workspace.root';

// Setup Harmony project

console.log(
  `
${chalk.bold('🎵 [Harmony] - Setup a new Mono Repo Project:')}
------------------------------------------`
);

inquirer.prompt([
  {
    type: 'input',
    name: 'project_name',
    message: 'What\'s the name of your project ?'
  },
  {
    type: 'input',
    name: 'version',
    message: 'What version should it start?',
    default: '0.0.1'
  },
  {
    type: 'input',
    name: 'author',
    message: 'Who\'s the author?',
    default: os.userInfo().username
  },
  {
    type: 'input',
    name: 'license',
    message: 'What license will it be?',
    default: 'MIT'
  }
]).then(async answers => {
  console.log(chalk.bold(`
🔌 Configuring workspace and subprojects 'package.json'
-------------------------------------------------------`));
  const projectsRootFolder = path.join(WorkspaceRoot, 'projects');
  for (let projectFolderName of ['../','desktop', 'server', 'library', 'webapp',]) {

    try {
      const packageFileContents = await fs.readFile(
        path.join(projectsRootFolder, projectFolderName, 'package.json'),
        'utf-8'
      );
      const packageConfig = JSON.parse(packageFileContents);
      const oldConfig = packageConfig;

      // Update package workspace dependencies name */
      const oldProjectName = oldConfig.name.replace(new RegExp(`-${projectFolderName}$`), '');
      for (let dependencyName in packageConfig.dependencies ?? {}) {
        const macthesWorkspaceDependency = dependencyName.match(new RegExp(`^${oldProjectName}-(.*)$`));
        if (macthesWorkspaceDependency) {
          const matchedName = macthesWorkspaceDependency[1];
          const dependencyLocationAndVersion = packageConfig.dependencies[dependencyName];
          const newDependencyName = `${answers.project_name}-${matchedName}`;
          delete packageConfig.dependencies[dependencyName];
          packageConfig.dependencies[newDependencyName] = dependencyLocationAndVersion;
        }
      }

      // Update package.json
      const newPackageConfig = {
        ...packageConfig,
        name: `${projectFolderName != '../' ?  oldProjectName : answers.project_name}`,
        version: answers.version,
        author: answers.author,
        license: answers.license,
        description: `${firstToUpper(answers.project_name)}'s ${projectFolderName != '../' ? firstToUpper(projectFolderName) + ' project' : ' root package'}`
      };

      // Write changes to disk
      await fs.writeFile(
        path.join(projectsRootFolder, projectFolderName, 'package.json'),
        JSON.stringify(newPackageConfig, null, 2)
      );

      console.log(` ❕ Updated project ${projectFolderName != '../' ? projectFolderName : 'workspace root'} package.json file!`);

    } catch (err) {
      console.error(
        chalk.red(chalk.bold(`Failed to update package.json from ${projectFolderName}!\n`)), err
      );
      continue;
    }

  }

  return;
}).catch(err => {
  console.error('Failed to acquire information to setup the projects!', err);
});

function firstToUpper(text: string, separators: string[] = [' ']) {
  return text.split(new RegExp(separators.join('|'))).map(t => t.charAt(0).toUpperCase() + t.substr(1)).join(' ');
}


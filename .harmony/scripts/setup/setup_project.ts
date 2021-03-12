import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ProjectRoot from '../../project.root';

// Setup Harmony project

console.log(
  `
${chalk.bold('[Harmony] - Setup a new Mono Repo Project:')}
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
  let projectsRootFolder = path.join(ProjectRoot, 'projects');
  for (let projectFolderName of ['desktop', 'server', 'library', 'webapp']) {

    // Update package.json
    try {
      let packageFileContents = await fs.readFile(
        path.join(projectsRootFolder, projectFolderName, 'package.json'),
        'utf-8'
      );
      let packageConfig = JSON.parse(packageFileContents);

      packageConfig = {
        ...packageConfig,
        name: `${answers.project_name}-${projectFolderName}`,
        version: answers.version,
        author: answers.author,
        license: answers.license,
        description : `${firstToUpper(answers.project_name)}'s ${firstToUpper(projectFolderName)} project`
      };

      await fs.writeFile(
        path.join(projectsRootFolder, projectFolderName, 'package.json'),
        JSON.stringify(packageConfig, null, 2)
      );

      console.log(`[!] Updated project ${projectFolderName} package.json file!`);

    } catch (err) {
      console.error(
        chalk.red(chalk.bold(`Failed to update package.json from ${projectFolderName}!\n`)), err
      );
      continue;
    }

  }

  return;
}).catch(err => {

});

function firstToUpper(text : string, separators : string[] = [' ']) {
  return text.split(' ').map(t => t.charAt(0).toUpperCase() + t.substr(1)).join(' ');
}


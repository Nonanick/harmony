"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const project_root_1 = __importDefault(require("../../project.root"));
// Setup Harmony project
console.log(`
${chalk_1.default.bold('[Harmony] - Setup a new Mono Repo Project:')}
------------------------------------------`);
inquirer_1.default.prompt([
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
        default: os_1.default.userInfo().username
    },
    {
        type: 'input',
        name: 'license',
        message: 'What license will it be?',
        default: 'MIT'
    }
]).then((answers) => __awaiter(void 0, void 0, void 0, function* () {
    let projectsRootFolder = path_1.default.join(project_root_1.default, 'projects');
    for (let projectFolderName of ['desktop', 'server', 'library', 'webapp']) {
        // Update package.json
        try {
            let packageFileContents = yield fs_1.promises.readFile(path_1.default.join(projectsRootFolder, projectFolderName, 'package.json'), 'utf-8');
            let packageConfig = JSON.parse(packageFileContents);
            packageConfig = Object.assign(Object.assign({}, packageConfig), { name: `${answers.project_name}-${projectFolderName}`, version: answers.version, author: answers.author, license: answers.license, description: `${firstToUpper(answers.project_name)}'s ${firstToUpper(projectFolderName)} project` });
            yield fs_1.promises.writeFile(path_1.default.join(projectsRootFolder, projectFolderName, 'package.json'), JSON.stringify(packageConfig, null, 2));
            console.log(`[!] Updated project ${projectFolderName} package.json file!`);
        }
        catch (err) {
            console.error(chalk_1.default.red(chalk_1.default.bold(`Failed to update package.json from ${projectFolderName}!\n`)), err);
            continue;
        }
    }
    return;
})).catch(err => {
});
function firstToUpper(text, separators = [' ']) {
    return text.split(' ').map(t => t.charAt(0).toUpperCase() + t.substr(1)).join(' ');
}

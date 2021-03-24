import { exec, ChildProcess } from 'child_process';
import path from 'path';
import { WorkspaceRoot } from '../../../workspace.root';
import { ProjectWatcher } from '../../../toolbox/watcher/project.watcher';
import chalk from 'chalk';
import GenerateDTOOnEntityUpsert from '../../../toolbox/hooks/library/generate_dto_on_entity_upsert.hook';
import GenerateLibraryEntitiesIndex from '../../../toolbox/hooks/library/generate_index_on_entity_upsert.hook';
import GenerateDTOIndexOnEntityUpsertOrDelete from '../../../toolbox/hooks/library/generate_dto_index_on_entity_upsert';

// Library Project
const Library: {
  ProjectRoot : string;
  Boot(): Promise<void>;

  BootCompiler(): Promise<void>;
  RestartCompiler(): Promise<void>;
  Compiler?: ChildProcess;

  BootWatcher(): void;
  Watcher?: ProjectWatcher;

  [name: string]: any
} = {

  ProjectRoot: path.join(WorkspaceRoot, 'projects', 'library'),

  async Boot() {
    await Library.BootCompiler();
    Library.BootWatcher();
  },

  BootWatcher: () => {
    const watcher = new ProjectWatcher(Library.ProjectRoot, 'Library');

    watcher.add(
      GenerateDTOOnEntityUpsert,
      GenerateLibraryEntitiesIndex,
      GenerateDTOIndexOnEntityUpsertOrDelete,
    );

    watcher.start();

    Library.Watcher = watcher;
  },

  async BootCompiler() {
    const serverCompiler = exec('tsc -w', { cwd: Library.ProjectRoot });
    Library.Compiler = serverCompiler;

    serverCompiler.stderr?.on("data", (a) => {
      process.stderr.write(a);
    });

    return new Promise((resolve) => {
      let compilerOutput = "";
      let listener = (data: any) => {
        compilerOutput += String(data);
        if (compilerOutput.match(/Found [0-9]*? errors\./)) {
          serverCompiler.stdout?.off("data", listener);
          console.log(`📚 ${chalk.bold('[Project: Library]')} Typescript compiler finished loading!`);
          resolve();
        }
      };

      serverCompiler.stdout?.on("data", listener);
    });
  },

  async RestartCompiler() {
    if (Library.Compiler == null) {
      Library.BootCompiler();
    } else {
      try {
        Library.Compiler!.kill(0);
        Library.BootCompiler();
      } catch (err) {
        console.error("🚨 [Project: Library] ERROR!\nFailed to restart library compiler thread!", err);
      }
    }
  },

};

export { Library };
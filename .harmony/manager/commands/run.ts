import { HarmonyScript } from '../../scripts/HarmonyScript';
import type { HarmonyCommand } from './HarmonyCommand';

export const RunScriptCommand: HarmonyCommand = {
  name: 'Run Script',
  command: [
    /^run\s@(?<project_target>[A-z\-_]+)\s(?<script_name>[A-z\-_]+)\s?(?<args>.*)?$/,
    /^run\s(?<script_name>[A-z\-_]+)\s?(?<args>.*)?$/
  ],
  run({ harmony, commandArgs }) {
    for (let projectName in harmony.projectManagers) {
      if (
        commandArgs.project_target != null
        && commandArgs.project_target != projectName
      ) {
        continue;
      }

      let manager = harmony.projectManagers[projectName];
      let script = manager.scripts[commandArgs.script_name];
      if (typeof script?.run === "function") {
        let runScript: HarmonyScript['run'] = script.run;
        runScript({
          harmony,
          manager,
          args: commandArgs.args ?? {},
          root: manager.root
        });
      }

    }
  }
}
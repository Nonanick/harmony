import type { HarmonyManager } from '../HarmonyManager';
import type { ProjectManager } from '../project/ProjectManager';

export interface HarmonyCommand {
  name: string;
  command: string | RegExp | (string | RegExp)[];
  run: (args : {
    harmony : HarmonyManager,
    root : string,
    manager : ProjectManager,
    workers : ProjectManager['subprocesses'],
    commandArgs : any
  }) => void;
}
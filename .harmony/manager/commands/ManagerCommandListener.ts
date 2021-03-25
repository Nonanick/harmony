import { HarmonyManager } from '../HarmonyManager';
import { ProjectManager } from '../project/ProjectManager';

export interface ManagerCommandListener {
  name: string;
  command: string | RegExp | (string | RegExp)[];
  run: (args : {
    harmony : HarmonyManager,
    root : string,
    manager : ProjectManager,
    workers : ProjectManager['workers']
  }) => void;
}
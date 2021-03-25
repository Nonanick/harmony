import { HarmonyManager } from '../manager/HarmonyManager';
import { ProjectManager } from '../manager/project/ProjectManager';
import { HarmonyScriptArg } from './HarmonyScriptArg';

export interface HarmonyScript {
  title? : string;
  name : string;
  requiredArgs? : HarmonyScriptArg[];
  optionalArgs? : HarmonyScriptArg[];
  run : (args : { 
    harmony : HarmonyManager,
    root : string,
    manager : ProjectManager,
    args : any
  }) => void;
}
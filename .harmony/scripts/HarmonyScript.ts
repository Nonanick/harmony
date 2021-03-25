import { HarmonyScriptArg } from './HarmonyScriptArg';

export interface HarmonyScript {
  title? : string;
  name : string;
  requiredArgs : HarmonyScriptArg[];
  optionalArgs : HarmonyScriptArg[];
  runOnShell? : boolean;
  ioOptions? : {

  };
}
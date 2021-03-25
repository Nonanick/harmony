export interface HarmonyScriptArg {
  title? : string;
  argumentType : 'string' | 'number' | 'boolean' | 'list';
  name : string;
  short? : string;
  defaultValue? : string | number | boolean;
}
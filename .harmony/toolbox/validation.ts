import type { HarmonyScript, WatcherHook, HarmonyCommand } from '@harmony';

export function isHarmonyScript(obj: any): obj is HarmonyScript {
  return (
    typeof obj === "object"
    && typeof obj.name === "string"
    && typeof obj.run === "function"
    && (typeof obj.title === "string" || obj.title === undefined)
    && (typeof obj.requiredArgs === "object" || obj.requiredArgs === undefined)
    && (typeof obj.optionalArgs === "object" || obj.optionalArgs === undefined)
  );
}

export function isHarmonyHook(obj: any): obj is WatcherHook {
  return (
    typeof obj === "object"
    && typeof obj.name === "string"
    && typeof obj.hook === "function"
    && (typeof obj.event === "string" || typeof obj.event === "object")
    && typeof obj.pattern === "object"
    && (typeof obj.project === "string" || obj.project === undefined)
    && (typeof obj.mustMatchAllPatterns === "boolean" || obj.mustMatchAllPatterns === undefined)
    && (typeof obj.debounce === "number" || obj.optionalArgs === undefined)
  );
}

export function isHarmonyCommand(obj : any) : obj is HarmonyCommand {
  return (
    typeof obj.name === "string"
    && (typeof obj.command === "string" || typeof obj.command === "object")
    && typeof obj.run === "function"
  );
}
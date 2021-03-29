import type { ContextMenuItem } from '../item/ContextMenuItem';

export interface ContextMenuGroup {
  title : string;
  icon? : string;
  icon_color? : string;
  enabled? : boolean;
  items : ContextMenuItem[];
}

export function CreateContextMenuGroup(options : ContextMenuGroup) {
  const group = document.createElement('div');

  return group;
}

export function isContextMenuGroup(obj : any) : obj is ContextMenuGroup {
  return (
    typeof obj.title === "string"
    && Array.isArray(obj.items)
    && (typeof obj.icon === "string" || obj.icon == null)
    && (typeof obj.icon_color === "string" || obj.icon_color == null)
    && (typeof obj.enabled === "boolean" || obj.enabled == null)
  );
}
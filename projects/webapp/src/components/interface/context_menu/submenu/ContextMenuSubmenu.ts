import type { ContextMenuGroup } from '../group/ContextMenuGroup';
import type { ContextMenuItem } from '../item/ContextMenuItem';

export interface ContextMenuSubmenu {
  title : string;
  icon? : string;
  icon_color? : string;
  items : (ContextMenuSubmenu | ContextMenuGroup | ContextMenuItem)[];
}

export function CreateContextMenuSubmenu(options : ContextMenuSubmenu) {
  const sub = document.createElement('div');
  return sub;
}

export function isContextMenuSubmenu(obj : any) : obj is ContextMenuSubmenu {
  return (
    typeof obj.title === "string"
    && Array.isArray(obj.items)
    && (typeof obj.icon === "string" || obj.icon == null)
    && (typeof obj.icon_color === "string" || obj.icon_color == null)
  );
}
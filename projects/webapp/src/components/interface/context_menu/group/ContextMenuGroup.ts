import type { IContextMenuItem } from '../item/IContextMenuItem';
import type { IContextMenuSubmenu } from '../submenu/ContextMenuSubmenu';

export interface IContextMenuGroup {
  title : string;
  icon? : string;
  icon_color? : string;
  enabled? : boolean;
  items : (IContextMenuSubmenu | IContextMenuItem)[];
}


export function isContextMenuGroup(obj : any) : obj is IContextMenuGroup {
  return (
    typeof obj.title === "string"
    && obj.spawn_submenu === undefined
    && Array.isArray(obj.items)
    && (typeof obj.icon === "string" || obj.icon == null)
    && (typeof obj.icon_style === "object" || obj.icon_style == null)
    && (typeof obj.enabled === "boolean" || obj.enabled == null)
  );
}
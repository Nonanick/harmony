import type { ContextMenuGroup } from '../group/ContextMenuGroup';
import type { ContextMenuItem } from '../item/ContextMenuItem';

export interface ContextMenuSubmenu {
  title : string;
  icon? : string;
  icon_color? : string;
  items : (ContextMenuSubmenu | ContextMenuGroup | ContextMenuItem)[];
}

export function CreateContextMenuSubmenu(options : ContextMenuSubmenu) {
  
}
import type { ContextMenuGroup } from './ContextMenuGroup';
import type { ContextMenuItem } from './ContextMenuItem';

export interface ContextMenuSubmenu {
  title : string;
  icon? : string;
  icon_color? : string;
  items : (ContextMenuSubmenu | ContextMenuGroup | ContextMenuItem)[];
}
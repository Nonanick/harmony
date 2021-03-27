import type { ContextMenuStyle } from './ContextMenuStyle';
import type { ContextMenuGroup } from './group/ContextMenuGroup';
import type { ContextMenuItem } from './item/ContextMenuItem';
import type { ContextMenuSubmenu } from './submenu/ContextMenuSubmenu';

export interface ContextMenuOptions {
  items: (ContextMenuGroup | ContextMenuItem | ContextMenuSubmenu)[];
  style?: Partial<ContextMenuStyle>;
  closeOnOuterClick?: boolean;
}
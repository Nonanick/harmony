import type { ContextMenuGroup } from './ContextMenuGroup';
import type { ContextMenuItem } from './ContextMenuItem';
import type { ContextMenuStyle } from './ContextMenuStyle';
import type { ContextMenuSubmenu } from './ContextMenuSubmenu';

export interface ContextMenuOptions {
  items : (ContextMenuGroup | ContextMenuItem | ContextMenuSubmenu)[];
  style?: Partial<ContextMenuStyle>;
  closeOnOuterClick? : boolean;
}
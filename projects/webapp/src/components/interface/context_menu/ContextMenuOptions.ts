import type { ContextMenuStyle } from './ContextMenuStyle';
import type { IContextMenuGroup } from './group/ContextMenuGroup';
import type { IContextMenuItem } from './item/IContextMenuItem';
import type { IContextMenuSubmenu } from './submenu/ContextMenuSubmenu';

export interface ContextMenuOptions {
  items: (IContextMenuGroup | IContextMenuItem | IContextMenuSubmenu)[];
  style?: Partial<ContextMenuStyle>;
  closeOnOuterClick?: boolean;
  position? : {
    x : number;
    y : number;
  }
}
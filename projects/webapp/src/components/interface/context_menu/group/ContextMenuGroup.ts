import type { ContextMenuItem } from '../item/ContextMenuItem';

export interface ContextMenuGroup {
  title : string;
  icon? : string;
  icon_color? : string;
  enabled? : boolean;
  items : ContextMenuItem[];
}

export function CreateContextMenuGroup(options : ContextMenuGroup) {

}
import type { SVGIconStyle } from '../../svg_icon/SVGIconStyle';
import type { IContextMenuGroup } from '../group/ContextMenuGroup';
import type { IContextMenuItem } from '../item/IContextMenuItem';

export interface IContextMenuSubmenu {
  enabled? : boolean;
  title : string;
  icon? : string;
  icon_style? : Partial<SVGIconStyle>;
  items : (IContextMenuSubmenu | IContextMenuGroup | IContextMenuItem)[];
  spawn_submenu : true;
}

export function isContextMenuSubmenu(obj : any) : obj is IContextMenuSubmenu {
  return (
    typeof obj.title === "string"
    && obj.spawn_submenu === true
    && Array.isArray(obj.items)
    && (typeof obj.icon === "string" || obj.icon == null)
    && (typeof obj.icon_style === "string" || obj.icon_style == null)
    && (typeof obj.enabled === "boolean" || obj.enabled == null)
    );
}
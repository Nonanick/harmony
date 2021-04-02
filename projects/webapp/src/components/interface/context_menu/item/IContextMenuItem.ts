import type { SVGIconStyle } from "../../svg_icon/SVGIconStyle";

export interface IContextMenuItem {
  title: string;
  icon?: string;
  icon_style?: Partial<SVGIconStyle>;
  enabled?: boolean;
  onClick: () => void;
}

export function isContextMenuItem(obj: any): obj is IContextMenuItem {
  return (
    typeof obj.title === "string"
    && typeof obj.onClick === "function"
    && (typeof obj.icon === "string" || obj.icon == null)
    && (typeof obj.icon_color === "string" || obj.icon_color == null)
    && (typeof obj.enabled === "boolean" || obj.enabled == null)
  );
}
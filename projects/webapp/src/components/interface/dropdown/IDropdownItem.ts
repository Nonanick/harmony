import type { SVGIconStyle } from "../svg_icon/SVGIconStyle";

export interface IDropdownItem {
  title : string;
  icon? : string;
  icon_style? : Partial<SVGIconStyle>;
  value? : any;
  selected? : boolean;
}
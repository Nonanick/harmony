import type { Route } from '../../router/Route';
import type { SVGIconProps } from '../interface/svg_icon/SVGIconProps';
import type { SVGIconStyle } from '../interface/svg_icon/SVGIconStyle';

export interface AppRoute extends Route {
  // Route display properties
  title?: string;
  icon?: string | SVGIconProps & SVGIconStyle;
  menuGroup?: string;
  showInMainMenu?: boolean;
  accentColor? : string;
  
}
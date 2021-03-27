import type { GuardRoute } from './GuardRoute';
import type { RouteActivation } from './RouteActivation';
import type { RouteDeactivation } from './RouteDeactivation';

export interface Route {
  url_pattern: string;
  guard?: GuardRoute | GuardRoute[];
  onActivation: RouteActivation | RouteActivation[];
  onDeactivation?: RouteDeactivation;
}

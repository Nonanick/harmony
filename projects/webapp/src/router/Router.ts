import { match } from "path-to-regexp";
import type { Route } from "./Route";
import { HashRouter } from "./strategies/HashRouter";
import type { RouterStrategy } from "./strategies/RouterStrategy";

const DefaultRoutingStrategy: RouterStrategy = new HashRouter();

class Router {
  protected _currentRoute?: Route;

  protected routes: Route[] = [];

  protected _started: boolean = false;

  private strategy: RouterStrategy = DefaultRoutingStrategy;

  private routeChangedHandler = async (newURL: string) => {
    let activateRoute: Route = null;
    let urlParams: {
      [name: string]: any;
    } = {};

    let pureURL = this.stripQueryString(newURL);

    for (let tryRoute of this.routes) {
      const urlMatches = match(tryRoute.pattern);
      let matches = urlMatches(pureURL);
      if (matches) {
        urlParams = matches.params;
        activateRoute = tryRoute;
        break;
      }
    }

    if (activateRoute === null) {
      this.routeNotFound(newURL);
      return;
    }

    let queryParams = this.extractQueryString(newURL) ?? {};

    if (activateRoute.guard != null) {
      let authorized: boolean = false;

      if (Array.isArray(activateRoute.guard)) {
        for (let guardFn of activateRoute.guard) {
          let isAuthorized = await guardFn(pureURL, urlParams, queryParams);
          if (!isAuthorized) {
            authorized = false;
            break;
          }
        }
      } else {
        authorized = await activateRoute.guard(pureURL, urlParams, queryParams);
      }

      if (!authorized) {
        this.routeGuarded(activateRoute);
        return;
      }
    }

    if (
      this._currentRoute != null &&
      this._currentRoute.onDeactivation != null
    ) {
      let canProceed = await this._currentRoute.onDeactivation();
      if (!canProceed) {
        return;
      }
    }
    if (Array.isArray(activateRoute.onActivation)) {
      for (let activationStep of activateRoute.onActivation) {
        await activationStep(pureURL, { ...urlParams }, { ...queryParams });
      }
    } else {
      await activateRoute.onActivation(pureURL, urlParams, queryParams);
    }
  };

  extractQueryString(url: string) {
    let indexOfQuestionMark = url.indexOf("?");
    if (indexOfQuestionMark < 0) {
      return;
    }

    let params = url.substr(indexOfQuestionMark + 1);
    let helper = new URLSearchParams(params);
    let returnObject: any = {};
    helper.forEach((value, key) => {
      returnObject[key] = value;
    });
    console.log(returnObject);
    return returnObject;
  }

  stripQueryString(url: string) {
    let indexOfQuestionMark = url.indexOf("?");
    if (indexOfQuestionMark < 0) {
      return url;
    }

    return url.substr(0, indexOfQuestionMark);
  }

  setStrategy(strategy: RouterStrategy) {
    if (this._started === true) {
      this.strategy.offURLChange(this.routeChangedHandler);
    }

    this.strategy = strategy;
  }

  addRoute(...route: Route[]) {
    this.routes.push(...route);
  }

  removeRoute(...route: Route[]) {
    this.routes = this.routes.filter((r) => !route.includes(r));
  }

  start() {
    this._started = true;
    this.strategy.onURLChange(this.routeChangedHandler);
    this.strategy.callChangeListeners(this.strategy.currentURL());
  }

  routeNotFound(url?: string) {

  }

  routeGuarded(route?: Route) {
  }

  onRouteNotFound() {
    this.strategy.changeURL("/");
  }

  onRouteGuarded() {
  }

  currentURL() {
    return this.strategy.currentURL();
  }

  navigateTo(url: string, callListeners = true) {
    return this.strategy.changeURL(url, callListeners);
  }
}

export const AppRouter = new Router();

export type RouteActivation = (
  url: string,
  urlParams: any,
  queryParams: any,
) => Promise<void>;
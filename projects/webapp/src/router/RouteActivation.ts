export type RouteActivation = (context: {
  url: string,
  urlParams: any,
  queryParams: any,
}) => Promise<void>;
export type GuardRoute = (
  url: string,
  urlParams: any,
  queryParams: any,
) => Promise<boolean>;
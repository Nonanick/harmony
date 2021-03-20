export interface InterfaceTheme {
  name : string;
  title : string;
  variables : {
    'main-color' : string,
    'secondary-color' : string,
    'text-on-main-color' : string,
    'text-on-secondary-color' : string,
    'background-color' : string,
    'text-on-background-color' : string,
    [name : string] : any;
  };
}
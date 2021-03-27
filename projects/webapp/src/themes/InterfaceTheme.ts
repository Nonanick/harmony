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

    'default-box-shadow' : string;
    'box-shadow-1' : string;
    'box-shadow-2' : string;
    'box-shadow-3' : string;
    'box-shadow-4' : string;

    [name : string] : any;
  };
}
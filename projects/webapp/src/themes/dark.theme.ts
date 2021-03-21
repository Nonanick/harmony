import type { InterfaceTheme } from './InterfaceTheme';

export const DarkTheme: InterfaceTheme = {
  name: 'dark',
  title: 'Dark Theme',
  variables: {
   "secondary-color" : "#E82C47",
   "secondary-color-75" : "#DA2F49",
   "secondary-color-50" : "#E36376",
   "secondary-color-25" : "#f7c7ce",
   "text-on-secondary-color" : "#f8f8f8",
   
   "main-color" : "#006597",
   "main-color-75" : "#006DA3",
   "main-color-50" : "#126B97",
   "main-color-25" : "#CEDFE8",
   "text-on-main-color" : "#f8f8f8",

   // Background color
   "background-color" : '#282828',
   "transparent-background-90": 'rgba(0,0,0,0.35)',
   "transparent-background-80": 'rgba(0,0,0,0.3)',
   "transparent-background-70": 'rgba(0,0,0,0.25)',
   "transparent-background-60": 'rgba(0,0,0,0.2)',
   "transparent-background-50": 'rgba(0,0,0,0.15)',
   "transparent-background-40": 'rgba(0,0,0,0.1)',
   "transparent-background-30": 'rgba(0,0,0,0.05)',
   "text-on-background-color" : "#e6e6e6",

   "border-radius" : "4px",
   // Box shadow
   "default-box-shadow" : '0px 4px 6px -4px rgba(0,0,0,0.6)',
   "box-shadow-1" : '0px 4px 6px -4px rgba(0,0,0,0.8)',
   "box-shadow-2" : '0px 7px 6px -5px rgba(0,0,0,0.6)',
   "box-shadow-3" : '1px 1px 8px 0px rgba(0,0,0,0.2)',
   "box-shadow-4" : '',
  }
};
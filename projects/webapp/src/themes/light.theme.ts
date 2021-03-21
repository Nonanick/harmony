import type { InterfaceTheme } from './InterfaceTheme';

export const LightInterfaceTheme: InterfaceTheme = {
  name: 'light',
  title: 'Light Theme',
  variables: {

    // Main color
    "secondary-color": "#A71D31",
    "secondary-color-75": "#DA2F49",
    "secondary-color-50": "#E36376",
    "secondary-color-25": "#f7c7ce",
    "text-on-secondary-color": "#f8f8f8",

    // Secondary color
    "main-color": "#003D5B",
    "main-color-75": "#006DA3",
    "main-color-50": "#126B97",
    "main-color-25": "#CEDFE8",
    "text-on-main-color": "#f8f8f8",

    // Background color
    "background-color": '#e0e0e0',
    "transparent-background-90": 'rgba(255,255,255,0.9)',
    "transparent-background-80": 'rgba(255,255,255,0.8)',
    "transparent-background-70": 'rgba(255,255,255,0.7)',
    "transparent-background-60": 'rgba(255,255,255,0.6)',
    "transparent-background-50": 'rgba(255,255,255,0.5)',
    "transparent-background-40": 'rgba(255,255,255,0.4)',
    "transparent-background-30": 'rgba(255,255,255,0.3)',
    "text-on-background-color": "#202020",

    "border-radius" : "4px",
    
    // Box shadow
    "default-box-shadow": '0px 4px 6px -4px rgba(0,0,0,0.6)',
    "box-shadow-1": '0px 4px 6px -4px rgba(0,0,0,0.8)',
    "box-shadow-2": '0px 7px 6px -5px rgba(0,0,0,0.6)',
    "box-shadow-3": '1px 1px 8px 0px rgba(0,0,0,0.2)',
    "box-shadow-4": '',
  }
}
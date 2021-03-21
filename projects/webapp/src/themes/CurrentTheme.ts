import type { InterfaceTheme } from './InterfaceTheme';
import { writable } from 'svelte/store';
import { DefaultTheme } from './theme.default';

export const CurrentTheme = writable<InterfaceTheme>(DefaultTheme);
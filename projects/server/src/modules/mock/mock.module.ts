import { Module } from '../module.interface';

export const MockModule : Module = {
  get name() {
    return 'mock';
  },
  get enabled() {
    return true;
  },
  get api() {
    return [];
  },
  
}
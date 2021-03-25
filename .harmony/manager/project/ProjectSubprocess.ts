import type { Worker } from 'worker_threads';
import type { ChildProcess } from 'child_process';
import { SpawnProcessOptions } from './SpawnProcessOptions';
import { SpawnWorkerOptions } from './SpawnWorkerOptions';

export type ProjectSubprocess = WorkerSubprocess | ChildSubprocess;

export type WorkerSubprocess = {
  type : 'worker';
  process : Worker;
  spawn : SpawnWorkerOptions
}

export type ChildSubprocess = {
  type : 'process';
  process : ChildProcess;
  spawn : SpawnProcessOptions;
}
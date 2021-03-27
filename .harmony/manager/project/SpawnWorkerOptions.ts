import type { Readable, Writable } from 'stream';

export interface SpawnWorkerOptions {
  title?: string;
  name: string;
  path: string;
  args?: any;
  io? : {
    out? : 'pipe' | Readable;
    err? : 'pipe' | Readable;
    in? : 'pipe' | Writable;
  };
}
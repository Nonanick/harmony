import type { ReadStream, WriteStream } from 'tty';
export interface SpawnProcessOptions {
  name: string;
  title?: string;
  launch: string;
  cwd?: string;
  out?: {
    filter? :(data: any) => false | string;
    pipeTo?: WriteStream
  };
  err?: {
    filter? : (data: any) => false | string;
    pipeTo?: WriteStream
  };
  in?: {
    filter? : (data: any) => false | string;
    pipeTo?: ReadStream
  };
}
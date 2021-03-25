import { EventEmitter } from 'events';
import { Readable } from 'stream';

export class ReadableStreamListener extends EventEmitter {

  static CommandSentEvent = Symbol('New command inputted');

  private inputBuffer: string = "";

  private sendCommandTrigger = '\n';

  private inputListener = (inputDataChunk: any) => {
    let inputText = String(inputDataChunk);

    let ioSeparator = inputText.indexOf(this.sendCommandTrigger);

    if (ioSeparator >= 0) {
      let beforeLineBreakData = inputText.substr(0, ioSeparator);
      this.inputBuffer += beforeLineBreakData;
      let command = this.inputBuffer.trim();
      this.inputBuffer = "";
      this.emit(
        command
      );
      this.emit(ReadableStreamListener.CommandSentEvent, command);
    } else {
      this.inputBuffer += inputText;
    }

  };

  setTrigger(trigger : string) {
    this.sendCommandTrigger = trigger;
  }

  constructor(input: Readable) {
    super();

    input.on("data", this.inputListener);
  }

}
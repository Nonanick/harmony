import { EventEmitter } from 'events';
import { Readable } from 'stream';

export class CLIInputListener extends EventEmitter {

  private inputBuffer: string = "";

  private commandSeparator = '\n';

  private inputListener = (inputDataChunk : any) => {
    let inputText = String(inputDataChunk);

    let ioSeparator = inputText.indexOf(this.commandSeparator);

    if(ioSeparator >= 0) {
      let beforeLineBreakData = inputText.substr(0, ioSeparator);
      this.inputBuffer += beforeLineBreakData;
      console.log("Command separator pressed! Command buffered -> ", this.inputBuffer);
      let command = this.inputBuffer.trim();
      this.inputBuffer = "";
      this.emit(
       command
      );
    } else {
      this.inputBuffer += inputText;
    }

  };

  constructor(input : Readable) {
    super();

    input.on("data", this.inputListener);
  }

}
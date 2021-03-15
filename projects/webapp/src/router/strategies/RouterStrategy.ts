export interface RouterStrategy {

  onURLChange(fn : ((newUrl : string) => void), once? : boolean) : void;

  offURLChange(fn : (newUrl : string) => void) : void;

  currentURL() : string;

  changeURL(url : string, triggerURLChange? : boolean) : void;

  callChangeListeners(withURL? : string) : void;

  pause() : void;

  resume() : void;

  setPausedState(paused : boolean) : void;
}
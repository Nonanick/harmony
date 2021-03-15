import path from 'path';
import chokidar, { FSWatcher } from 'chokidar';
import { ProjectEvent, ProjectHook } from './hooks/project.hook';

export class ProjectWatcher {

  protected _delay: number = 2000;

  private fsWatcher?: FSWatcher;

  private _hooks: {
    [eventName in ProjectEvent]?: (ProjectHook & { timeout?: any })[]
  } = {};

  private isInitial: boolean = true;
  private watchFSListener = (evName: ProjectEvent, pathString: string) => {

    pathString = path.join(this.projectRoot, pathString);

    this._hooks['all']?.forEach(hook => {
      if (this.pathMatchesHookPattern(pathString, hook)) {
        this.fireHook(hook, evName, pathString);
      }
    });

    if (evName != "all") {
      this._hooks[evName]?.forEach(hook => {
        if (this.pathMatchesHookPattern(pathString, hook)) {
          this.fireHook(hook, evName, pathString);
        }
      });
    }

  };

  constructor(private projectRoot: string, private projectName? : string) { }

  get watcher() {
    if (this.fsWatcher == null) {
      throw new Error("Before utilizing the watcher you need to initialize it!");
    }
    return this.fsWatcher;
  }

  fireHook(hook: ProjectHook & { timeout?: any }, event: ProjectEvent, pathString: string) {
    if (hook.timeout == null) {
      hook.timeout = setTimeout(() => {
        console.log('⭐ \x1b[1m[Watcher' + (this.projectName != null ? ': ' + this.projectName : '') + ']\x1b[0m Firing "\x1b[2m' + hook.name + '\x1b[0m"!');
        hook.hook(event, pathString, this.isInitial, this);
        delete hook.timeout;
      }, hook.debounce ?? this._delay);
    }
  }
  pathMatchesHookPattern(pathString: string, hook: ProjectHook): boolean {

    if (hook.mustMatchAllPatterns === true) {
      if (Array.isArray(hook.pattern)) {

        for (let p of hook.pattern) {
          if (!pathString.match(p)) {
            return false;
          }
        }

        return true;
      }
    }

    if (Array.isArray(hook.pattern)) {
      for (let pat of hook.pattern) {
        if (pathString.match(pat)) {
          return true;
        }
      }

      return false;
    } else {
      return pathString.match(hook.pattern) ? true : false;
    }

  }

  setDelay(timeInMili: number) {
    this._delay = timeInMili > 0 ? timeInMili : 0;
  }

  add(...hooks: ProjectHook[]) {
    for (let hook of hooks) {
      if (Array.isArray(hook.event)) {
        for (let ev of hook.event) {

          if (this._hooks[ev] == null) this._hooks[ev] = [];
          this._hooks[ev]!.push(hook);
        }
      } else {
        if (this._hooks[hook.event] == null) this._hooks[hook.event] = [];
        this._hooks[hook.event]!.push(hook);
      }
    }
  }

  start() {
    this.fsWatcher = chokidar.watch(
      '**/*',
      {
        cwd: this.projectRoot,
        ignored: ['**/node_modules/**/*'],
      });

    this.fsWatcher.on("ready", () => {
      this.isInitial = false;
    });

    this.fsWatcher.on("all", this.watchFSListener);


  }
}
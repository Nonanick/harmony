"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectWatcher = void 0;
const path_1 = __importDefault(require("path"));
const chokidar_1 = __importDefault(require("chokidar"));
class ProjectWatcher {
    constructor(projectRoot) {
        this.projectRoot = projectRoot;
        this._delay = 2000;
        this._hooks = {};
        this.isInitial = true;
        this.watchFSListener = (evName, pathString) => {
            var _a, _b;
            pathString = path_1.default.join(this.projectRoot, pathString);
            (_a = this._hooks['all']) === null || _a === void 0 ? void 0 : _a.forEach(hook => {
                if (this.pathMatchesHookPattern(pathString, hook)) {
                    this.fireHook(hook, evName, pathString);
                }
            });
            if (evName != "all") {
                (_b = this._hooks[evName]) === null || _b === void 0 ? void 0 : _b.forEach(hook => {
                    if (this.pathMatchesHookPattern(pathString, hook)) {
                        this.fireHook(hook, evName, pathString);
                    }
                });
            }
        };
    }
    get watcher() {
        if (this.fsWatcher == null) {
            throw new Error("Before utilizing the watcher you need to initialize it!");
        }
        return this.fsWatcher;
    }
    fireHook(hook, event, pathString) {
        var _a;
        if (hook.timeout == null) {
            hook.timeout = setTimeout(() => {
                console.log('⭐ \x1b[1m[Watcher]\x1b[0m Firing "\x1b[2m' + hook.name + '\x1b[0m"!');
                hook.hook(event, pathString, this.isInitial, this);
                delete hook.timeout;
            }, (_a = hook.debounce) !== null && _a !== void 0 ? _a : this._delay);
        }
    }
    pathMatchesHookPattern(pathString, hook) {
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
        }
        else {
            return pathString.match(hook.pattern) ? true : false;
        }
    }
    setDelay(timeInMili) {
        this._delay = timeInMili > 0 ? timeInMili : 0;
    }
    add(...hooks) {
        for (let hook of hooks) {
            if (Array.isArray(hook.event)) {
                for (let ev of hook.event) {
                    if (this._hooks[ev] == null)
                        this._hooks[ev] = [];
                    this._hooks[ev].push(hook);
                }
            }
            else {
                if (this._hooks[hook.event] == null)
                    this._hooks[hook.event] = [];
                this._hooks[hook.event].push(hook);
            }
        }
    }
    start() {
        this.fsWatcher = chokidar_1.default.watch('**/*', {
            cwd: this.projectRoot,
            ignored: ['**/node_modules/**/*'],
        });
        this.fsWatcher.on("ready", () => {
            this.isInitial = false;
        });
        this.fsWatcher.on("all", this.watchFSListener);
    }
}
exports.ProjectWatcher = ProjectWatcher;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandServerRestart = exports.DemandServerCompilerRestart = void 0;
const chalk_1 = __importDefault(require("chalk"));
const cli_input_listener_1 = require("../../toolbox/cli.input.listener");
const run_library_1 = require("./projects/run.library");
const run_server_1 = require("./projects/run.server");
const run_webapp_1 = require("./projects/run.webapp");
const inputListener = new cli_input_listener_1.CLIInputListener(process.stdin);
// Server Project
run_server_1.Server.Boot();
// Library Project
run_library_1.Library.Boot();
// WebApp Project
run_webapp_1.WebApp.Boot();
inputListener.on("rs:lib", (_) => __awaiter(void 0, void 0, void 0, function* () {
    yield run_library_1.Library.RestartCompiler();
}));
inputListener.on("rs:web", (_) => __awaiter(void 0, void 0, void 0, function* () {
    yield run_webapp_1.WebApp.RestartCompiler();
}));
inputListener.on("rs:ui", (_) => __awaiter(void 0, void 0, void 0, function* () {
    yield run_webapp_1.WebApp.RestartCompiler();
}));
inputListener.on("rs:server", _ => {
    DemandServerRestart();
});
inputListener.on("rs:server-build", _ => {
    DemandServerCompilerRestart();
});
inputListener.on("exit", _ => {
    process.exit(0);
});
function DemandServerCompilerRestart() {
    console.log(`❕ ${chalk_1.default.bold('[Harmony]')} Demanding manual server compiler restart!`);
    run_server_1.Server.RestartCompiler().then(_ => {
        process.stdout.clearLine(0);
    });
}
exports.DemandServerCompilerRestart = DemandServerCompilerRestart;
function DemandServerRestart() {
    console.log(`❕ ${chalk_1.default.bold('[Harmony]')} Demanding manual server restart!`);
    run_server_1.Server.RestartWorker();
}
exports.DemandServerRestart = DemandServerRestart;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const ProjectWorkspaceRoot = path_1.default.resolve(__dirname, '..', '..', '..');
const LibraryProjectRoot = path_1.default.join(ProjectWorkspaceRoot, 'repositories', 'library');
const directives = [
    // Library
    {
        name: "add clerk to 'library' project",
        command: "pnpm link clerk",
        working_directory: LibraryProjectRoot,
    }
    // Server
    // Webapp
    // Desktop
];
function runInstallDirectives(directives) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        for (let directive of directives) {
            if (directive.shouldBeAwaited) {
            }
        }
    });
}

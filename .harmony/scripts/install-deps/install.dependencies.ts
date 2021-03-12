import path from 'path';

interface InstallDirective {
  name: string;
  command: string;
  shouldBeAwaited?: boolean;
  working_directory: string;
}

const ProjectWorkspaceRoot = path.resolve(__dirname, '..', '..', '..');

const LibraryProjectRoot = path.join(ProjectWorkspaceRoot, 'repositories', 'library');

const directives: InstallDirective[] = [
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

async function runInstallDirectives(directives: InstallDirective[]) {

  for (let directive of directives) {
    if (directive.shouldBeAwaited) {

    }
  }
}

import path from 'path';
import { WorkspaceRoot } from '../../../workspace.root';

import(
  path.join(WorkspaceRoot, 'projects', 'desktop')
).then(desktop => {

}).catch(err => {

});

process.on("unhandledRejection", (rejectionReason) => {
  console.error("[Project: Desktop] UNHANDLED REJECTION !\n" + JSON.stringify(rejectionReason, null, 2));
});
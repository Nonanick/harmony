import path from 'path';
import ProjectRoot from '../../../project.root';

import(
  path.join(ProjectRoot,'projects','desktop')
).then(desktop => {

}).catch(err => {

});

process.on("unhandledRejection", (rejectionReason) => {
  console.error("[Project: Desktop] UNHANDLED REJECTION !\n" + JSON.stringify(rejectionReason, null, 2));
});
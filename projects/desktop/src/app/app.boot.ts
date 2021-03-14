import { app } from 'electron';

app.on("ready", () => {
  import('../window/main.window')
  .then(module => {
    const mainWindow = module.default;
    mainWindow.on("ready-to-show", () => mainWindow.show());
    mainWindow.show();
  });
});
import { app } from 'electron';

app.on('ready', () => {
  import('./windows/monitor/monitor.window')
    .then(module => {
      //let window = module.Monitor.window;
      module.Monitor.start();
    })
    .catch(err => {

    });
});

app.on('window-all-closed', () => {
  app.quit();
})
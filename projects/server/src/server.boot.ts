import Server from './server';
import Adapter from './server.adapter';
import dotenv from 'dotenv';
import { HelloWorldController } from './controllers/hello_world/HelloWorld.controller';
import { ReflectionController } from './controllers/reflection/Reflection.controller';

dotenv.config();

Adapter.onPort(
  Number(process.env.SERVER_PORT ?? 3301)
);

Server.addAdapter(
  Adapter
);

Server.addController(
  new HelloWorldController
);

if(process.env.ENV === 'development') {
  Server.addController(
    new ReflectionController(Server)
  )
}
Server.start();

export default Server;
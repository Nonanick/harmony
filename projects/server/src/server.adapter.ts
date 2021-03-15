import { Adapter } from 'maestro-fastify';

const FastifyAdapter = new Adapter({
  caseSensitive : true,
  logger : true,
});


export default FastifyAdapter;
'use strict';

import fastifyPlugin from 'fastify-plugin';
import fastifyPostgres from '@fastify/postgres';
import { FastifyPluginAsync } from 'fastify';

const connectToDb: FastifyPluginAsync = async function (fastify) {
    await fastify.register(fastifyPostgres, {
        database: fastify.config.DB_NAME,
        host: fastify.config.DB_HOST,
        user: fastify.config.DB_USER,
        password: fastify.config.DB_PASSWORD,
        port: fastify.config.DB_PORT,
        keepAlive: true
    });

    //await fastify.pg.connect();
    //fastify.log.info(`connected to postgres on PORT ${fastify.config.DB_PORT}`);
};

export default fastifyPlugin(connectToDb);

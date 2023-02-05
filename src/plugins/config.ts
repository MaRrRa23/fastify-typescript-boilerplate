'use strict';

import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import fastifyEnv from '@fastify/env';

const configPlugin: FastifyPluginAsync = async fastify => {
    fastify.register(fastifyEnv, {
        dotenv: true,
        confKey: 'config',
        schema: {
            type: 'object',
            required: ['PORT', 'NODE_ENV'],
            properties: {
                PORT: { type: 'string' },
                NODE_ENV: {
                    type: 'string',
                    enum: ['development', 'production', 'test']
                },
                DB_NAME: { type: 'string' },
                DB_USER: { type: 'string' },
                DB_PASSWORD: { type: 'string' },
                DB_HOST: { type: 'string' },
                DB_PORT: { type: 'number' },
                HASH_ROUNDS: { type: 'string' },
                DOCKERIZED_HOST: { type: 'string' }
            }
        }
    });
};

export default fastifyPlugin(configPlugin);

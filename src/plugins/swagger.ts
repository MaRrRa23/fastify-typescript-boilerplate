'use strict';

import fastifyPlugin from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { FastifyPluginAsync } from 'fastify';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const { version } = JSON.parse(
    await readFile(
        join(fileURLToPath(dirname(import.meta.url)) + '../../../package.json')
    ).then(res => res.toString())
);

const swaggerPlugin: FastifyPluginAsync = async fastify => {
    fastify.register(fastifySwagger, {
        swagger: {
            info: {
                title: 'Fastify-boilerplate',
                description: 'Fastify-boilerplate documentation',
                version,
                contact: {
                    name: 'API Support',
                    url: 'https://github.com/MaRrRa23/fastify-project/issues',
                    email: 'makarmilvid@gmail.com'
                }
            }, 
            externalDocs: {
                url: 'https://github.com/MaRrRa23/fastify-project',
                description: 'Find more info here'
            },
            host: 'localhost:7071',
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json', 'text/html'],
            securityDefinitions: {
                Bearer: {
                    type: 'apiKey',
                    name: 'Bearer',
                    in: 'header'
                }
            }
        }
    });

    if (fastify.config.NODE_ENV !== 'production') {
        await fastify.register(fastifySwaggerUi, {
            routePrefix: '/documentation'
        });
    }
};

export default fastifyPlugin(swaggerPlugin);

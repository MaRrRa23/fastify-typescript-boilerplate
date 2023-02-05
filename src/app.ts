import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyAutoload from '@fastify/autoload';
import fastifySensible from '@fastify/sensible';
import fastifyCors from '@fastify/cors';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const fastifyLoggerInstanceOptions = {
    dev: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
                ignore: 'pid,reqId,responseTime',
                hideObject: false,
                singleLine: true,
                /* https://github.com/jorgebucaran/colorette needs to be installed */
                custromColors: 'err:red,info:yellow',
                collorise: true
            }
        },
        serializers: {
            req(request: FastifyRequest) {
                return {
                    method: request.method,
                    url: request.url,
                    hostname: request.hostname,
                    path: request.routerPath,
                    userAgent: request.headers['user-agent']
                };
            },
            res(response: FastifyReply) {
                return {
                    statusCode: response.statusCode
                };
            }
        }
    }
};
const app = fastify({
    logger: fastifyLoggerInstanceOptions['dev']
    // Nginx would most likely be used instead of this
    // https: {
    //     cert: readFileSync('/home/mara/.ssl/cert.pem'),
    //     key: readFileSync('/home/mara/.ssl/key.pem')
    // }
});

await app.register(fastifyCors, {
    hideOptionsRoute: true,
    methods: ['GET', 'POST', 'PATCH']
});

await app.register(fastifySensible);

await app.register(fastifyAutoload, {
    dir: join(dirname(fileURLToPath(import.meta.url)), 'plugins'),
    options: {}
});

await app.register(fastifyAutoload, {
    dir: join(dirname(fileURLToPath(import.meta.url)), 'routes'),
    dirNameRoutePrefix: false,
    options: {}
});

app.listen({
    port: app.config.PORT,
    host: app.config.DOCKERIZED_HOST ?? 'localhost'
});

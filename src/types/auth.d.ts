import { FastifyReply, FastifyRequest } from 'fastify';

export interface checkAuthorization {
    (request: FastifyRequest, reply: FastifyReply): Promise<void>;
}

declare module 'fastify' {
    interface FastifyInstance {
        checkAuthorization: checkAuthorization
    }
}
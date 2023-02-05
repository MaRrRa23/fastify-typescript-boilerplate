import { FastifyReply, FastifyRequest } from 'fastify';

export enum NodeEnv {
    development = 'development',
    test = 'test',
    production = 'production'
}

declare module 'fastify' {
    interface FastifyInstance {
        config: {
            PORT: number;
            NODE_ENV: NodeEnv;
            DB_NAME: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_HOST: string;
            DB_PORT: number;
            HASH_ROUNDS: string;
            DOCKERIZED_HOST: string | null;
        };
    }
}

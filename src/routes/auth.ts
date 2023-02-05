'use strict';

import { FastifyInstance } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import { AuthSchema } from '../schemas/auth.js';
import { AuthController, AuthControllerErrorHandler } from '../controllers/auth.js';

export default async function Authorization(fastify: FastifyInstance) {
    fastify.addSchema(AuthSchema);
    fastify.route<{
        Body: FromSchema<typeof AuthSchema.body>;
        Reply: FromSchema<typeof AuthSchema.response>;
    }>({
        method: 'POST',
        url: '/auth',
        schema: AuthSchema,
        handler: AuthController.bind({ fastify }),
        errorHandler: AuthControllerErrorHandler.bind({ fastify })
    });
}

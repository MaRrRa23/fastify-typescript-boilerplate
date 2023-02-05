import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const authorize: FastifyPluginAsync = async fastify => {
    const { httpErrors } = fastify;
    fastify.decorate('checkAuthorization', checkAuthorized);

    async function checkAuthorized(request: FastifyRequest, reply: FastifyReply) {
        const userToken = request.headers.authorization;

        if (!userToken) throw httpErrors.unauthorized('Bearer token is provided');
    }

    fastify.decorateRequest('user', null);
};

export default fastifyPlugin(authorize, {
    name: 'authorize'
});

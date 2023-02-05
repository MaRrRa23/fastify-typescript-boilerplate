import { FastifyReply } from 'fastify';
import { IAuthRequest } from '../schemas/auth';

export const AuthController = async function auth(request: IAuthRequest, reply: FastifyReply) {
    const { login, password } = request.body;

    let dbResponse;
    try {
        dbResponse = await this.fastify.pg.query('SELECT * FROM users WHERE')
    } catch(e) {

    }
};

export const AuthControllerErrorHandler = async function authErrorHandler(
    request: IAuthRequest,
    reply: FastifyReply
) {
    console.log(123);
};

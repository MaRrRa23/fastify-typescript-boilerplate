import { FastifyRequest } from 'fastify';

const AuthSchema = {
    $id: 'userAuth',

    headers: {},
    body: {
        description: 'Тело с логином и паролем',
        type: 'object',
        properties: {
            login: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['login', 'password'],
        additionalProperties: false
    },
    response: {
        200: {
            description: 'Пара логин-пароль верная, токен сгенерирован',
            type: 'object',
            properties: {
                token: { type: 'string' }
            }
        },
        422: {
            description: 'Учётная запись по указанной паре логин-пароль не найдена',
            type: 'object'
        }
    }
} as const;

interface IAuthRequest extends FastifyRequest {
    body: {
        login: string;
        password: string;
    };
}

export { AuthSchema, IAuthRequest };

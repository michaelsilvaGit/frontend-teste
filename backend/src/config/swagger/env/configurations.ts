import { envSchemaConfiguration } from './env';

export const configuration = () => {
    const validatedEnv = envSchemaConfiguration.parse(process.env);

    return {
        ...validatedEnv,
    };
};

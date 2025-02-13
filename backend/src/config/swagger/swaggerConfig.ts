import { INestApplication } from '@nestjs/common';
import {
    DocumentBuilder,
    SwaggerDocumentOptions,
    SwaggerModule,
} from '@nestjs/swagger';
import { EnvService } from './env/env.service';

export const swaggerConfig = async function conf(
    app: INestApplication,
    modules: any[],
    envService: EnvService,
): Promise<void> {
    const APP_NAME = envService.get('API_NAME');
    const APP_VERSION = envService.get('API_VERSION');
    const APP_URL = envService.get('API_URL');

    const config = new DocumentBuilder()
        .setTitle(APP_NAME)
        .setDescription(`${APP_NAME} API description`)
        .setVersion(APP_VERSION)
        .setContact(
            'Soluções Logísticas',
            'comercial@sinka.net.br',
            'https://sinkalogistica.com.br/',
        )
        .addServer(APP_URL)
        .addBearerAuth()
        .addApiKey(
            { type: 'apiKey', name: 'x-api-key', in: 'headers' },
            'x-api-key',
        )
        .build();

    const options: SwaggerDocumentOptions = {
        operationIdFactory: (controllerKey: string, methodKey: string) =>
            methodKey,
        include: modules,
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('/swagger', app, document);
};

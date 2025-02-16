import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { swaggerConfig } from '@config/swagger/swaggerConfig';
import { EnvService } from '@config/swagger/env/env.service';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );
    //app.setGlobalPrefix('sinka-test');
    app.enableVersioning({
        type: VersioningType.HEADER,
        header: 'X-Version',
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    app.enableCors({
        origin: '*',
        allowedHeaders: '*',
        methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'UPDATE', 'OPTIONS'],
        credentials: true,
    });

    const envService = app.get(EnvService);
    await swaggerConfig(app, [], envService);

    const port = process.env.PORT;

    await app
        .listen(port, '::')
        .then(() => console.log(`Listening on port ${port}`));
}
bootstrap();

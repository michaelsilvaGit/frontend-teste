import { Module } from '@nestjs/common';
import { ModulesModule } from '@modules/modules.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@common/filters/all-exceptions.filter';
import { configuration } from '@config/swagger/env/configurations';
import { envSchemaConfiguration } from '@config/swagger/env/env';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: (env) => envSchemaConfiguration.parse(env),
            isGlobal: true,
            load: [configuration],
        }),
        ModulesModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        ModulesModule,
    ],
    exports: [ModulesModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@config/config.module';
import { AppController } from './app.controller';
import { ClientsModule } from './clients/clients.module';

@Module({
    imports: [ConfigModule, ClientsModule],
    controllers: [AppController],
    providers: [ConfigModule],
    exports: [ConfigModule, ClientsModule],
})
export class ModulesModule {}

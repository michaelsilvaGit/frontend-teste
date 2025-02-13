import { Module } from '@nestjs/common';
import { ClientsRepository } from './repositories/prisma-client.repository';
import { ClientsController } from './controllers/client.controller';
import { ClientsService } from './services/client.service';
import { DatabaseModule } from '@config/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ClientsController],
    providers: [ClientsService, ClientsRepository],
    exports: [ClientsService, ClientsRepository],
})
export class ClientsModule {}

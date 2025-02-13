import { Module } from '@nestjs/common';
import { EnvService } from './swagger/env/env.service';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [DatabaseModule, EnvService],
    exports: [DatabaseModule, EnvService],
})
export class ConfigModule {}

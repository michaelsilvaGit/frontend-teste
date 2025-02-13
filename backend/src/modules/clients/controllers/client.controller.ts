import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    ParseIntPipe,
} from '@nestjs/common';
import { ClientsService } from '../services/client.service';

@Controller('client')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Get()
    async findAll() {
        return this.clientsService.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.clientsService.findById(id);
    }

    @Post()
    async create(
        @Body()
        data: {
            avatar?: string;
            username: string;
            email: string;
            password: string;
            active: boolean;
        },
    ) {
        return this.clientsService.create(data);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body()
        data: {
            avatar?: string;
            username?: string;
            email?: string;
            password?: string;
            active?: boolean;
        },
    ) {
        return this.clientsService.update(id, data);
    }

    @Delete(':id')
    async softDelete(@Param('id', ParseIntPipe) id: number) {
        return this.clientsService.softDelete(id);
    }
}

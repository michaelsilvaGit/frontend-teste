import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { ClientsService } from '../services/client.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { z } from 'zod';
import { ZodValidationPipe } from 'nestjs-zod';

const clientParamSchema = z.coerce.number();
const paramValidationPipe = new ZodValidationPipe(clientParamSchema);

@ApiTags('Client')
@Controller('client')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Returns all clients.',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    avatar: { type: 'string' },
                    username: { type: 'string' },
                    email: { type: 'string' },
                    active: { type: 'boolean' },
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' },
                    deletedAt: { type: 'string', nullable: true },
                },
            },
        },
    })
    async findAll() {
        return this.clientsService.findAll();
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'Returns a single client by ID.',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                avatar: { type: 'string' },
                username: { type: 'string' },
                email: { type: 'string' },
                active: { type: 'boolean' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
                deletedAt: { type: 'string', nullable: true },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Client not found.',
    })
    async findById(@Param('id', paramValidationPipe) id: number) {
        const client = await this.clientsService.findById(id);
        if (!client) {
            throw new NotFoundException('Client not found');
        }
        return client;
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: 'Creates a new client.',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                avatar: { type: 'string' },
                username: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                active: { type: 'boolean' },
                createdAt: { type: 'string' },
            },
        },
    })
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
    @ApiResponse({
        status: 200,
        description: 'Updates an existing client.',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                avatar: { type: 'string' },
                username: { type: 'string' },
                email: { type: 'string' },
                active: { type: 'boolean' },
                updatedAt: { type: 'string' },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Client not found.',
    })
    async update(
        @Param('id', paramValidationPipe) id: number,
        @Body()
        data: {
            avatar?: string;
            username?: string;
            email?: string;
            password?: string;
            active?: boolean;
        },
    ) {
        const updatedClient = await this.clientsService.update(id, data);
        if (!updatedClient) {
            throw new NotFoundException('Client not found');
        }
        return updatedClient;
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'Soft deletes a client.',
    })
    @ApiResponse({
        status: 404,
        description: 'Client not found.',
    })
    async softDelete(@Param('id', paramValidationPipe) id: number) {
        const deletedClient = await this.clientsService.softDelete(id);
        if (!deletedClient) {
            throw new NotFoundException('Client not found');
        }
        return { message: 'Client soft deleted successfully' };
    }
}

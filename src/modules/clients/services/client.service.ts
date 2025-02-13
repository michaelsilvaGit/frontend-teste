import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Client } from '@prisma/client';
import { ClientsRepository } from '../repositories/prisma-client.repository';

@Injectable()
export class ClientsService {
    constructor(private readonly clientRepository: ClientsRepository) {}

    async findAll(): Promise<Client[]> {
        return this.clientRepository.findAll();
    }

    async findById(id: number): Promise<Client> {
        const client = await this.clientRepository.findById(id);
        if (!client) {
            throw new NotFoundException('Client not found');
        }
        return client;
    }

    async create(data: Prisma.ClientCreateInput): Promise<Client> {
        return this.clientRepository.create(data);
    }

    async update(id: number, data: Prisma.ClientUpdateInput): Promise<Client> {
        await this.findById(id);
        return this.clientRepository.update(id, data);
    }

    async softDelete(id: number): Promise<Client> {
        await this.findById(id);
        return this.clientRepository.softDelete(id);
    }
}

import { PrismaService } from '@config/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Client } from '@prisma/client';

@Injectable()
export class ClientsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Client[]> {
        return this.prisma.client.findMany({
            where: {
                deletedAt: null,
            },
        });
    }

    async findById(id: number): Promise<Client | null> {
        return this.prisma.client.findFirst({
            where: {
                id,
                deletedAt: null,
            },
        });
    }

    async create(data: Prisma.ClientCreateInput): Promise<Client> {
        return this.prisma.client.create({ data });
    }

    async update(id: number, data: Prisma.ClientUpdateInput): Promise<Client> {
        return this.prisma.client.update({
            where: { id },
            data,
        });
    }

    async softDelete(id: number): Promise<Client> {
        return this.prisma.client.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}

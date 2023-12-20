import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export type GroupCreateData = Prisma.Args<typeof prisma.eventGroup, 'create'>['data'];

export type GroupUpdateData = Prisma.Args<typeof prisma.eventGroup, 'update'>['data'];
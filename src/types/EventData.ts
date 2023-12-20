import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export type EventsCreateData = Prisma.Args<typeof prisma.event, 'create'>['data'];

export type EventsUpdateData = Prisma.Args<typeof prisma.event, 'update'>['data'];

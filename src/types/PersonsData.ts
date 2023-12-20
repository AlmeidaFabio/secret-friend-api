import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export type PersonCreateData = Prisma.Args<typeof prisma.eventPeople, 'create'>['data'];

export type PersonUpdateData = Prisma.Args<typeof prisma.eventPeople, 'update'>['data'];
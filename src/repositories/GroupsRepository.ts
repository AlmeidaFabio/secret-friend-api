import { Prisma, PrismaClient } from "@prisma/client";
import { GroupsRepositoryInterface } from "../interfaces/GroupsRepositoryInterface";
import { Group } from "../types/Group";
import { GroupFilters } from "../types/GroupFilters.";
import { GroupCreateData, GroupUpdateData } from "../types/GroupData";

export class GroupsRepository implements GroupsRepositoryInterface {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    getAll = async(event_id: number): Promise<Group[]> => {
        try {
            const groups = await this.prisma.eventGroup.findMany({
                where: {
                    eventId: event_id
                }
            })

            return groups
        } catch (error) {
            throw new Error(`Error in getAll: ${error}`);
        }
    }

    getOne = async(filters: GroupFilters): Promise<Group | null> => {
        try {
            const group = await this.prisma.eventGroup.findFirst({
                where: filters
            })

            return group
        } catch (error) {
            throw new Error(`Error in getOne: ${error}`);
        }
    }

    create = async(data: GroupCreateData): Promise<Group> => {
        try {
            const newGroup = await this.prisma.eventGroup.create({data})

            return newGroup
        } catch (error) {
            throw new Error(`Error in create: ${error}`);
        }
    }

    edit = async(filters: GroupFilters, data: GroupUpdateData): Promise<Group> => {
        try {
            const updatedGroup = await this.prisma.eventGroup.update({
                where: filters,
                data
            })
            return updatedGroup
        } catch (error) {
            throw new Error(`Error in edit: ${error}`);
        }
    }

    remove = async(filters: GroupFilters): Promise<Group> => {
        try {
            return  await this.prisma.eventGroup.delete({
                where: filters
            })
        } catch (error) {
            throw new Error(`Error in remove: ${error}`);
        }
    }
}
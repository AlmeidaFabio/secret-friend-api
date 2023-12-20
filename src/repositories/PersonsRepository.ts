import { Prisma, PrismaClient } from "@prisma/client";
import { PersonsRepositoryInterface } from "../interfaces/PersonsRepositoryInterface";
import { Person } from "../types/Person";
import { GetAllPersonsFilter, GetOnePersonFilters, PersonDeleteFilters, PersonUpdateFilters, SearchPersonFilters } from "../types/PersonsFilters";
import { PersonCreateData, PersonUpdateData } from "../types/PersonsData";

export class PersonsRepository implements PersonsRepositoryInterface {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    getAll = async(filters: GetAllPersonsFilter): Promise<Person[]> => {
        try {
            const persons = await this.prisma.eventPeople.findMany({
                where: filters
            })

            return persons
        } catch (error) {
            throw new Error(`Error in getAll: ${error}`);
        }
    }

    getOne = async(filters: GetOnePersonFilters): Promise<Person | null> => {
        try {
            const person = await this.prisma.eventPeople.findFirst({
                where: filters
            })

            return person
        } catch (error) {
            throw new Error(`Error in getOne: ${error}`);
        }
    }

    create = async(data: PersonCreateData): Promise<Person> => {
        try {
            const newPerson = await this.prisma.eventPeople.create({
                data
            })

            return newPerson
        } catch (error) {
            throw new Error(`Error in create: ${error}`);
        }
    }

    edit = async(filters: PersonUpdateFilters, data: PersonUpdateData): Promise<Prisma.BatchPayload> => {
        try {
            return await this.prisma.eventPeople.updateMany({
                where: filters,
                data
            })
        } catch (error) {
            throw new Error(`Error in edit: ${error}`);
        }
    }

    remove = async(filters: PersonDeleteFilters): Promise<Person> => {
        try {
            return await this.prisma.eventPeople.delete({
                where: filters
            })
        } catch (error) {
            throw new Error(`Error in remove: ${error}`);
        }
    }

    search = async (filters: SearchPersonFilters): Promise<Person | null> => {
        try {
            const person = await this.prisma.eventPeople.findFirst({
                where: filters
            })

            return person
        } catch (error) {
            throw new Error(`Error in search: ${error}`);
        }
    }
}
import { Prisma } from "@prisma/client";
import { Person } from "../types/Person";
import { GetAllPersonsFilter, GetOnePersonFilters, PersonDeleteFilters, PersonUpdateFilters, SearchPersonFilters } from "../types/PersonsFilters";
import { PersonCreateData, PersonUpdateData } from "../types/PersonsData";

export interface PersonsRepositoryInterface {
    getAll(filters: GetAllPersonsFilter): Promise<Person[]>;
    getOne(filters: GetOnePersonFilters): Promise<Person | null>;
    create(data: PersonCreateData): Promise<Person>;
    edit(filters: PersonUpdateFilters, data: PersonUpdateData): Promise<Prisma.BatchPayload>;
    remove(filters: PersonDeleteFilters): Promise<Person>;
    search(filters:SearchPersonFilters): Promise<Person | null>;
}
export type GetAllPersonsFilter = {
    eventId: number;
    groupId?: number;
}

export type GetOnePersonFilters = {
    id?: number;
    eventId: number;
    groupId?: number;
}

export type PersonUpdateFilters = {
    id?: number;
    eventId: number,
    groupId?: number
}

export type PersonDeleteFilters = {
    id: number;
    eventId: number;
    groupId?: number;
}

export type SearchPersonFilters = {
    eventId: number;
    cpf: string;
}
import { Event } from "../types/Event";
import { EventsCreateData, EventsUpdateData } from "../types/EventData";

export interface EventsRepositoryInterface {
    getAll(): Promise<Event[]>;
    getOne(id: number): Promise<Event | null>;
    create(data: EventsCreateData): Promise<Event>;
    edit(id:number, data: EventsUpdateData): Promise<Event>;
    remove(id:number): Promise<Event>;
    doMatches(id:number): Promise<boolean>;
}
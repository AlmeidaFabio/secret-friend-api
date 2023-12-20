import { EventsRepositoryInterface } from "../../interfaces/EventsRepositoryInterface";
import { EventsCreateData } from "../../types/EventData";


export class CreateEventService {
    constructor(private repository: EventsRepositoryInterface){}

    execute = async (data: EventsCreateData) => {
        try {
            const event = await this.repository.create(data)
            return  event
        } catch (error) {
            throw new Error("Error in CreateEventService "+error)
        }
    }
}
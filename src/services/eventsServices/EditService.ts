import { EventsRepositoryInterface } from "../../interfaces/EventsRepositoryInterface";
import { EventsUpdateData } from "../../types/EventData";


export class EditEventService {
    constructor(private repository: EventsRepositoryInterface) { }

    execute = async (id: number, data: EventsUpdateData) => {
        try {
            const updatedEvent = await this.repository.edit(id, data)

            return updatedEvent
        } catch (error) {
            throw new Error("Error in EditEventService "+error)
        }
    }
}
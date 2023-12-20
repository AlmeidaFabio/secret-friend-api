import { EventsRepositoryInterface } from "../../interfaces/EventsRepositoryInterface"

export class GetAllEventsService {
    constructor(private repository: EventsRepositoryInterface) {}

    execute = async () => {
        try {
            const events = await this.repository.getAll()
            return events
        } catch (error) {
            throw new Error("Error in GetAllEventsService "+error)
        }
    }
}
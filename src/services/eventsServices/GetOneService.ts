import { EventsRepositoryInterface } from "../../interfaces/EventsRepositoryInterface";

export class GetOneEventService {
    constructor(private repository: EventsRepositoryInterface) {}

    execute = async (id:number) => {
        try {
            const event = await this.repository.getOne(id)
            return event
        } catch (error) {
            throw new Error("Error in GetOneEventService "+error)
        }
    }
}
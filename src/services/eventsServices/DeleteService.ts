import { EventsRepositoryInterface } from "../../interfaces/EventsRepositoryInterface";

export class DeleteEventService {
    constructor(private repository: EventsRepositoryInterface){}

    execute = async (id:number) => {
        try {
            await this.repository.remove(id)
        } catch (error) {
            throw new Error("Error in DeleteEventService "+ error)
        }
    }
}
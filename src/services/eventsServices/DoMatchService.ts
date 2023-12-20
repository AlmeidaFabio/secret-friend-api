import { EventsRepositoryInterface } from "../../interfaces/EventsRepositoryInterface";

export class DoMatchService {
    constructor(private repository: EventsRepositoryInterface) {}

    async execute (id:number) {
        try {
            const result = await this.repository.doMatches(id)
            return result
        } catch (error) {
            throw new Error(`Error in DoMatchService ${error}`)
        }
    }
}
import { PersonsRepositoryInterface } from "../../interfaces/PersonsRepositoryInterface"
import { PersonDeleteFilters } from "../../types/PersonsFilters"

export class DeletePersonService {
    constructor(private repository: PersonsRepositoryInterface){}

    execute = async (filters: PersonDeleteFilters) => {
        try {
            const person = await this.repository.remove(filters)
            return person
        } catch (error) {
            throw new Error("Error in DeletePersonService "+ error)
        }
    }
}
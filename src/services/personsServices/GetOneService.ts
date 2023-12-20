import { PersonsRepositoryInterface } from "../../interfaces/PersonsRepositoryInterface"
import { GetOnePersonFilters } from "../../types/PersonsFilters"

export class GetOnePersonService {
    constructor(private repository: PersonsRepositoryInterface) {}

    execute = async (filters: GetOnePersonFilters) => {
        try {
            const person = await this.repository.getOne(filters)
            return person
        } catch (error) {
            throw new Error("Error in GetOnePersonService "+error)
        }
    }
}
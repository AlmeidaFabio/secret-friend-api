import { PersonsRepositoryInterface } from "../../interfaces/PersonsRepositoryInterface"
import { SearchPersonFilters } from "../../types/PersonsFilters"

export class SearchPersonService {
    constructor(private repository: PersonsRepositoryInterface){}

    execute = async (filters: SearchPersonFilters) => {
        try {
            const person = await this.repository.search(filters)
            return person
        } catch (error) {
            throw new Error(`Error in SearchPersonService ${error}`)
        }
    }
}
import { PersonsRepositoryInterface } from "../../interfaces/PersonsRepositoryInterface"
import { PersonUpdateData } from "../../types/PersonsData"
import { PersonUpdateFilters } from "../../types/PersonsFilters"

export class EditPersonService {
    constructor(private repository: PersonsRepositoryInterface) { }

    execute = async (filters: PersonUpdateFilters, data: PersonUpdateData) => {
        try {
            const updatedPerson = await this.repository.edit(filters, data)

            return updatedPerson
        } catch (error) {
            throw new Error("Error in EditPersonService "+error)
        }
    }
}
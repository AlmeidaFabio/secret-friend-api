import { PersonsRepositoryInterface } from "../../interfaces/PersonsRepositoryInterface"
import { PersonCreateData } from "../../types/PersonsData"

export class CreatePersonService {
    constructor(private repository: PersonsRepositoryInterface){}

    execute = async (data: PersonCreateData) => {
        try {
            const person = await this.repository.create(data)
            return  person
        } catch (error) {
            throw new Error("Error in CreatePersonService "+error)
        }
    }
}
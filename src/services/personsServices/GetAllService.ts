import { PersonsRepositoryInterface } from "../../interfaces/PersonsRepositoryInterface"
import { GetAllPersonsFilter } from "../../types/PersonsFilters";

export class GetAllPersonsService {
    constructor(private repository: PersonsRepositoryInterface) {}

    execute = async (filters: GetAllPersonsFilter) => {
        try {
            if (!this.repository) {
                throw new Error("Repositório não inicializado");
            }

            const persons = await this.repository.getAll(filters)
            
            return persons
        } catch (error) {
            throw new Error("Erro in GetAllPersonsService "+ error);
        }
    }
}
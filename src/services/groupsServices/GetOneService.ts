import { GroupsRepositoryInterface } from "../../interfaces/GroupsRepositoryInterface";
import { GroupFilters } from "../../types/GroupFilters.";

export class GetOneGroupService {
    constructor(private repository: GroupsRepositoryInterface) {}

    execute = async (filters: GroupFilters) => {
        try {
            const group = await this.repository.getOne(filters)
            return group
        } catch (error) {
            throw new Error("Error in GEtOneGroupService "+error)
        }
    }
}
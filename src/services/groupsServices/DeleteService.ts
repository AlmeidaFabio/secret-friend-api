import { GroupsRepositoryInterface } from "../../interfaces/GroupsRepositoryInterface"
import { GroupFilters } from "../../types/GroupFilters."

export class DeleteGroupService {
    constructor(private repository: GroupsRepositoryInterface){}

    execute = async (filters: GroupFilters) => {
        try {
            await this.repository.remove(filters)
        } catch (error) {
            throw new Error("Error in DeleteGroupService "+ error)
        }
    }
}
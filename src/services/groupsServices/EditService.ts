import { GroupsRepositoryInterface } from "../../interfaces/GroupsRepositoryInterface"
import { GroupUpdateData } from "../../types/GroupData"
import { GroupFilters } from "../../types/GroupFilters."

export class EditGroupService {
    constructor(private repository: GroupsRepositoryInterface) { }

    execute = async (filters: GroupFilters, data: GroupUpdateData) => {
        try {
            const updatedGroup = await this.repository.edit(filters, data)

            return updatedGroup
        } catch (error) {
            throw new Error("Error in EditGroupService "+error)
        }
    }
}
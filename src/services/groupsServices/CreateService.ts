import { GroupsRepositoryInterface } from "../../interfaces/GroupsRepositoryInterface"
import { GroupCreateData } from "../../types/GroupData"

export class CreateGroupService {
    constructor(private repository: GroupsRepositoryInterface){}

    execute = async (data: GroupCreateData) => {
        try {
            const group = await this.repository.create(data)
            return  group
        } catch (error) {
            throw new Error("Error in CreateGroupService "+error)
        }
    }
}
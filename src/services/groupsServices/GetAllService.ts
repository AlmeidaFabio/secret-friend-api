import { GroupsRepositoryInterface } from "../../interfaces/GroupsRepositoryInterface"

export class GetAllGroupsService {
    constructor(private repository: GroupsRepositoryInterface) {}

    execute = async (eventId: number) => {
        try {
            const groups = await this.repository.getAll(eventId)
            return groups
        } catch (error) {
            throw new Error("Error in GetAllGroupsService "+error)
        }
    }
}
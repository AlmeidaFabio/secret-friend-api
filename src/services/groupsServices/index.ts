import { groupsRepository } from "../../repositories"
import { CreateGroupService } from "./CreateService"
import { DeleteGroupService } from "./DeleteService"
import { EditGroupService } from "./EditService"
import { GetAllGroupsService } from "./GetAllService"
import { GetOneGroupService } from "./GetOneService"

const getAllGroupsService = new GetAllGroupsService(groupsRepository)
const getOneGroupsService = new GetOneGroupService(groupsRepository)
const createGroupsService = new CreateGroupService(groupsRepository)
const editGroupsService = new EditGroupService(groupsRepository)
const deleteGroupsService= new DeleteGroupService(groupsRepository)

export {
    getAllGroupsService,
    getOneGroupsService,
    createGroupsService,
    editGroupsService,
    deleteGroupsService
}
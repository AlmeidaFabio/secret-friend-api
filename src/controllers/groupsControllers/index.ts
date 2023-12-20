import { getOneEventsService } from "../../services/eventsServices"
import { 
    createGroupsService, 
    deleteGroupsService, 
    editGroupsService, 
    getAllGroupsService, 
    getOneGroupsService 
} from "../../services/groupsServices"
import { CreateGroupController } from "./CreateController"
import { DeleteGroupController } from "./DeleteController"
import { EditGroupController } from "./EditController"
import { GetAllGroupsController } from "./GetAllController"
import { GetOneGroupController } from "./GetOneController"

const getAllGroupsController = new GetAllGroupsController(getAllGroupsService)
const getOneGroupController  = new GetOneGroupController(getOneGroupsService)
const createGroupController = new CreateGroupController(createGroupsService, getOneEventsService)
const editGroupController = new EditGroupController(editGroupsService)
const deleteGroupController = new DeleteGroupController(deleteGroupsService)

export {
    getAllGroupsController,
    getOneGroupController,
    createGroupController,
    editGroupController,
    deleteGroupController
}
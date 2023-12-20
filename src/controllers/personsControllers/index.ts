import { getOneEventsService } from "../../services/eventsServices"
import { getOneGroupsService } from "../../services/groupsServices"
import { 
    createPersonService, 
    deletePersonService, 
    editPersonService, 
    getAllPersonsService, 
    getOnePersonService, 
    searchService
} from "../../services/personsServices"
import { CreatePersonController } from "./CreateController"
import { DeletePersonController } from "./DeleteController"
import { EditPersonController } from "./EditController"
import { GetAllPersonsController } from "./GetAllController"
import { GetOnePersonController } from "./GetOneController"
import { SearchPersonController } from "./SearchPersonController"

const getAllPersonsController = new GetAllPersonsController(getAllPersonsService)
const getOnePersonController = new GetOnePersonController(getOnePersonService)
const createPersonController = new CreatePersonController(createPersonService, getOneEventsService, getOneGroupsService)
const editPersonController = new EditPersonController(editPersonService, getOnePersonService)
const deletePersonController = new DeletePersonController(deletePersonService)
const searchController = new SearchPersonController(searchService, getOnePersonService)


export {
    getAllPersonsController,
    getOnePersonController,
    createPersonController,
    editPersonController,
    deletePersonController,
    searchController
}
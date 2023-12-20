import { personsRepository } from "../../repositories"
import { CreatePersonService } from "./CreateService"
import { DeletePersonService } from "./DeleteService"
import { EditPersonService } from "./EditService"
import { GetAllPersonsService } from "./GetAllService"
import { GetOnePersonService } from "./GetOneService"
import { SearchPersonService } from "./SearchService"

const getAllPersonsService = new GetAllPersonsService(personsRepository)
const getOnePersonService =  new GetOnePersonService(personsRepository)
const createPersonService = new CreatePersonService(personsRepository)
const editPersonService = new EditPersonService(personsRepository)
const deletePersonService = new DeletePersonService(personsRepository)
const searchService = new SearchPersonService(personsRepository)

export {
    getAllPersonsService,
    getOnePersonService,
    createPersonService,
    editPersonService,
    deletePersonService,
    searchService
}
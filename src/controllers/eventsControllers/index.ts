import { createEventService, deleteEventService, doMatchesSevice, editEventService, getAllEventsService, getOneEventsService } from "../../services/eventsServices"
import { editPersonService } from "../../services/personsServices"
import { CreateEventController } from "./CreateController"
import { DeleteEventController } from "./DeleteController"
import { EditEventController } from "./EditController"
import { GetAllEventsController } from "./GetAllController"
import { GetOneEventController } from "./GetOneController"

const getAllEventsController = new GetAllEventsController(getAllEventsService)
const getOneEventController  = new GetOneEventController(getOneEventsService)
const createEventController = new CreateEventController(createEventService)
const editEventController = new EditEventController(editEventService, editPersonService, doMatchesSevice)
const deleteEventController = new DeleteEventController(deleteEventService)

export {
    getAllEventsController,
    getOneEventController,
    createEventController,
    editEventController,
    deleteEventController
}
import { eventsRepository } from "../../repositories";
import { CreateEventService } from "./CreateService";
import { DeleteEventService } from "./DeleteService";
import { DoMatchService } from "./DoMatchService";
import { EditEventService } from "./EditService";
import { GetAllEventsService } from "./GetAllService";
import { GetOneEventService } from "./GetOneService";

const getAllEventsService = new GetAllEventsService(eventsRepository)
const getOneEventsService = new GetOneEventService(eventsRepository)
const createEventService = new CreateEventService(eventsRepository)
const editEventService = new EditEventService(eventsRepository)
const deleteEventService = new DeleteEventService(eventsRepository)
const doMatchesSevice = new DoMatchService(eventsRepository)


export {
    getAllEventsService,
    getOneEventsService,
    createEventService,
    editEventService,
    deleteEventService,
    doMatchesSevice
}
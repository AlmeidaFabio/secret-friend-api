import { editPersonService } from "../services/personsServices";
import { EventsRepository } from "./EventsRepository";
import { GroupsRepository } from "./GroupsRepository";
import { PersonsRepository } from "./PersonsRepository";

const eventsRepository = new EventsRepository(editPersonService);
const groupsRepository = new GroupsRepository();
const personsRepository = new PersonsRepository();

export {
    eventsRepository,
    groupsRepository,
    personsRepository
}
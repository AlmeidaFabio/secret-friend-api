import { PrismaClient } from "@prisma/client";
import { EventsRepositoryInterface } from "../interfaces/EventsRepositoryInterface";
import { Event } from "../types/Event";
import { encryptMatch } from "../utils/match";
import { EventsCreateData, EventsUpdateData } from "../types/EventData";
import { EditPersonService } from "../services/personsServices/EditService";

export class EventsRepository implements EventsRepositoryInterface {
    private prisma: PrismaClient;

    constructor(private editPeopleService: EditPersonService) {
        this.prisma = new PrismaClient();
    }

    getAll = async (): Promise<Event[]> => {
        try {
            const events = await this.prisma.event.findMany()

            return events

        } catch (error) {
            throw new Error(`Error in getAll: ${error}`);
        }
    }

    getOne = async (id: number): Promise<Event | null> => {
        try {
            const event = await this.prisma.event.findFirst({
                where: { id }
            })

            return event
        } catch (error) {
            throw new Error(`Error in getOne: ${error}`);
        }
    };

    create = async (data: EventsCreateData): Promise<Event> => {
        try {
            const newEvent = await this.prisma.event.create({ data })

            return newEvent
        } catch (error) {
            throw new Error(`Error in create: ${error}`);
        }
    };

    edit = async (id:number, data: EventsUpdateData) => {
        try {
            const editedEvent = await this.prisma.event.update({
                where: { id },
                data
            })

            return editedEvent
        } catch (error) {
            throw new Error(`Error in edit: ${error}`);
        }
    }

    remove = async (id:number) => {
        try {
            return await this.prisma.event.delete({ where: { id }})
        } catch (error:any) {
            throw new Error(`Error in remove: ${error}`);
        }
    }

    doMatches = async (id: number): Promise<boolean> => {
        const event = await this.prisma.event.findFirst({where: { id }})
        
        if(event) {
            const peopleList = await this.prisma.eventPeople.findMany({
                where: { eventId:id }
            })
            console.log(peopleList)
            if(peopleList) {
                let sortedList: {id:number, match: number}[] = []
                let sortables: number[] = []
                let attempts = 0;
                let maxAttempts = peopleList.length;
                let keepTrying = true;
    
                while(keepTrying && attempts < maxAttempts) {
                    keepTrying = false;
                    attempts++
                    sortedList = []
                    sortables = peopleList.map(item => item.id!)

                    for(let i in peopleList) {
                        let sortableFiltered: number[] = sortables
                        if(event.grouped) {
                            sortableFiltered = sortables.filter(sortableItem  => {
                                let sortablePerson = peopleList.find(item => item.id === sortableItem)
                                return peopleList[i].groupId !== sortablePerson?.groupId
                            })
                        }

                        if(sortableFiltered.length === 0 || sortableFiltered.length === 1 && peopleList[i].id === sortableFiltered[0]){
                            keepTrying = true
                        } else {
                            let sortedIndex = Math.floor(Math.random() * sortableFiltered.length)

                            while(sortableFiltered[sortedIndex] === peopleList[i].id) {
                                sortedIndex = Math.floor(Math.random() * sortableFiltered.length)
                            }

                            sortedList.push({
                                id: peopleList[i].id!,
                                match: sortableFiltered[sortedIndex]
                            })
                            sortables = sortables.filter(item => item !== sortableFiltered[sortedIndex])
                        }
                    }
                }

                if(attempts < maxAttempts) {
                    for( let i in sortedList ) {
                        await this.editPeopleService.execute({
                            id: sortedList[i].id,
                            eventId: id
                        },{
                            matched: encryptMatch(sortedList[i].match)
                        })
                    }

                    return true
                }
            }
        }
        return false
    }
}
import { RequestHandler } from "express";
import { z } from "zod";
import { CreatePersonService } from "../../services/personsServices/CreateService";
import { GetOneEventService } from "../../services/eventsServices/GetOneService";
import { GetOneGroupService } from "../../services/groupsServices/GetOneService";
import { GroupFilters } from "../../types/GroupFilters.";
import { PersonCreateData } from "../../types/PersonsData";

export class CreatePersonController {
    constructor(
        private service: CreatePersonService, 
        private getOneEventService: GetOneEventService, 
        private getOneGroupService: GetOneGroupService) 
    {
        this.create = this.create.bind(this)
    }

    create: RequestHandler = async (req, res) => {
        const { event_id, group_id } = req.params
        
        const addPersonSchema = z.object({
            name: z.string(),
            cpf: z.string().transform(val => val.replace(/\.|-/gm, ''))
        })

        try {
            const body = addPersonSchema.safeParse(req.body)

            if(!body.success) {
                return res.status(400).json({error: 'Dados inválidos'})
            }

            const event = await this.getOneEventService.execute(parseInt(event_id))
            
            if(!event) {
                return res.status(400).json({error: 'Evento inexistente'})
            }

            const groupFilters: GroupFilters = {
                id: parseInt(group_id),
                eventId: parseInt(event_id)
            }

            const group = await this.getOneGroupService.execute(groupFilters)
            
            if(!group) {
                return res.status(400).json({error: 'Grupo inexistente'})
            }

            const data: PersonCreateData = {
                ...body.data,
                eventId: parseInt(event_id),
                groupId: parseInt(group_id)
            }

            const newPerson = await this.service.execute(data)
            
            return res.status(201).json({person: newPerson})
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}
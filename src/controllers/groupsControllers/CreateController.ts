import { RequestHandler } from "express";
import { z } from "zod";
import { CreateGroupService } from "../../services/groupsServices/CreateService";
import { GetOneEventService } from "../../services/eventsServices/GetOneService";

export class CreateGroupController {
    constructor(private service: CreateGroupService, private getOneEventService: GetOneEventService) {
        this.create = this.create.bind(this)
    }

    create: RequestHandler = async (req, res) => {
        const { event_id } = req.params
        
        const addGroupSchema = z.object({
            name: z.string()
        })

        try {
            const body = addGroupSchema.safeParse(req.body)

            if(!body.success) {
                return res.status(400).json({error: 'Dados inválidos'})
            }

            const event = await this.getOneEventService.execute(parseInt(event_id))
            
            if(!event) {
                return res.status(400).json({error: 'Evento inexistente'})
            }

            const newGroup = await this.service.execute({
                ...body.data,
                eventId: parseInt(event_id)
            })

            return res.status(201).json({group: newGroup})
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}
import { RequestHandler } from "express";
import { z } from "zod";
import { CreateEventService } from "../../services/eventsServices/CreateService";

export class CreateEventController {
    constructor(private service: CreateEventService) {
        this.create = this.create.bind(this)
    }

    create: RequestHandler = async (req, res) => {
        const addEventSchema = z.object({
            title: z.string(),
            description: z.string(),
            grouped: z.boolean()
        })

        try {
            const body = addEventSchema.safeParse(req.body)

            if(!body.success) {
                return res.status(400).json({error: 'Dados inválidos'})
            }

            const newEvent = await this.service.execute(body.data)

            return res.status(201).json(newEvent)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}
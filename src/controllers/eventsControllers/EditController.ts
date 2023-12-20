import { RequestHandler } from "express";
import { z } from "zod";
import { EditEventService } from "../../services/eventsServices/EditService";
import { EditPersonService } from "../../services/personsServices/EditService";
import { DoMatchService } from "../../services/eventsServices/DoMatchService";

export class EditEventController {
    constructor(
        private service: EditEventService,
        private editPeople: EditPersonService,
        private doMatchService: DoMatchService
    ) {
        this.edit = this.edit.bind(this)
    }

    edit: RequestHandler = async (req, res) => {
        const { id } = req.params
        const updateEventSchema = z.object({
            status: z.boolean().optional(),
            title: z.string().optional(),
            description: z.string().optional(),
            grouped: z.boolean().optional()
        })

        try {
            const body = updateEventSchema.safeParse(req.body)
            if (!body.success) {
                return res.status(400).json({ error: 'Dados inválidos' })
            }

            const updatedEvent = await this.service.execute(parseInt(id), body.data)
            if (updatedEvent.status) {
                const result = await this.doMatchService.execute(parseInt(id));

                if (!result) {
                    return res.status(400).json({ error: 'Erro ao sortear grupos.' });
                }
            } else {
                await this.editPeople.execute({ eventId: parseInt(id) }, { matched: '' })
            }
            return res.status(201).json(updatedEvent)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}
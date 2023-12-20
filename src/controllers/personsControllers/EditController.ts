import { RequestHandler } from "express";
import { z } from "zod";
import { EditPersonService } from "../../services/personsServices/EditService";
import { GetOnePersonService } from "../../services/personsServices/GetOneService";

export class EditPersonController {
    constructor(private service: EditPersonService, private getOneService: GetOnePersonService) {
        this.edit = this.edit.bind(this)
    }

    edit: RequestHandler = async (req, res) => {
        const { id, event_id, group_id } = req.params
        const updatedPersonSchema = z.object({
            name: z.string().optional(),
            cpf: z.string().transform(val => val.replace(/\.|-/gm, '')).optional(),
            matched: z.string().optional()
        })

        try {
            const body = updatedPersonSchema.safeParse(req.body)
            if(!body.success) {
                return res.status(400).json({error: 'Dados inválidos'})
            }
            const filters = {
                id: parseInt(id),
                eventId: parseInt(event_id),
                groupId: parseInt(group_id)
            }
            const updatedPerson = await this.service.execute(filters, body.data)

            if(updatedPerson) {
                const personItem = await this.getOneService.execute(filters)

                return res.status(201).json({person: personItem})
            }

            return res.status(400).json('Ocorreu um erro!!')

        } catch (error) {
            return res.status(400).json(error)
        }
    }
}
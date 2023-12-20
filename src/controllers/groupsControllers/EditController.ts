import { RequestHandler } from "express";
import { z } from "zod";
import { EditGroupService } from "../../services/groupsServices/EditService";
import { GroupFilters } from "../../types/GroupFilters.";

export class EditGroupController {
    constructor(private service: EditGroupService) {
        this.edit = this.edit.bind(this)
    }

    edit: RequestHandler = async (req, res) => {
        const { id, event_id } = req.params
        const updateGroupSchema = z.object({
            name: z.string().optional(),
        })

        try {
            const body = updateGroupSchema.safeParse(req.body)
            if(!body.success) {
                return res.status(400).json({error: 'Dados inválidos'})
            }

            const filters: GroupFilters = {
                id: parseInt(id),
                eventId: parseInt(event_id)
            }

            const updatedGroup = await this.service.execute(filters, body.data)

            return res.status(201).json({group: updatedGroup})
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}
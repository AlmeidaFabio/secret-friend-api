import { RequestHandler } from "express";
import { DeleteGroupService } from "../../services/groupsServices/DeleteService";
import { GroupFilters } from "../../types/GroupFilters.";


export class DeleteGroupController {
    constructor(private service: DeleteGroupService){
        this.remove = this.remove.bind(this)
    }

    remove: RequestHandler = async (req, res) => {
        const { id, event_id } = req.params

        const filters: GroupFilters = {
            id: parseInt(id),
            eventId: parseInt(event_id)
        }

        try {
            const deletedEvent = await this.service.execute(filters)

            return res.status(200).json({group: deletedEvent})
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}
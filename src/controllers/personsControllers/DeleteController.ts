import { RequestHandler } from "express";
import { DeletePersonService } from "../../services/personsServices/DeleteService";
import { PersonDeleteFilters } from "../../types/PersonsFilters";

export class DeletePersonController {
    constructor(private service: DeletePersonService){
        this.remove = this.remove.bind(this)
    }

    remove: RequestHandler = async (req, res) => {
        const { id, event_id, group_id } = req.params

        try {
            const filters: PersonDeleteFilters = {
                id: parseInt(id),
                eventId: parseInt(event_id),
                groupId: parseInt(group_id)
            }
            const deletedPerson = await this.service.execute(filters)

            return res.status(200).json({person: deletedPerson})
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}
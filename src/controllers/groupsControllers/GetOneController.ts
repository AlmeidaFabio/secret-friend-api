import { RequestHandler } from "express";
import { GetOneGroupService } from "../../services/groupsServices/GetOneService";
import { GroupFilters } from "../../types/GroupFilters.";

export class GetOneGroupController {
    constructor(private service: GetOneGroupService) {
        this.getOne = this.getOne.bind(this)
    }

    getOne: RequestHandler = async (req, res) => {
        const { id, event_id } = req.params

        try {
            const filters: GroupFilters = {
                id: parseInt(id),
                eventId: parseInt(event_id)
            }

            const group = await this.service.execute(filters)

            if(group) {
                return res.status(200).json({group})
            } else {
                return res.status(400).json({error: 'Ocorreu um erro'})
            }
        } catch (error) {
            return res.status(400).json({error: 'Ocorreu um erro: '+error})
        }
    }
}
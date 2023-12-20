import { RequestHandler } from "express"
import { GetAllGroupsService } from "../../services/groupsServices/GetAllService"

export class GetAllGroupsController {
    constructor(private service: GetAllGroupsService) {
        this.getAll = this.getAll.bind(this)
    }

    getAll: RequestHandler = async (req, res) => {
        const { event_id } = req.params

        try {
            const groups = await this.service.execute(parseInt(event_id))

            return res.status(200).json({groups})
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}
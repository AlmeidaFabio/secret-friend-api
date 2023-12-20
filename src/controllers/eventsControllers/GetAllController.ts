import { RequestHandler } from "express"
import { GetAllEventsService } from "../../services/eventsServices/GetAllService"

export class GetAllEventsController {
    constructor(private service: GetAllEventsService) {
        this.getAll = this.getAll.bind(this)
    }

    getAll: RequestHandler = async (req, res) => {
        try {
            const events = await this.service.execute()

            return res.status(200).json({events})
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}
import { RequestHandler } from "express";
import { DeleteEventService } from "../../services/eventsServices/DeleteService";

export class DeleteEventController {
    constructor(private service: DeleteEventService){
        this.remove = this.remove.bind(this)
    }

    remove: RequestHandler = async (req, res) => {
        const { id } = req.params

        try {
            const deletedEvent = await this.service.execute(parseInt(id))

            return res.status(200).json(deletedEvent)
        } catch (error) {
            return res.status(400).json(error)
        }
    }
}
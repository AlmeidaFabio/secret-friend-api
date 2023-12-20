import { RequestHandler } from "express";
import { GetOneEventService } from "../../services/eventsServices/GetOneService";

export class GetOneEventController {
    constructor(private service: GetOneEventService) {
        this.getOne = this.getOne.bind(this)
    }

    getOne: RequestHandler = async (req, res) => {
        const { id } = req.params

        try {
            const event = await this.service.execute(parseInt(id))

            if(event) {
                return res.status(200).json(event)
            } else {
                return res.status(400).json({error: 'Ocorreu um erro'})
            }
        } catch (error) {
            return res.status(400).json({error: 'Ocorreu um erro: '+error})
        }
    }
}
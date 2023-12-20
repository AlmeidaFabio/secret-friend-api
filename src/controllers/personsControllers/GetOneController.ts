import { RequestHandler } from "express";
import { GetOnePersonService } from "../../services/personsServices/GetOneService";
import { GetOnePersonFilters } from "../../types/PersonsFilters";

export class GetOnePersonController {
    constructor(private service: GetOnePersonService) {
        this.getOne = this.getOne.bind(this)
    }

    getOne: RequestHandler = async (req, res) => {
        const { id, event_id, group_id } = req.params

        try {
            const filters: GetOnePersonFilters = {
                id: parseInt(id),
                eventId: parseInt(event_id),
                groupId: parseInt(group_id)
            }
            
            const person = await this.service.execute(filters)

            if(person) {
                return res.status(200).json({person})
            } else {
                return res.status(400).json({error: 'Ocorreu um erro'})
            }
        } catch (error) {
            return res.status(400).json({error: 'Ocorreu um erro: '+error})
        }
    }
}
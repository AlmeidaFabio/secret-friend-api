import { RequestHandler } from "express"
import { GetAllPersonsService } from "../../services/personsServices/GetAllService"
import { GetAllPersonsFilter } from "../../types/PersonsFilters"

export class GetAllPersonsController {
    constructor(private service: GetAllPersonsService) {
        this.getAll = this.getAll.bind(this)
    }

    getAll: RequestHandler = async (req, res) => {
        const { event_id, group_id } = req.params
        
        const filters: GetAllPersonsFilter = {
            eventId: parseInt(event_id),
            groupId: parseInt(group_id)
        }
        
        try {
            const persons = await this.service.execute(filters)
            
            return res.status(200).json({persons})
        } catch (error) {
            console.error("Error in GetAllController:", error);

            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
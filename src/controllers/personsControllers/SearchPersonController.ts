import { RequestHandler } from "express";
import { z } from "zod";
import { SearchPersonService } from "../../services/personsServices/SearchService";
import { SearchPersonFilters } from "../../types/PersonsFilters";
import { decryptMatch } from "../../utils/match";
import { GetOnePersonService } from "../../services/personsServices/GetOneService";

export class SearchPersonController {
    constructor(
            private service: SearchPersonService,
            private getOnePerson: GetOnePersonService
        ) {
        this.search = this.search.bind(this)
    }
    search :RequestHandler = async (req, res) => {
        const { event_id } = req.params

        const searchPersonSchema = z.object({
            cpf: z.string().transform(val => val.replace(/\.|-/gm, ''))
        })

        try {
            const query = searchPersonSchema.safeParse(req.query)
            if(!query.success) return res.status(400).json({error: 'Dados inválidos.'})

            const filters: SearchPersonFilters = {
                eventId: parseInt(event_id),
                cpf: query.data.cpf
            }

            const person = await this.service.execute(filters)

            if(person && person.matched) {
                const matchId = decryptMatch(person.matched)

                const getOneFilters = {
                    id: matchId,
                    eventId: parseInt(event_id)
                }
                const personMatched = await this.getOnePerson.execute(getOneFilters)

                if(personMatched) {
                    return res.status(200).json({
                        person: {
                            id: person.id,
                            name: person.name
                        },
                        matched: {
                            id: personMatched.id,
                            name: personMatched.name
                        }
                    })
                }
            }

        } catch (error) {
            return res.status(400).json({error: 'Ocorreu um erro: '+error})
        }
    }
}
import { Router } from "express";
import { getOneEventController } from "../controllers/eventsControllers";
import { searchController } from "../controllers/personsControllers";

const router = Router()

router.get('/ping', (req, res) => res.json({pong: true}))

router.get('/events/:id', getOneEventController.getOne)
router.get('/events/:event_id/search', searchController.search)

export default router
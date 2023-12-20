import { Router } from "express";
import * as auth from "../controllers/Auth";
import { 
    createEventController, 
    deleteEventController, 
    editEventController, 
    getAllEventsController, 
    getOneEventController 
} from "../controllers/eventsControllers";
import { 
    createGroupController,
    deleteGroupController,
    editGroupController,
    getAllGroupsController, 
    getOneGroupController
} from "../controllers/groupsControllers";
import { 
    createPersonController, 
    deletePersonController, 
    editPersonController, 
    getAllPersonsController, 
    getOnePersonController 
} from "../controllers/personsControllers";

const router =  Router()

router.get('/ping', auth.validate, (req, res) => res.json({pong: true, admin: true}))

router.post('/login', auth.login)

router.get('/events', auth.validate, getAllEventsController.getAll)
router.get('/events/:id', auth.validate, getOneEventController.getOne)
router.post('/events', auth.validate, createEventController.create)
router.put('/events/:id', auth.validate, editEventController.edit)
router.delete('/events/:id', auth.validate,  deleteEventController.remove)

router.get('/events/:event_id/groups', auth.validate, getAllGroupsController.getAll)
router.get('/events/:event_id/groups/:id', auth.validate, getOneGroupController.getOne)
router.post('/events/:event_id/groups', auth.validate, createGroupController.create)
router.put('/events/:event_id/groups/:id', auth.validate, editGroupController.edit)
router.delete('/events/:event_id/groups/:id', auth.validate, deleteGroupController.remove)

router.get('/events/:event_id/groups/:group_id/people', auth.validate, getAllPersonsController.getAll)
router.get('/events/:event_id/groups/:group_id/people/:id', auth.validate, getOnePersonController.getOne)
router.post('/events/:event_id/groups/:group_id/people', auth.validate, createPersonController.create)
router.put('/events/:event_id/groups/:group_id/people/:id', auth.validate, editPersonController.edit)
router.delete('/events/:event_id/groups/:group_id/people/:id', auth.validate, deletePersonController.remove)

export default router
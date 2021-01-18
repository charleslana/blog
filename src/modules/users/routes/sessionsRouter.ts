import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import SessionsController from "../controllers/SessionsController";

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().trim().max(50).required(),
        password: Joi.string().min(6).max(50).required()
    }
}, {abortEarly: false}), sessionsController.create);

export default sessionsRouter;


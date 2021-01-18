import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import UsersController from "../controllers/UsersController";
import authenticatedUser from "../../../shared/http/middlewares/authenticatedUser";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', authenticatedUser, usersController.list);

usersRouter.get('/:id', authenticatedUser, celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), usersController.show);

usersRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 _]*$')).trim().min(3).max(50).required(),
        email: Joi.string().email().trim().max(50).required(),
        password: Joi.string().min(6).max(50).required()
    }
}, {abortEarly: false}), usersController.create);

usersRouter.put('/', authenticatedUser, celebrate({
    [Segments.BODY]: {
        name: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 _]*$')).trim().min(3).max(50).required(),
        email: Joi.string().email().trim().max(50).required()
    }
}, {abortEarly: false}), usersController.update);

usersRouter.delete('/:id', authenticatedUser, celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), usersController.delete);

export default usersRouter;
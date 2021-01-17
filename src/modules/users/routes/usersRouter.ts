import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import UsersController from "../controllers/UsersController";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.listUsers);

usersRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), usersController.showUser);

usersRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 _]*$')).trim().min(3).max(50).required(),
        email: Joi.string().email().trim().max(50).required(),
        password: Joi.string().required()
    }
}), usersController.createUser);

usersRouter.put('/', celebrate({
    [Segments.BODY]: {
        id: Joi.number().required(),
        name: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 _]*$')).trim().min(3).max(50).required(),
        email: Joi.string().email().trim().max(50).required()
    }
}), usersController.updateUser);

usersRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), usersController.deleteUser);

export default usersRouter;
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
        password: Joi.string().min(6).max(50).required()
    }
},{abortEarly: false}), usersController.createUser);

usersRouter.put('/', celebrate({
    [Segments.BODY]: {
        id: Joi.number().required(),
        name: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 _]*$')).trim().min(3).max(50).required(),
        email: Joi.string().email().trim().max(50).required()
    }
},{abortEarly: false}), usersController.updateUser);

usersRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), usersController.deleteUser);

usersRouter.put('/password', celebrate({
    [Segments.BODY]: {
        id: Joi.number().required(),
        currentPassword: Joi.string().min(6).max(50).required(),
        newPassword: Joi.string().min(6).max(50).required(),
        passwordConfirmation: Joi.string().valid(Joi.ref('newPassword')).when('newPassword', {
            is: Joi.exist(),
            then: Joi.required()
        })
    }
},{abortEarly: false}), usersController.updateUserPassword);

export default usersRouter;
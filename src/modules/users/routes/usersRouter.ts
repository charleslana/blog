import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import UsersController from "../controllers/UsersController";
import authenticatedUser from "../../../shared/http/middlewares/authenticatedUser";
import restrictedAccessForRoleModOrAdmin from "../../../shared/http/middlewares/restrictedAccessForRoleModOrAdmin";
import restrictedAccessForRoleOnlyAdmin from "../../../shared/http/middlewares/restrictedAccessForRoleOnlyAdmin";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _]*$')).trim().min(3).max(50).required(),
        email: Joi.string().email().trim().max(50).required(),
        password: Joi.string().min(6).max(50).required()
    }
}, {abortEarly: false}), usersController.create);

usersRouter.get('/', authenticatedUser, restrictedAccessForRoleModOrAdmin, usersController.list);

usersRouter.get('/:id', authenticatedUser, restrictedAccessForRoleModOrAdmin, celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), usersController.show);

usersRouter.put('/', authenticatedUser, restrictedAccessForRoleOnlyAdmin, celebrate({
    [Segments.BODY]: {
        id: Joi.number().required(),
        name: Joi.string().pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _]*$')).trim().min(3).max(50).required(),
        email: Joi.string().email().trim().max(50).required()
    }
}, {abortEarly: false}), usersController.update);

usersRouter.delete('/:id', authenticatedUser, restrictedAccessForRoleOnlyAdmin, celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), usersController.delete);

export default usersRouter;
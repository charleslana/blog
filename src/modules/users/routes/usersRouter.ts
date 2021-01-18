import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import UsersController from "../controllers/UsersController";
import authenticatedUser from "../../../shared/http/middlewares/authenticatedUser";
import uploadConfig from '../../../config/upload';
import multer from "multer";

const usersRouter = Router();
const usersController = new UsersController();
const upload = multer(uploadConfig);

usersRouter.get('/', authenticatedUser, usersController.listUsers);

usersRouter.get('/:id', authenticatedUser, celebrate({
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
}, {abortEarly: false}), usersController.createUser);

usersRouter.put('/', authenticatedUser, celebrate({
    [Segments.BODY]: {
        name: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 _]*$')).trim().min(3).max(50).required(),
        email: Joi.string().email().trim().max(50).required()
    }
}, {abortEarly: false}), usersController.updateUser);

usersRouter.delete('/:id', authenticatedUser, celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), usersController.deleteUser);

usersRouter.put('/password', authenticatedUser, celebrate({
    [Segments.BODY]: {
        currentPassword: Joi.string().min(6).max(50).required(),
        newPassword: Joi.string().min(6).max(50).required(),
        passwordConfirmation: Joi.string().valid(Joi.ref('newPassword')).when('newPassword', {
            is: Joi.exist(),
            then: Joi.required()
        })
    }
}, {abortEarly: false}), usersController.updateUserPassword);

usersRouter.patch(
    '/avatar',
    authenticatedUser,
    upload.single('avatar'),
    usersController.updateUserAvatar
);

export default usersRouter;
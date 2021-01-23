import {Router} from "express";
import authenticatedUser from "../../../shared/http/middlewares/authenticatedUser";
import {celebrate, Joi, Segments} from "celebrate";
import PasswordController from "../controllers/PasswordController";

const passwordRouter = Router();
const passwordController = new PasswordController();

passwordRouter.put('/', authenticatedUser, celebrate({
    [Segments.BODY]: {
        currentPassword: Joi.string().min(6).max(50).required(),
        newPassword: Joi.string().min(6).max(50).required(),
        passwordConfirmation: Joi.string().valid(Joi.ref('newPassword')).when('newPassword', {
            is: Joi.exist(),
            then: Joi.required()
        })
    }
}, {abortEarly: false}), passwordController.update);

export default passwordRouter;
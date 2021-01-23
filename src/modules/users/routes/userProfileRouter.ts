import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import UserProfileController from "../controllers/UserProfileController";
import authenticatedUser from "../../../shared/http/middlewares/authenticatedUser";

const userProfileRouter = Router();
const userProfileController = new UserProfileController();

userProfileRouter.get('/', authenticatedUser, userProfileController.show);

userProfileRouter.put('/', authenticatedUser, celebrate({
    [Segments.BODY]: {
        name: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 _]*$')).trim().min(3).max(50).required(),
        email: Joi.string().email().trim().max(50).required()
    }
}, {abortEarly: false}), userProfileController.update);

export default userProfileRouter;
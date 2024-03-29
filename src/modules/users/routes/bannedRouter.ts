import {Router} from "express";
import authenticatedUser from "../../../shared/http/middlewares/authenticatedUser";
import {celebrate, Joi, Segments} from "celebrate";
import BannedController from "../controllers/BannedController";
import UsersBannedEnum from "../enumerations/UsersBannedEnum";
import restrictedAccessForRoleOnlyAdmin from "../../../shared/http/middlewares/restrictedAccessForRoleOnlyAdmin";

const bannedRouter = Router();
const bannedController = new BannedController();

bannedRouter.put('/', authenticatedUser, restrictedAccessForRoleOnlyAdmin, celebrate({
    [Segments.BODY]: {
        id: Joi.number().required(),
        banned: Joi.string().valid(...Object.values(UsersBannedEnum)).required()
    }
}, {abortEarly: false}), bannedController.update);

export default bannedRouter;
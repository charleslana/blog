import {Router} from "express";
import authenticatedUser from "../../../shared/http/middlewares/authenticatedUser";
import {celebrate, Joi, Segments} from "celebrate";
import BannedController from "../controllers/BannedController";
import roleRouter from "./roleRouter";
import UsersBannedEnum from "../enumerates/UsersBannedEnum";

const bannedRouter = Router();
const bannedController = new BannedController();

roleRouter.put('/banned', authenticatedUser, celebrate({
    [Segments.BODY]: {
        id: Joi.number().required(),
        banned: Joi.string().valid(...Object.values(UsersBannedEnum)).required()
    }
}, {abortEarly: false}), bannedController.update);

export default bannedRouter;
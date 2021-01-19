import {Router} from "express";
import authenticatedUser from "../../../shared/http/middlewares/authenticatedUser";
import {celebrate, Joi, Segments} from "celebrate";
import RoleController from "../controllers/RoleController";

const roleRouter = Router();
const roleController = new RoleController();

roleRouter.put('/role', authenticatedUser, celebrate({
    [Segments.BODY]: {
        id: Joi.number().required(),
        role: Joi.string().required()
    }
}, {abortEarly: false}), roleController.update);

export default roleRouter;
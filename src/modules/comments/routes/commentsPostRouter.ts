import {celebrate, Joi, Segments} from "celebrate";
import {Router} from "express";
import CommentsPostController from "../controllers/CommentsPostController";
import authenticatedUser from "../../../shared/http/middlewares/authenticatedUser";

const commentsPostRouter = Router();
const commentPostController = new CommentsPostController();

commentsPostRouter.get('/:postId', celebrate({
    [Segments.PARAMS]: {
        postId: Joi.number().required()
    }
}), commentPostController.list);

commentsPostRouter.put('/', authenticatedUser, celebrate({
    [Segments.BODY]: {
        id: Joi.number().required(),
        message: Joi.string().pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _.]*$')).trim().min(1).max(1000)
            .required(),
    }
}, {abortEarly: false}), commentPostController.update);

export default commentsPostRouter;
import {Router} from "express";
import CommentsController from "../controllers/CommentsController";
import authenticatedUser from "../../../shared/http/middlewares/authenticatedUser";
import {celebrate, Joi, Segments} from "celebrate";

const commentsRouter = Router();
const commentController = new CommentsController();

commentsRouter.post('/', authenticatedUser, celebrate({
    [Segments.BODY]: {
        message: Joi.string().pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _.]*$')).trim().min(1).max(1000)
            .required(),
        postId: Joi.number().required()
    }
}, {abortEarly: false}), commentController.create);

commentsRouter.get('/', commentController.list);

export default commentsRouter;
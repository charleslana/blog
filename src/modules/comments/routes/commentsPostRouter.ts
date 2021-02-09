import {celebrate, Joi, Segments} from "celebrate";
import {Router} from "express";
import CommentsPostController from "../controllers/CommentsPostController";
import authenticatedUser from "../../../shared/http/middlewares/authenticatedUser";

const commentsPostRouter = Router();
const commentPostController = new CommentsPostController();

commentsPostRouter.get('/:postId', celebrate({
    [Segments.PARAMS]: {
        postId: Joi.number().required(),
    },
    [Segments.QUERY]: {
        page: Joi.number(),
        per_page: Joi.number().equal(15)
    }
}, {abortEarly: false}), commentPostController.list);

commentsPostRouter.put('/', authenticatedUser, celebrate({
    [Segments.BODY]: {
        id: Joi.number().required(),
        message: Joi.string().pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _.]*$')).trim().min(1).max(1000)
            .required(),
    }
}, {abortEarly: false}), commentPostController.update);

commentsPostRouter.delete('/:id', authenticatedUser, celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), commentPostController.delete);

export default commentsPostRouter;
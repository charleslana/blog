import {Router} from "express";
import CommentsController from "../controllers/CommentsController";
import authenticatedUser from "../../../shared/http/middlewares/authenticatedUser";
import {celebrate, Joi, Segments} from "celebrate";
import restrictedAccessForRoleModOrAdmin from "../../../shared/http/middlewares/restrictedAccessForRoleModOrAdmin";

const commentsRouter = Router();
const commentController = new CommentsController();

commentsRouter.post('/', authenticatedUser, celebrate({
    [Segments.BODY]: {
        message: Joi.string().pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _.]*$')).trim().min(1).max(1000)
            .required(),
        postId: Joi.number().required()
    }
}, {abortEarly: false}), commentController.create);

commentsRouter.get('/', authenticatedUser, restrictedAccessForRoleModOrAdmin, commentController.list);

commentsRouter.get('/:id', authenticatedUser, restrictedAccessForRoleModOrAdmin, celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), commentController.show);

commentsRouter.put('/', authenticatedUser, restrictedAccessForRoleModOrAdmin, celebrate({
    [Segments.BODY]: {
        id: Joi.number().required(),
        message: Joi.string().pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _.]*$')).trim().min(1).max(1000)
            .required(),
    }
}, {abortEarly: false}), commentController.update);

commentsRouter.delete('/:id', authenticatedUser, restrictedAccessForRoleModOrAdmin, celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), commentController.delete);

export default commentsRouter;
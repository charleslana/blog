import {Router} from "express";
import PostsController from "../controllers/PostsController";
import {celebrate, Joi, Segments} from "celebrate";
import PostsCommentsEnum from "../enumerations/PostsCommentsEnum";
import authenticatedUser from "../../../shared/http/middlewares/authenticatedUser";
import restrictedAccessForRoleModOrAdmin from "../../../shared/http/middlewares/restrictedAccessForRoleModOrAdmin";
import PostsVisibilityEnum from "../enumerations/PostsVisibilityEnum";
import restrictedAccessForRoleOnlyAdmin from "../../../shared/http/middlewares/restrictedAccessForRoleOnlyAdmin";
import PostsCategoryEnum from "../enumerations/PostsCategoryEnum";

const postsRouter = Router();
const postController = new PostsController();

postsRouter.post('/', authenticatedUser, restrictedAccessForRoleModOrAdmin, celebrate({
    [Segments.BODY]: {
        title: Joi.string().pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _.]*$')).trim().min(1).max(255)
            .required(),
        description: Joi.string().pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _.]*$')).trim().min(1).max(10000)
            .required(),
        category: Joi.string().valid(...Object.values(PostsCategoryEnum)).required(),
        comments: Joi.string().valid(...Object.values(PostsCommentsEnum)).required()
    }
}, {abortEarly: false}), postController.create);

postsRouter.get('/', celebrate({
    [Segments.QUERY]: {
        page: Joi.number(),
        per_page: Joi.number().equal(15)
    }
}, {abortEarly: false}), postController.list);

postsRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), postController.show);

postsRouter.put('/', authenticatedUser, restrictedAccessForRoleModOrAdmin, celebrate({
    [Segments.BODY]: {
        id: Joi.number().required(),
        title: Joi.string().pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _.]*$')).trim().min(1).max(255)
            .required(),
        description: Joi.string().pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _.]*$')).trim().min(1).max(10000)
            .required(),
        visibility: Joi.string().valid(...Object.values(PostsVisibilityEnum)).required(),
        comments: Joi.string().valid(...Object.values(PostsCommentsEnum)).required()
    }
}, {abortEarly: false}), postController.update);

postsRouter.delete('/:id', authenticatedUser, restrictedAccessForRoleOnlyAdmin, celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    }
}), postController.delete);

postsRouter.post('/filter', celebrate({
    [Segments.BODY]: {
        text: Joi.string().pattern(new RegExp('^[a-zA-ZÀ-ú0-9 _.]*$')).trim().min(1).max(255)
            .required().allow('')
    }
}), postController.filter);

export default postsRouter;
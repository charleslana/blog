import {celebrate, Joi, Segments} from "celebrate";
import {Router} from "express";
import CommentsPostController from "../controllers/CommentsPostController";

const commentsPostRouter = Router();
const commentPostController = new CommentsPostController();

commentsPostRouter.get('/:postId', celebrate({
    [Segments.PARAMS]: {
        postId: Joi.number().required()
    }
}), commentPostController.list);

export default commentsPostRouter;
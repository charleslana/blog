import {Request, Response} from "express";
import CreateCommentService from "../services/CreateCommentService";
import AppSuccessInterface from "../../../shared/success/interface/AppSuccessInterface";
import {classToPlain} from "class-transformer";
import ListCommentService from "../services/ListCommentService";

class CommentsController {

    public async create(request: Request, response: Response): Promise<Response> {

        const {message, postId} = request.body;
        const createComment = new CreateCommentService();

        const comment = await createComment.execute({
            id: request.user.id,
            message,
            postId
        }) as AppSuccessInterface;

        return response.status(comment.statusCode).json(comment);
    }

    public async list(request: Request, response: Response): Promise<Response> {

        const listComments = new ListCommentService();
        const posts = await listComments.execute();

        return response.json(classToPlain(posts));
    }
}

export default CommentsController;
import {Request, Response} from "express";
import CreateCommentService from "../services/CreateCommentService";
import AppSuccessInterface from "../../../shared/success/interface/AppSuccessInterface";

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
}

export default CommentsController;
import {Request, Response} from "express";
import CreateCommentService from "../services/CreateCommentService";
import AppSuccessInterface from "../../../shared/success/interface/AppSuccessInterface";
import {classToPlain} from "class-transformer";
import ListCommentService from "../services/ListCommentService";
import ShowCommentService from "../services/ShowCommentService";
import UpdateCommentService from "../services/UpdateCommentService";
import DeleteCommentService from "../services/DeleteCommentService";

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

    public async show(request: Request, response: Response): Promise<Response> {

        const {id} = request.params;

        const showComment = new ShowCommentService();
        const comment = await showComment.execute(parseInt(id));

        return response.json(classToPlain(comment));
    }

    public async update(request: Request, response: Response): Promise<Response> {

        const {id, message} = request.body;
        const updateComment = new UpdateCommentService();

        const post = await updateComment.execute({
            id,
            message
        }) as AppSuccessInterface;

        return response.json(post);
    }

    public async delete(request: Request, response: Response): Promise<Response> {

        const {id} = request.params;

        const deleteComment = new DeleteCommentService();
        const comment = await deleteComment.execute(parseInt(id)) as AppSuccessInterface;

        return response.json(comment);
    }
}

export default CommentsController;
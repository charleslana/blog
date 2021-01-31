import {Request, Response} from "express";
import ListCommentPostService from "../services/ListCommentPostService";
import {classToPlain} from "class-transformer";
import AppSuccessInterface from "../../../shared/success/interface/AppSuccessInterface";
import UpdateCommentPostService from "../services/UpdateCommentPostService";
import DeleteCommentPostService from "../services/DeleteCommentPostService";

class CommentsPostController {

    public async list(request: Request, response: Response): Promise<Response> {

        const {postId} = request.params;

        const listCommentPost = new ListCommentPostService();
        const comment = await listCommentPost.execute(parseInt(postId));

        return response.json(classToPlain(comment));
    }

    public async update(request: Request, response: Response): Promise<Response> {

        const {id, message} = request.body;
        const updateComment = new UpdateCommentPostService();

        const post = await updateComment.execute({
            id,
            userId: request.user.id,
            message
        }) as AppSuccessInterface;

        return response.json(post);
    }

    public async delete(request: Request, response: Response): Promise<Response> {

        const {id} = request.params;

        const deleteComment = new DeleteCommentPostService();
        const comment = await deleteComment.execute(parseInt(id), request.user.id) as AppSuccessInterface;

        return response.json(comment);
    }
}

export default CommentsPostController;
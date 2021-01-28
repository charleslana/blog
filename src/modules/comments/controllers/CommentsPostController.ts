import {Request, Response} from "express";
import ListCommentPostService from "../services/ListCommentPostService";
import {classToPlain} from "class-transformer";

class CommentsPostController {

    public async list(request: Request, response: Response): Promise<Response> {

        const {postId} = request.params;

        const listCommentPost = new ListCommentPostService();
        const comment = await listCommentPost.execute(parseInt(postId));

        return response.json(classToPlain(comment));
    }
}

export default CommentsPostController;
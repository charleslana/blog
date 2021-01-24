import {Request, Response} from "express";
import CreatePostService from "../services/CreatePostService";
import AppSuccessInterface from "../../../shared/success/interface/AppSuccessInterface";
import ListPostService from "../services/ListPostService";
import {classToPlain} from "class-transformer";

class PostsController {

    public async create(request: Request, response: Response): Promise<Response> {

        const {title, description, comments} = request.body;
        const createPost = new CreatePostService();

        const post = await createPost.execute({
            id: request.user.id,
            title,
            description,
            comments
        }) as AppSuccessInterface;

        return response.status(post.statusCode).json(post);
    }

    public async list(request: Request, response: Response): Promise<Response> {

        const listPosts = new ListPostService();
        const posts = await listPosts.execute();

        return response.json(classToPlain(posts));
    }
}

export default PostsController;
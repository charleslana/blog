import {Request, Response} from "express";
import CreatePostService from "../services/CreatePostService";
import AppSuccessInterface from "../../../shared/success/interface/AppSuccessInterface";
import ListPostService from "../services/ListPostService";
import {classToPlain} from "class-transformer";
import ShowPostService from "../services/ShowPostService";
import UpdatePostService from "../services/UpdatePostService";
import DeletePostService from "../services/DeletePostService";
import FilterPostService from "../services/FilterPostService";

class PostsController {

    public async create(request: Request, response: Response): Promise<Response> {

        const {title, description, category, comments} = request.body;
        const createPost = new CreatePostService();

        const post = await createPost.execute({
            id: request.user.id,
            title,
            description,
            category,
            comments
        }) as AppSuccessInterface;

        return response.status(post.statusCode).json(post);
    }

    public async list(request: Request, response: Response): Promise<Response> {

        const listPosts = new ListPostService();
        const posts = await listPosts.execute();

        return response.json(classToPlain(posts));
    }

    public async show(request: Request, response: Response): Promise<Response> {

        const {id} = request.params;

        const showPost = new ShowPostService();
        const post = await showPost.execute(parseInt(id));

        return response.json(classToPlain(post));
    }

    public async update(request: Request, response: Response): Promise<Response> {

        const {id, title, description, visibility, comments} = request.body;
        const updatePost = new UpdatePostService();

        const post = await updatePost.execute({
            id,
            title,
            description,
            visibility,
            comments
        }) as AppSuccessInterface;

        return response.json(post);
    }

    public async delete(request: Request, response: Response): Promise<Response> {

        const {id} = request.params;

        const deletePost = new DeletePostService();
        const post = await deletePost.execute(parseInt(id)) as AppSuccessInterface;

        return response.json(post);
    }

    public async filter(request: Request, response: Response): Promise<Response> {

        const {text} = request.body;
        const filterPosts = new FilterPostService();
        const posts = await filterPosts.execute(text);

        return response.json(classToPlain(posts));
    }
}

export default PostsController;
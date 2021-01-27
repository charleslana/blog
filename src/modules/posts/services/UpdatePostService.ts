import UpdatePostInterface from "../interfaces/UpdatePostInterface";
import {getCustomRepository} from "typeorm";
import PostsRepository from "../typeorm/repositories/PostsRepository";
import AppSuccess from "../../../shared/success/AppSuccess";
import AppError from "../../../shared/errors/AppError";

class UpdatePostService {

    public async execute({id, title, description, visibility, comments}: UpdatePostInterface): Promise<Object> {

        const postRepository = getCustomRepository(PostsRepository);
        const post = await postRepository.findOne(id);

        if (!post) {
            throw new AppError('Post not found.');
        }

        post.title = title;
        post.description = description;
        post.visibility = visibility;
        post.comments = comments;

        await postRepository.save(post);

        return new AppSuccess('Post updated successfully.');
    }

}

export default UpdatePostService;
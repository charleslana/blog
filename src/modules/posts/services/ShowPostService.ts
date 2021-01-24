import {getCustomRepository} from "typeorm";
import AppError from "../../../shared/errors/AppError";
import PostsRepository from "../typeorm/repositories/PostsRepository";
import Post from "../typeorm/entities/Post";

class ShowPostService {

    public async execute(id: number): Promise<Post | undefined> {

        const postRepository = getCustomRepository(PostsRepository);

        const post = await postRepository.findById(id);

        if (!post) {
            throw new AppError('Post not found.');
        }

        return post;
    }
}

export default ShowPostService;
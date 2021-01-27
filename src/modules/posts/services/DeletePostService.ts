import {getCustomRepository} from "typeorm";
import AppError from "../../../shared/errors/AppError";
import AppSuccess from "../../../shared/success/AppSuccess";
import PostsRepository from "../typeorm/repositories/PostsRepository";

class DeletePostService {

    public async execute(id: number): Promise<Object> {

        const postRepository = getCustomRepository(PostsRepository);
        const post = await postRepository.findOne(id);

        if (!post) {
            throw new AppError('Post not found.');
        }

        await postRepository.remove(post);

        return new AppSuccess('Post deleted successfully.', 204);
    }
}

export default DeletePostService;
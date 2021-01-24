import CreatePostInterface from "../interfaces/CreatePostInterface";
import {getCustomRepository} from "typeorm";
import PostsRepository from "../typeorm/repositories/PostsRepository";
import UsersRepository from "../../users/typeorm/repositories/UsersRepository";
import AppSuccess from "../../../shared/success/AppSuccess";

class CreatePostService {

    public async execute({id, title, description, comments}: CreatePostInterface): Promise<Object> {

        const postRepository = getCustomRepository(PostsRepository);
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne(id);

        const post = postRepository.create({
            title,
            description,
            comments,
            user
        });

        await postRepository.save(post);

        return new AppSuccess('Post created successfully.', 201);
    }
}

export default CreatePostService;
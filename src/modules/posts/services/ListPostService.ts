import {getCustomRepository} from "typeorm";
import PostsRepository from "../typeorm/repositories/PostsRepository";
import PaginatePostInterface from "../interfaces/PaginatePostInterface";

class ListPostService {

    public async execute(): Promise<PaginatePostInterface> {

        const postRepository = getCustomRepository(PostsRepository);

        return await postRepository.findAllPerPage();
    }
}

export default ListPostService;
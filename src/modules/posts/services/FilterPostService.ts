import {getCustomRepository} from "typeorm";
import PostsRepository from "../typeorm/repositories/PostsRepository";
import PaginatePostInterface from "../interfaces/PaginatePostInterface";

class FilterPostService {

    public async execute(text: string): Promise<PaginatePostInterface> {

        const postRepository = getCustomRepository(PostsRepository);

        return await postRepository.filterPerPage(text);
    }
}

export default FilterPostService;
import {getCustomRepository} from "typeorm";
import CommentsRepository from "../typeorm/repositories/CommentsRepository";
import PaginateCommentInterface from "../interfaces/PaginateCommentInterface";

class ListCommentPostService {

    public async execute(postId: number): Promise<PaginateCommentInterface> {

        const commentRepository = getCustomRepository(CommentsRepository);

        return await commentRepository.findByPostIdPerPage(postId);
    }
}

export default ListCommentPostService;
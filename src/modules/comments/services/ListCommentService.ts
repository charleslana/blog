import {getCustomRepository} from "typeorm";
import PaginateCommentInterface from "../interfaces/PaginateCommentInterface";
import CommentsRepository from "../typeorm/repositories/CommentsRepository";

class ListCommentService {

    public async execute(): Promise<PaginateCommentInterface> {

        const commentRepository = getCustomRepository(CommentsRepository);

        return await commentRepository.findAllPerPage();
    }
}

export default ListCommentService;
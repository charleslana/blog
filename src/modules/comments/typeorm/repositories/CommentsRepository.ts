import {EntityRepository, Repository} from "typeorm";
import Comment from "../entities/Comment";
import PaginateCommentInterface from "../../interfaces/PaginateCommentInterface";

@EntityRepository(Comment)
class CommentsRepository extends Repository<Comment>{

    public async findAllPerPage(): Promise<PaginateCommentInterface> {

        return await this.createQueryBuilder('comments')
            .select(['comments', 'user.name', 'user.avatar', 'post'])
            .leftJoin('comments.user', 'user')
            .leftJoin('comments.post', 'post')
            .paginate() as PaginateCommentInterface;
    }

    public async findById(id: number): Promise<Comment | undefined> {

        return await this.createQueryBuilder('comments')
            .select(['comments', 'user.name', 'user.avatar', 'post'])
            .leftJoin('comments.user', 'user')
            .leftJoin('comments.post', 'post')
            .where({id})
            .getOne()
    }

    public async findByPostIdPerPage(postId: number): Promise<PaginateCommentInterface> {

        return await this.createQueryBuilder('comments')
            .select(['comments', 'user.name', 'user.avatar', 'post'])
            .leftJoin('comments.user', 'user')
            .leftJoin('comments.post', 'post')
            .where({
                'post': postId
            })
            .paginate() as PaginateCommentInterface;
    }
}

export default CommentsRepository;
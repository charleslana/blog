import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import PostsVisibilityEnum from "../../enumerations/PostsVisibilityEnum";
import PostsCommentsEnum from "../../enumerations/PostsCommentsEnum";
import User from "../../../users/typeorm/entities/User";
import Comment from "../../../comments/typeorm/entities/Comment";
import PostsCategoryEnum from "../../enumerations/PostsCategoryEnum";

@Entity('posts')
class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: PostsCategoryEnum
    })
    category: PostsCategoryEnum;

    @Column({
        type: "enum",
        enum: PostsVisibilityEnum,
        default: PostsVisibilityEnum.YES
    })
    visibility: PostsVisibilityEnum;

    @Column({
        type: "enum",
        enum: PostsCommentsEnum
    })
    comments: PostsCommentsEnum;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: 'user_id'})
    user: User;

    @OneToMany(() => Comment, comments_post => comments_post.post)
    comments_post: Comment[];
}

export default Post;
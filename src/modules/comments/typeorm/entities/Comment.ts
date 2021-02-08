import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import User from "../../../users/typeorm/entities/User";
import Post from "../../../posts/typeorm/entities/Post";

@Entity('comments')
class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Post)
    @JoinColumn({name: 'post_id'})
    post: Post;
}

export default Comment;
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Exclude, Expose} from "class-transformer";
import UsersEnum from "./enumerates/UsersEnum";

@Entity('users')
class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Exclude({toPlainOnly: true})
    @Column()
    password: string;

    @Exclude({toPlainOnly: true})
    @Column({nullable: true})
    avatar: string;

    @Column({
        type: "enum",
        enum: UsersEnum,
        default: UsersEnum.USER
    })
    role: UsersEnum;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({name: 'avatar_url'})
    getAvatarUrl(): string | null {
        if (!this.avatar) {
            return null;
        }

        return `${process.env.APP_API_URL}/files/${this.avatar}`;
    }
}

export default User;
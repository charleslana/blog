import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Exclude, Expose} from "class-transformer";
import UsersRoleEnum from "../../enumerations/UsersRoleEnum";
import UsersBannedEnum from "../../enumerations/UsersBannedEnum";

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
        enum: UsersRoleEnum,
        default: UsersRoleEnum.USER
    })
    role: UsersRoleEnum;

    @Column({
        type: "enum",
        enum: UsersBannedEnum,
        default: UsersBannedEnum.NO
    })
    banned: UsersBannedEnum;

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
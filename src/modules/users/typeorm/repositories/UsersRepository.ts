import {EntityRepository, Repository} from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
class UsersRepository extends Repository<User> {

    public async findByName(name: string): Promise<User | undefined> {

        return await this.findOne({
            where: {
                name
            }
        });
    }

    public async findByEmail(email: string): Promise<User | undefined> {

        return await this.findOne({
            where: {
                email
            }
        });
    }
}

export default UsersRepository;
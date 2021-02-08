import {MigrationInterface, QueryRunner, Table} from "typeorm";
import UsersRoleEnum from "../../../modules/users/enumerations/UsersRoleEnum";
import UsersBannedEnum from "../../../modules/users/enumerations/UsersBannedEnum";

export class CreateUsers1610812822840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar'
                },
                {
                    name: 'avatar',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'role',
                    type: 'enum',
                    enum: [
                        UsersRoleEnum.ADMIN,
                        UsersRoleEnum.MOD,
                        UsersRoleEnum.USER
                    ]
                },
                {
                    name: 'banned',
                    type: 'enum',
                    enum: [
                        UsersBannedEnum.NO,
                        UsersBannedEnum.YES
                    ]
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}

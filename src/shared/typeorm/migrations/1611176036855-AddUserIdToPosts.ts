import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserIdToPosts1611176036855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'posts',
            new TableColumn({
                name: 'user_id',
                type: 'int'
            })
        );

        await queryRunner.createForeignKey(
            'posts',
            new TableForeignKey({
                name: 'PostsUser',
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('posts', 'PostsUser');
        await queryRunner.dropColumn('posts', 'user_id');
    }

}

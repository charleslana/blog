import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddPostIdAndUserIdToComments1611179012322 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'comments',
            new TableColumn({
                name: 'post_id',
                type: 'int'
            })
        );

        await queryRunner.addColumn(
            'comments',
            new TableColumn({
                name: 'user_id',
                type: 'int'
            })
        );

        await queryRunner.createForeignKey(
            'comments',
            new TableForeignKey({
                name: 'CommentsPost',
                columnNames: ['post_id'],
                referencedTableName: 'posts',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        );

        await queryRunner.createForeignKey(
            'comments',
            new TableForeignKey({
                name: 'CommentsUser',
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('comments', 'CommentsPost');
        await queryRunner.dropColumn('comments', 'post_id');
        await queryRunner.dropForeignKey('comments', 'CommentsUser');
        await queryRunner.dropColumn('comments', 'user_id');
    }

}

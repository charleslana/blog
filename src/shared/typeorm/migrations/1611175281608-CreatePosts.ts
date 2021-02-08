import {MigrationInterface, QueryRunner, Table} from "typeorm";
import PostsCategoryEnum from "../../../modules/posts/enumerations/PostsCategoryEnum";
import PostsVisibilityEnum from "../../../modules/posts/enumerations/PostsVisibilityEnum";
import PostsCommentsEnum from "../../../modules/posts/enumerations/PostsCommentsEnum";

export class CreatePosts1611175281608 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'posts',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'text'
                },
                {
                    name: 'category',
                    type: 'enum',
                    enum: [
                        PostsCategoryEnum.ANGULAR,
                        PostsCategoryEnum.JAVA,
                        PostsCategoryEnum.JAVASCRIPT,
                        PostsCategoryEnum.LINUX,
                        PostsCategoryEnum.OTHERS,
                        PostsCategoryEnum.REACT,
                        PostsCategoryEnum.TYPESCRIPT,
                        PostsCategoryEnum.VUE
                    ]
                },
                {
                    name: 'visibility',
                    type: 'enum',
                    enum: [
                        PostsVisibilityEnum.NO,
                        PostsVisibilityEnum.YES
                    ]
                },
                {
                    name: 'comments',
                    type: 'enum',
                    enum: [
                        PostsCommentsEnum.NO,
                        PostsCommentsEnum.YES
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
        await queryRunner.dropTable('posts');
    }

}

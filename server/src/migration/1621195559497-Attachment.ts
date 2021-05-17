import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Attachment1621195559497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "attachment",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "todoId",
                    type: "int",
                },
                {
                    name: "link",
                    type: 'varchar'
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("attachment");
    }
}
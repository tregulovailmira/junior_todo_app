import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class User1621195568248 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                  name: "email",
                  type: "varchar",
                  isUnique: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "roleId",
                    type: "int"
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}

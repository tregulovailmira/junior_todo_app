import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class Refences1621203104065 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("attachment", new TableForeignKey({
            columnNames: ["todoId"],
            referencedColumnNames: ["id"],
            referencedTableName: "todo",
            onDelete: "CASCADE",
            onUpdate: 'CASCADE',
        }))

        await queryRunner.createForeignKey("user", new TableForeignKey({
            columnNames: ["roleId"],
            referencedColumnNames: ["id"],
            referencedTableName: "role",
            onDelete: "CASCADE",
            onUpdate: 'CASCADE',
        }))

        await queryRunner.createForeignKey("todo", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE",
            onUpdate: 'CASCADE',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const attachmentTable = await queryRunner.getTable("attachment");
        const attachmentTableForeignKey = attachmentTable.foreignKeys.find(fk => fk.columnNames.indexOf("todoId") !== -1);
        await queryRunner.dropForeignKey("attachment", attachmentTableForeignKey);

        const userTable = await queryRunner.getTable("user");
        const userTableForeignKey = userTable.foreignKeys.find(fk => fk.columnNames.indexOf("roleId") !== -1);
        await queryRunner.dropForeignKey("user", userTableForeignKey);

        const todoTable = await queryRunner.getTable("todo");
        const todoTableForeignKey = todoTable.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        await queryRunner.dropForeignKey("todo", todoTableForeignKey);

    }

}

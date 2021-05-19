import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Todo1621195574315 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'todo',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'header',
            type: 'varchar',
          },
          {
            name: 'body',
            type: 'varchar',
          },
          {
            name: 'userId',
            type: 'int',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('todo');
  }
}

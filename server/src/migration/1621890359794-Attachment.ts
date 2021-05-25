import { MigrationInterface, QueryRunner } from 'typeorm';

export class Attachment1621890359794 implements MigrationInterface {
  name = 'Attachment1621890359794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "attachment" ("id" SERIAL NOT NULL, "link" character varying NOT NULL, "todoId" integer NOT NULL, "filePath" character varying NOT NULL, CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "attachment" ADD CONSTRAINT "FK_8802f8b09f852588593ed105493" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attachment" DROP CONSTRAINT "FK_8802f8b09f852588593ed105493"`,
    );
    await queryRunner.query(`DROP TABLE "attachment"`);
  }
}

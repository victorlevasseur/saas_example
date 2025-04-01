import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomer1743419822738 implements MigrationInterface {
    name = 'CreateCustomer1743419822738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "publicName" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_customer_unique_name" ON "customer" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_customer_unique_name"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AdicionaSenhaTabelaUser1723039529112 implements MigrationInterface {
    name = 'AdicionaSenhaTabelaUser1723039529112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "senha" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "senha"`);
    }

}

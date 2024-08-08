import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabelaPedidos1723052477536 implements MigrationInterface {
    name = 'CriaTabelaPedidos1723052477536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "valor_total" numeric NOT NULL, "status" character varying(50) NOT NULL, CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pedidos"`);
    }

}

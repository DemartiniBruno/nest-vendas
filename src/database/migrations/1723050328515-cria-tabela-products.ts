import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabelaProducts1723050328515 implements MigrationInterface {
    name = 'CriaTabelaProducts1723050328515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gtin" character varying NOT NULL, "nome" character varying NOT NULL, "valor" numeric NOT NULL, "quantidade_disponivel" numeric NOT NULL, "descricao" character varying, "categoria" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}

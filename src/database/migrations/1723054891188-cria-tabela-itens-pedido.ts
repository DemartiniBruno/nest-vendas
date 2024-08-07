import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabelaItensPedido1723054891188 implements MigrationInterface {
    name = 'CriaTabelaItensPedido1723054891188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_2666c9308d54449b0e3cb552b2a"`);
        await queryRunner.query(`CREATE TABLE "itens_pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" numeric NOT NULL, "preco-venda" numeric NOT NULL, "pedidoId" uuid, CONSTRAINT "PK_d93e780d333fe5d91e43797e8b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "quantidade"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "preco-venda"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP COLUMN "pedidoId"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_aaa757efbf4f9fb222709a140b2" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_aaa757efbf4f9fb222709a140b2"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "pedidoId" uuid`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "preco-venda" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD "quantidade" numeric NOT NULL`);
        await queryRunner.query(`DROP TABLE "itens_pedidos"`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_2666c9308d54449b0e3cb552b2a" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

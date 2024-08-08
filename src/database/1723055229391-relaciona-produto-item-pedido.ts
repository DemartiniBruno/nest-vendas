import { MigrationInterface, QueryRunner } from "typeorm";

export class RelacionaProdutoItemPedido1723055229391 implements MigrationInterface {
    name = 'RelacionaProdutoItemPedido1723055229391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_714f2222ff9e6370a7766402663" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_714f2222ff9e6370a7766402663"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP COLUMN "productId"`);
    }

}

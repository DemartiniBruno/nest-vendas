import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./pedido.entity";
import { Product } from "../../product/entities/product.entity";

@Entity({name:'itens_pedidos'})
export class ItensPedido {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({name: 'quantidade', type:'numeric'})
    quantidade:number;

    @Column({name:'preco-venda', type:'numeric'})
    precoVenda:number;

    // pedidoFK
    @ManyToOne(()=>Pedido,(pedido)=>pedido.itensPedido,{
        onDelete: 'CASCADE',
    })
    pedido

    // produtoFK
    @ManyToOne(()=>Product,(product)=>product.itensPedido,{
        cascade: ['update'],
        eager:true
    })
    product
}

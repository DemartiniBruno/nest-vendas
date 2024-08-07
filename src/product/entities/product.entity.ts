import { Collection, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoriaEnum } from "../enum/categoria.enum";
import { ItensPedido } from "../../pedido/entities/itens-pedido.entity";

@Entity({name:'products'})
export class Product {
    
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({name:'gtin', type:'varchar'})
    gtin:string

    @Column({name:'nome', type:'varchar'})
    nome:string

    @Column({name:'valor', type:'numeric'})
    valor:number

    @Column({name:'quantidade_disponivel', type:'numeric'})
    quantidadeDisponivel:number
    
    @Column({name:'descricao', type:'varchar', nullable:true})
    descricao:string

    @Column({name:'categoria', type:'varchar'})
    categoria:CategoriaEnum

    // imagens

    // caracteristicas

    @OneToMany(()=>ItensPedido, (itemPedido)=>itemPedido.product)
    itensPedido
}

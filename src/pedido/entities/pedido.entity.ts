import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItensPedido } from "./itens-pedido.entity";

@Entity({name:'pedidos'})
export class Pedido {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({name: 'valor_total', type:'numeric'})
    valorTotal:number;

    @Column({name:'status', type:'varchar', length:50})
    status:string;

    //usuario
    @ManyToOne(()=>User, (user)=>{user.pedidos})
    user

    // itens pedidos
    @OneToMany(()=>ItensPedido,(itemPedido)=>itemPedido.pedido)
    itensPedido
}

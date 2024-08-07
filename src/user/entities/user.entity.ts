import { Pedido } from "../../pedido/entities/pedido.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({name: 'nome', type:'varchar', length:100})
    nome:string;

    @Column({name:'email', type:'varchar', length:50})
    email:string;

    @Column({name:'senha', type:'varchar', nullable:false})
    senha:string
    // pedidos
    @OneToMany(()=>Pedido, (pedido)=>pedido.user)
    pedidos
}

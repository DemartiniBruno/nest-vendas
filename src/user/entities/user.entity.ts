import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({name: 'nome', type:'varchar', length:100})
    nome:string;

    @Column({name:'email', type:'varchar', length:50})
    email:string;
    // pedidos
}

import { Collection, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CategoriaEnum } from "../enum/categoria.enum";

@Entity({name:'products'})
export class Product {
    
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({name:'nome', type:'varchar'})
    nome:string

    @Column({name:'valor', type:'numeric'})
    valor:number

    @Column({name:'quantidade', type:'numeric'})
    quantidadeDisponivel:number
    
    @Column({name:'descricao', type:'varchar'})
    descricao:string

    @Column({name:'descricao', type:'varchar'})
    categoria:CategoriaEnum

    // imagens

    // caracteristicas
}

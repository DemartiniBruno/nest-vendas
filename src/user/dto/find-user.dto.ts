import { IsEmail, IsNotEmpty, IsUUID, MinLength } from "class-validator";

export class findUserDto {
    
    @IsUUID()
    id:string;

    @IsNotEmpty()
    nome:string;

    constructor(id:string, nome:string){
        this.id=id
        this.nome=nome
    }

}

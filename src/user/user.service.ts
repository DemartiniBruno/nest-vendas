import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { findUserDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    const createdUser:User = await this.userRepository.save(createUserDto);
    return createdUser
  }

  async findAll() {
    const findedUsers: User[] = await this.userRepository.find({
      select:{
        id: true,
        nome: true,
        email: false,
        senha: false
      }
    });
    return findedUsers;
  }

  async findOne(id: string) {
    const findedUser: User = await this.userRepository.findOneBy({id});
    this.verifyUser(findedUser)
    return findedUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user:User = await this.findOne(id);

    user.nome=updateUserDto.nome;
    user.email=updateUserDto.email;
    user.senha=updateUserDto.senha;

    await this.userRepository.save(user);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const user:User = await this.findOne(id)

    return {
      idUser: id,
      deletedUser: await this.userRepository.remove(user)
    }
  }
  
  verifyUser(user:User){
    if(user===null){
      throw new NotFoundException('Usuário não encontrado')
    }
  }
}

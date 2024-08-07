import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

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
    const findedUsers: User[] = await this.userRepository.find();
    return findedUsers;
  }

  async findOne(id: string) {
    const findedUser: User = await this.userRepository.findOneBy({id});
    return findedUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
  
  verifyUser(user: User){
    if(user===null){
      throw new NotFoundException('Usuário não encontrado')
    }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { findUserDto } from './dto/find-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}



  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  async findAll() {
    const findedUsers = await this.userService.findAll()
    return {
      usuario: findedUsers
    };
  }

  @Get(':client_id')
  async findOne(@Param('client_id') id: string) {
    const user = await this.userService.findOne(id);
    this.userService.verifyUser(user);

    return {
      usuario: new findUserDto(user.id, user.nome)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return {
      message: `Usuário ${id} alterado com sucesso`,
      /* 
        Esse retorno vai trazer todas as informações, por enquanto
      */
      usuario: updatedUser
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

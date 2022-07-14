import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 } from 'uuid';
import { UserDto } from './dto/user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  private users = [];

  getAll() {
    return this.users;
  }

  getById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  create(UserDto: CreateUserDto) {
    const user: UserDto = {
      id: v4(),
      ...UserDto,
      version: 1,
      createAt: Date.now(),
      updateAt: Date.now(),
    };
    this.users.push(user);
    return user;
  }

  update(id: string, UserDto: UpdatePasswordDto) {
    const user = this.getById(id);
    if (user.password === UserDto.oldPassowrd) {
      user.password = UserDto.newPassword;
      const index = this.users.findIndex((u) => u.id === id);
      this.users[index] = user;
      return user;
    } else {
      return null;
    }
  }

  delete(id: string) {
    //const index = this.users.findIndex((user) => user.id === id);
    this.users = this.users.filter((user) => user.id !== id);
  }
}

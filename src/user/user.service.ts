import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 } from 'uuid';
import { UserDto } from './dto/user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  private users = [];

  getAll() {
    const users: UserDto[] = [...this.users];
    return {
      status: HttpStatus.OK,
      data: users.map((e) => {
        delete e.password;
        return e;
      }),
    };
  }

  getById(id: string) {
    const user: UserDto = this.users.find((u) => u.id === id);
    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'This id does not exist' },
      };
    }
    const clearUser = { ...user };
    delete clearUser.password;
    return {
      status: HttpStatus.OK,
      data: clearUser,
    };
  }

  create(UserDto: CreateUserDto) {
    const user: UserDto = {
      id: v4(),
      ...UserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(user);
    const clearUser = { ...user };
    delete clearUser.password;

    return {
      status: HttpStatus.CREATED,
      data: clearUser,
    };
  }

  update(id: string, UserDto: UpdatePasswordDto) {
    const user: UserDto = this.users.find((u) => u.id === id);
    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'This id does not exist' },
      };
    }
    if (user.password !== UserDto.oldPassword) {
      return {
        status: HttpStatus.FORBIDDEN,
        data: { message: 'oldPassword is wrong' },
      };
    }

    user.updatedAt = Date.now();
    user.version = user.version + 1;
    user.password = UserDto.newPassword;
    const index = this.users.findIndex((u) => u.id === id);
    this.users[index] = user;

    const clearUser = { ...user };
    delete clearUser.password;
    return {
      status: HttpStatus.OK,
      data: clearUser,
    };
  }

  delete(id: string) {
    const user: UserDto = this.users.find((u) => u.id === id);
    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'This ID does not exist' },
      };
    }
    this.users = this.users.filter((user) => user.id !== id);
    const clearUser = { ...user };
    delete clearUser.password;
    return {
      status: HttpStatus.NO_CONTENT,
      data: clearUser,
    };
  }
}

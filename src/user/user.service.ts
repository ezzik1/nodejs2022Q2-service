import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4, validate } from 'uuid';
import { UserDto } from './dto/user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Response } from 'express';

@Injectable()
export class UserService {
  private users = [];

  getAll(res: Response) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = HttpStatus.OK;
    const users = [...this.users];
    res.send(
      users.map((e) => {
        delete e.password;
        return e;
      }),
    );
  }

  getById(id: string, res: Response) {
    res.setHeader('Content-Type', 'application/json');
    if (!validate(id)) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.send({ message: 'This id is not valid' });
      return;
    }
    const user: UserDto = this.users.find((u) => u.id === id);
    if (!user) {
      res.statusCode = HttpStatus.NOT_FOUND;
      res.send({ message: 'This id does not exist' });
      return;
    }
    const clearUser = { ...user };
    delete clearUser.password;
    res.statusCode = HttpStatus.OK;
    res.send(clearUser);
  }

  create(UserDto: CreateUserDto, res: Response) {
    res.setHeader('Content-Type', 'application/json');
    if (!UserDto.login || !UserDto.password) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.send({ message: 'login and password are required fields' });
      return;
    }
    const user: UserDto = {
      id: v4(),
      ...UserDto,
      version: 1,
      createAt: Date.now(),
      updateAt: Date.now(),
    };
    this.users.push(user);
    const clearUser = { ...user };
    delete clearUser.password;

    res.statusCode = HttpStatus.OK;
    res.send(clearUser);
  }

  update(id: string, UserDto: UpdatePasswordDto, res: Response) {
    res.setHeader('Content-Type', 'application/json');
    if (!validate(id)) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.send({ message: 'This id is not valid' });
      return;
    }
    if (!UserDto.oldPassword || !UserDto.newPassword) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.send({ message: 'oldPassowrd and newPassword are required fields' });
      return;
    }
    const user: UserDto = this.users.find((u) => u.id === id);
    if (!user) {
      res.statusCode = HttpStatus.NOT_FOUND;
      res.send({ message: 'This id does not exist' });
      return;
    }
    if (user.password !== UserDto.oldPassword) {
      res.statusCode = HttpStatus.FORBIDDEN;
      res.send({ message: 'oldPassword is wrong' });
      return;
    }

    user.updateAt = Date.now();
    user.version = user.version + 1;
    user.password = UserDto.newPassword;
    const index = this.users.findIndex((u) => u.id === id);
    this.users[index] = user;

    const clearUser = { ...user };
    delete clearUser.password;
    res.statusCode = HttpStatus.OK;
    res.send(clearUser);
  }

  delete(id: string, res: Response) {
    res.setHeader('Content-Type', 'application/json');
    if (!validate(id)) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.send({ message: 'This id is not valid' });
      return;
    }
    const user: UserDto = this.users.find((u) => u.id === id);
    if (!user) {
      res.statusCode = HttpStatus.NOT_FOUND;
      res.send({ message: 'This id does not exist' });
      return;
    }
    this.users = this.users.filter((user) => user.id !== id);
    const clearUser = { ...user };
    delete clearUser.password;
    res.statusCode = HttpStatus.NO_CONTENT;
    res.send(clearUser);
  }
}

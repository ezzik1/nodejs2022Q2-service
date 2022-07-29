import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/database/database.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getById(id: string) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { id: id },
        select: {
          id: true,
          login: true,
          version: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      throw new HttpException('This id does not exist', HttpStatus.NOT_FOUND);
    }
  }

  async create(UserDto: CreateUserDto) {
    const user: User = {
      id: v4(),
      ...UserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return this.prisma.user.create({
      data: user,
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, UserDto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new HttpException('This id does not exist', HttpStatus.NOT_FOUND);
    }
    if (user.password !== UserDto.oldPassword) {
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
    }

    user.updatedAt = Date.now();
    user.version = user.version + 1;
    user.password = UserDto.newPassword;
    return this.prisma.user.update({
      data: user,
      where: { id: id },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);
    return this.prisma.user.delete({
      where: { id: id },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}

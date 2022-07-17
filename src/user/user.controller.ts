import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getAll(@Res({ passthrough: true }) res: Response) {
    try {
      const { status, data } = this.userService.getAll();
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  getOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.userService.getById(id);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }

  @Post()
  @Header('Content-Type', 'application/json')
  create(
    @Body() createUser: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.userService.create(createUser);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUser: UpdatePasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.userService.update(id, updateUser);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.userService.delete(id);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }
}

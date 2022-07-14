import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  getAll(@Res() res: Response) {
    this.userService.getAll(res);
  }

  @Get(':id')
  getOne(@Param('id') id: string, @Res() res: Response) {
    return this.userService.getById(id, res);
  }

  @Post()
  create(@Body() createUser: CreateUserDto, @Res() res: Response) {
    return this.userService.create(createUser, res);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUser: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    return this.userService.update(id, updateUser, res);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Res() res: Response) {
    return this.userService.delete(id, res);
  }
}

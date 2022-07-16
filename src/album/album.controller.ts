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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getAll(@Res({ passthrough: true }) res: Response) {
    try {
      const { status, data } = this.albumService.getAll();
      res.status(status);
      return data;
    } catch (error) {
      console.log(error);
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
      const { status, data } = this.albumService.getById(id);
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
    @Body() createArtist: CreateAlbumDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.albumService.create(createArtist);
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
    @Body() updateArtist: CreateAlbumDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.albumService.update(id, updateArtist);
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
      const { status, data } = this.albumService.delete(id);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }
}

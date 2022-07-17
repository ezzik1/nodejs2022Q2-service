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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getAll(@Res({ passthrough: true }) res: Response) {
    try {
      const { status, data } = this.artistService.getAll();
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
      const { status, data } = this.artistService.getById(id);
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
    @Body() createArtist: CreateArtistDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.artistService.create(createArtist);
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
    @Body() updateArtist: CreateArtistDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.artistService.update(id, updateArtist);
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
      const { status, data } = this.artistService.delete(id);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }
}

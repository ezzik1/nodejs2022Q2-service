import {
  Controller,
  Delete,
  Get,
  Header,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Response } from 'express';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getAll(@Res({ passthrough: true }) res: Response) {
    try {
      const { status, data } = this.favoritesService.getAll();
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }

  @Post('album/:id')
  @Header('Content-Type', 'application/json')
  addAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.favoritesService.createAlbum(id);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }

  @Post('artist/:id')
  @Header('Content-Type', 'application/json')
  addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.favoritesService.createArtist(id);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }

  @Post('track/:id')
  @Header('Content-Type', 'application/json')
  addTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.favoritesService.createTrack(id);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }

  @Delete('album/:id')
  @Header('Content-Type', 'application/json')
  deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.favoritesService.deleteAlbum(id);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }

  @Delete('artist/:id')
  @Header('Content-Type', 'application/json')
  deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.favoritesService.deleteArtist(id);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }

  @Delete('track/:id')
  @Header('Content-Type', 'application/json')
  deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.favoritesService.deleteTrack(id);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }
}

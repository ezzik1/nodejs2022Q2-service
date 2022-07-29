import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.favoritesService.getAll();
  }

  @Post('album/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.favoritesService.createAlbum(id);
  }

  @Post('artist/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.createArtist(id);
  }

  @Post('track/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.favoritesService.createTrack(id);
  }

  @Delete('album/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.deleteArtist(id);
  }

  @Delete('track/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.deleteTrack(id);
  }
}

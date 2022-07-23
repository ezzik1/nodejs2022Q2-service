import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.artistService.getAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.artistService.getById(id);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArtist: CreateArtistDto) {
    return await this.artistService.create(createArtist);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtist: CreateArtistDto,
  ) {
    return await this.artistService.update(id, updateArtist);
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.artistService.delete(id);
  }
}

import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Album } from '@prisma/client';
import { ArtistService } from 'src/artist/artist.service';
import { PrismaService } from 'src/database/database.service';
import { v4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  @Inject(forwardRef(() => ArtistService))
  private artistService: ArtistService;

  async getAll() {
    return await this.prisma.album.findMany();
  }

  async getById(id: string) {
    try {
      return await this.prisma.album.findUniqueOrThrow({ where: { id: id } });
    } catch (error) {
      throw new HttpException('This id does not exist', HttpStatus.NOT_FOUND);
    }
  }

  async create(AlbumDto: CreateAlbumDto) {
    const album: Album = {
      id: v4(),
      name: AlbumDto.name,
      year: AlbumDto.year ?? null,
      artistId: null,
    };

    if (AlbumDto.artistId) {
      try {
        await this.artistService.getById(AlbumDto.artistId);
        album.artistId = AlbumDto.artistId;
      } catch (error) {
        throw new HttpException('Artist ID not found', HttpStatus.NOT_FOUND);
      }
    }
    return this.prisma.album.create({ data: album });
  }

  async update(id: string, AlbumDto: CreateAlbumDto) {
    const album: Album = await this.getById(id);
    if (AlbumDto.name) {
      album.name = AlbumDto.name;
    }
    if (AlbumDto.year) {
      album.year = AlbumDto.year;
    }
    if (AlbumDto.artistId) {
      try {
        await this.artistService.getById(AlbumDto.artistId);
        album.artistId = AlbumDto.artistId;
      } catch (error) {
        throw new HttpException('Artist ID not found', HttpStatus.NOT_FOUND);
      }
    }

    return this.prisma.album.update({ where: { id: id }, data: album });
  }

  async delete(id: string) {
    await this.getById(id);
    return this.prisma.album.delete({ where: { id: id } });
  }
}

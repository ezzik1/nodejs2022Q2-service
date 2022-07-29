import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { v4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { AlbumService } from 'src/album/album.service';
import { PrismaService } from 'src/database/database.service';
import { Track } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  @Inject(forwardRef(() => ArtistService))
  private artistService: ArtistService;

  @Inject(forwardRef(() => AlbumService))
  private albumService: AlbumService;

  async getAll() {
    return await this.prisma.track.findMany();
  }

  async getById(id: string) {
    try {
      return await this.prisma.track.findUniqueOrThrow({ where: { id: id } });
    } catch (error) {
      throw new HttpException('This id does not exist', HttpStatus.NOT_FOUND);
    }
  }

  async create(TrackDto: CreateTrackDto) {
    const track: Track = {
      id: v4(),
      name: TrackDto.name,
      artistId: null,
      albumId: null,
      duration: TrackDto.duration ?? null,
    };

    if (TrackDto.artistId) {
      try {
        await this.artistService.getById(TrackDto.artistId);
        track.artistId = TrackDto.artistId;
      } catch (error) {
        throw new HttpException('Artist ID not found', HttpStatus.NOT_FOUND);
      }
    }
    if (TrackDto.albumId) {
      try {
        await this.albumService.getById(TrackDto.albumId);
        track.albumId = TrackDto.albumId;
      } catch (error) {
        throw new HttpException('Album ID not found', HttpStatus.NOT_FOUND);
      }
    }

    return this.prisma.track.create({ data: track });
  }

  async update(id: string, TrackDto: CreateTrackDto) {
    const track: Track = await this.getById(id);
    if (TrackDto.duration) {
      track.duration = TrackDto.duration;
    }
    if (TrackDto.artistId) {
      try {
        await this.artistService.getById(TrackDto.artistId);
        track.artistId = TrackDto.artistId;
      } catch (error) {
        throw new HttpException('Artist ID not found', HttpStatus.NOT_FOUND);
      }
    }
    if (TrackDto.albumId) {
      try {
        await this.albumService.getById(TrackDto.albumId);
        track.albumId = TrackDto.albumId;
      } catch (error) {
        throw new HttpException('Album ID not found', HttpStatus.NOT_FOUND);
      }
    }

    return this.prisma.track.update({ where: { id: id }, data: track });
  }

  async delete(id: string) {
    await this.getById(id);
    return this.prisma.track.delete({ where: { id: id } });
  }
}

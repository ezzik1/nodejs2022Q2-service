import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { PrismaService } from 'src/database/database.service';
import { v4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.artist.findMany();
  }

  async getById(id: string) {
    try {
      return await this.prisma.artist.findUniqueOrThrow({ where: { id: id } });
    } catch (error) {
      throw new HttpException('This id does not exist', HttpStatus.NOT_FOUND);
    }
  }

  async create(ArtistDto: CreateArtistDto) {
    const artist: Artist = {
      id: v4(),
      name: ArtistDto.name,
      grammy: ArtistDto.grammy ?? false,
    };
    await this.prisma.artist.create({ data: artist });

    return artist;
  }

  async update(id: string, ArtistDto: CreateArtistDto) {
    const artist: Artist = await this.getById(id);
    if (ArtistDto.grammy !== undefined) {
      artist.grammy = ArtistDto.grammy;
    }
    if (ArtistDto.name) {
      artist.name = ArtistDto.name;
    }
    return this.prisma.artist.update({ where: { id: id }, data: artist });
  }

  async delete(id: string) {
    await this.getById(id);
    return this.prisma.artist.delete({ where: { id: id } });
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { ArtistDto } from './dto/artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  private artists = [];

  getAll() {
    const artists: ArtistDto[] = [...this.artists];
    return {
      status: HttpStatus.OK,
      data: artists,
    };
  }

  getById(id: string) {
    const artist: ArtistDto = this.artists.find((u) => u.id === id);
    if (!artist) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'This id does not exist' },
      };
    }
    return {
      status: HttpStatus.OK,
      data: artist,
    };
  }

  create(ArtistDto: CreateArtistDto) {
    const artist: ArtistDto = {
      id: v4(),
      ...ArtistDto,
    };
    this.artists.push(artist);

    return {
      status: HttpStatus.CREATED,
      data: artist,
    };
  }

  update(id: string, ArtistDto: CreateArtistDto) {
    const artist: ArtistDto = this.artists.find((u) => u.id === id);
    if (!artist) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'This id does not exist' },
      };
    }
    if (ArtistDto.grammy !== undefined) {
      artist.grammy = ArtistDto.grammy;
    }
    if (ArtistDto.name) {
      artist.name = ArtistDto.name;
    }
    const index = this.artists.findIndex((u) => u.id === id);
    this.artists[index] = artist;
    return {
      status: HttpStatus.OK,
      data: artist,
    };
  }

  delete(id: string) {
    const artist: ArtistDto = this.artists.find((u) => u.id === id);
    if (!artist) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'This id does not exist' },
      };
    }
    this.artists = this.artists.filter((a) => a.id !== id);
    return {
      status: HttpStatus.NO_CONTENT,
      data: artist,
    };
  }
}

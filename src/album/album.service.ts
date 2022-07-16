import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { v4 } from 'uuid';
import { AlbumDto } from './dto/album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  private albums = [];

  @Inject(forwardRef(() => ArtistService))
  private artistService: ArtistService;

  getAll() {
    const albumsTemp: AlbumDto[] = [...this.albums];
    const albums = albumsTemp.map((album) => {
      if (album.artistId) {
        const artistTemp = this.artistService.getById(album.artistId);
        if (artistTemp.status !== 200) {
          album.artistId = null;
        }
      }
      return album;
    });

    return {
      status: HttpStatus.OK,
      data: albums,
    };
  }

  getById(id: string) {
    const album: AlbumDto = this.albums.find((u) => u.id === id);
    if (!album) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'This id does not exist' },
      };
    }
    if (album.artistId) {
      const artistTemp = this.artistService.getById(album.artistId);
      if (artistTemp.status !== 200) {
        album.artistId = null;
      }
    }
    return {
      status: HttpStatus.OK,
      data: album,
    };
  }

  create(AlbumDto: CreateAlbumDto) {
    const album: any = {
      id: v4(),
    };
    if (AlbumDto.year) {
      album.name = AlbumDto.name;
    }

    if (AlbumDto.year) {
      album.year = AlbumDto.year;
    }

    if (AlbumDto.artistId) {
      const artistTemp = this.artistService.getById(AlbumDto.artistId);
      if (artistTemp.status === 200) {
        album.artistId = AlbumDto.artistId;
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          data: { message: 'Artist ID not found' },
        };
      }
    } else {
      album.artistId = null;
    }

    this.albums.push(album);

    return {
      status: HttpStatus.CREATED,
      data: album,
    };
  }

  update(id: string, AlbumDto: CreateAlbumDto) {
    const album: AlbumDto | any = this.albums.find((u) => u.id === id);
    if (!album) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'This id does not exist' },
      };
    }
    if (AlbumDto.year) {
      album.name = AlbumDto.name;
    }
    if (AlbumDto.year) {
      album.year = AlbumDto.year;
    }
    if (AlbumDto.artistId) {
      const artistTemp = this.artistService.getById(AlbumDto.artistId);
      if (artistTemp.status === 200) {
        album.artistId = AlbumDto.artistId;
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          data: { message: 'Artist ID not found' },
        };
      }
    } else {
      album.artistId = null;
    }

    const index = this.albums.findIndex((u) => u.id === id);
    this.albums[index] = album;
    return {
      status: HttpStatus.OK,
      data: album,
    };
  }

  delete(id: string) {
    const album: AlbumDto = this.albums.find((u) => u.id === id);
    if (!album) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'This id does not exist' },
      };
    }
    this.albums = this.albums.filter((user) => user.id !== id);
    return {
      status: HttpStatus.NO_CONTENT,
      data: album,
    };
  }
}

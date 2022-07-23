import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { PrismaService } from 'src/database/database.service';
import { v4 } from 'uuid';
import { FavoritesDto } from './dto/favorites.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  @Inject(forwardRef(() => ArtistService))
  private artistService: ArtistService;

  @Inject(forwardRef(() => AlbumService))
  private albumService: AlbumService;

  @Inject(forwardRef(() => TrackService))
  private trackService: TrackService;

  async getAll() {
    const favs: FavoritesDto = {
      albums: [],
      artists: [],
      tracks: [],
    };
    const favsArr = await this.prisma.favorites.findMany();
    await Promise.all(
      favsArr.map(async (fav) => {
        if (fav.albums) {
          favs.albums.push(await this.albumService.getById(fav.albums));
        }
        if (fav.artists) {
          favs.artists.push(await this.artistService.getById(fav.artists));
        }
        if (fav.tracks) {
          favs.tracks.push(await this.trackService.getById(fav.tracks));
        }
      }),
    );

    return favs;
  }

  async createTrack(id: string) {
    try {
      await this.trackService.getById(id);
    } catch (error) {
      throw new HttpException(
        'Track ID not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.prisma.favorites.create({
      data: {
        id: v4(),
        tracks: id,
      },
    });
    const res = await this.getAll();
    return res.tracks;
  }

  async createAlbum(id: string) {
    try {
      await this.albumService.getById(id);
    } catch (error) {
      throw new HttpException(
        'Album ID not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.prisma.favorites.create({
      data: {
        id: v4(),
        albums: id,
      },
    });
    const res = await this.getAll();
    return res.albums;
  }

  async createArtist(id: string) {
    try {
      await this.artistService.getById(id);
    } catch (error) {
      throw new HttpException(
        'Artist ID not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.prisma.favorites.create({
      data: {
        id: v4(),
        artists: id,
      },
    });
    const res = await this.getAll();
    return res.artists;
  }

  async deleteTrack(id: string) {
    const track = await this.prisma.favorites.findFirst({
      where: {
        tracks: id,
      },
    });
    if (track) {
      await this.prisma.favorites.delete({
        where: {
          id: track.id,
        },
      });
    } else {
      throw new HttpException('Track ID not found', HttpStatus.NOT_FOUND);
    }
    const res = await this.getAll();
    return res.tracks;
  }

  async deleteAlbum(id: string) {
    const album = await this.prisma.favorites.findFirst({
      where: {
        albums: id,
      },
    });
    if (album) {
      await this.prisma.favorites.delete({
        where: {
          id: album.id,
        },
      });
    } else {
      throw new HttpException('Album ID not found', HttpStatus.NOT_FOUND);
    }
    const res = await this.getAll();
    return res.albums;
  }

  async deleteArtist(id: string) {
    const artist = await this.prisma.favorites.findFirst({
      where: {
        artists: id,
      },
    });
    if (artist) {
      await this.prisma.favorites.delete({
        where: {
          id: artist.id,
        },
      });
    } else {
      throw new HttpException('Artist ID not found', HttpStatus.NOT_FOUND);
    }
    const res = await this.getAll();
    return res.artists;
  }
}

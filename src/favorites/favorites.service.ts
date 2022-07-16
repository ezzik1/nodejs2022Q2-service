import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistDto } from 'src/artist/dto/artist.dto';
import { AlbumDto } from 'src/album/dto/album.dto';
import { TrackDto } from 'src/track/dto/track.dto';

@Injectable()
export class FavoritesService {
  private favs = {
    artists: [],
    albums: [],
    tracks: [],
  };

  @Inject(forwardRef(() => ArtistService))
  private artistService: ArtistService;

  @Inject(forwardRef(() => AlbumService))
  private albumService: AlbumService;

  @Inject(forwardRef(() => TrackService))
  private trackService: TrackService;

  getAll() {
    if (this.favs.artists) {
      this.favs.artists = this.favs.artists
        .map((artist: ArtistDto | any) => {
          artist = this.artistService.getById(artist.id);
          if (artist.status !== 200) {
            return null;
          }
          return artist.data;
        })
        .filter((e) => e !== null);
    }

    if (this.favs.albums) {
      this.favs.albums = this.favs.albums
        .map((album: AlbumDto | any) => {
          album = this.albumService.getById(album.id);
          if (album.status !== 200) {
            return null;
          }
          return album.data;
        })
        .filter((e) => e !== null);
    }

    if (this.favs.tracks) {
      this.favs.tracks = this.favs.tracks
        .map((track: TrackDto | any) => {
          track = this.trackService.getById(track.id);
          if (track.status !== 200) {
            return null;
          }
          return track.data;
        })
        .filter((e) => e !== null);
    }

    return {
      status: HttpStatus.OK,
      data: this.favs,
    };
  }

  createTrack(id: string) {
    const track = this.trackService.getById(id);
    if (track.status === 200) {
      this.favs.tracks.push(track.data);
    } else {
      return {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        data: { message: 'Track ID not found' },
      };
    }
    return {
      status: HttpStatus.CREATED,
      data: this.favs.tracks,
    };
  }

  createAlbum(id: string) {
    const album = this.albumService.getById(id);
    if (album.status === 200) {
      this.favs.albums.push(album.data);
    } else {
      return {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        data: { message: 'Album ID not found' },
      };
    }
    return {
      status: HttpStatus.CREATED,
      data: this.favs.albums,
    };
  }

  createArtist(id: string) {
    const artist = this.artistService.getById(id);
    if (artist.status === 200) {
      this.favs.artists.push(artist.data);
    } else {
      return {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        data: { message: 'Artist ID not found' },
      };
    }
    return {
      status: HttpStatus.CREATED,
      data: this.favs.artists,
    };
  }

  deleteTrack(id: string) {
    const track = this.favs.tracks.find((e) => e.id === id);
    if (track) {
      this.favs.tracks = this.favs.tracks.filter((e) => e.id !== id);
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'Track ID not found' },
      };
    }
    return {
      status: HttpStatus.NO_CONTENT,
      data: track,
    };
  }

  deleteAlbum(id: string) {
    const album = this.favs.albums.find((e) => e.id === id);
    if (album) {
      this.favs.albums = this.favs.albums.filter((e) => e.id !== id);
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'Album ID not found' },
      };
    }
    return {
      status: HttpStatus.NO_CONTENT,
      data: album,
    };
  }

  deleteArtist(id: string) {
    const artist = this.favs.artists.find((e) => e.id === id);
    if (artist) {
      this.favs.artists = this.favs.artists.filter((e) => e.id !== id);
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'Artist ID not found' },
      };
    }
    return {
      status: HttpStatus.NO_CONTENT,
      data: artist,
    };
  }
}

import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { v4 } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class TrackService {
  private tracks = [];

  @Inject(forwardRef(() => ArtistService))
  private artistService: ArtistService;

  @Inject(forwardRef(() => AlbumService))
  private albumService: AlbumService;

  getAll() {
    const tracksTemp: TrackDto[] = [...this.tracks];
    if (tracksTemp) {
      const tracks = tracksTemp.map((track) => {
        if (track.artistId) {
          const artist = this.artistService.getById(track.artistId);
          if (artist.status !== 200) {
            track.artistId = null;
          }
        }
        if (track.albumId) {
          const album = this.albumService.getById(track.albumId);
          if (album.status !== 200) {
            track.albumId = null;
          }
        }
        return track;
      });
      return {
        status: HttpStatus.OK,
        data: tracks,
      };
    }

    return {
      status: HttpStatus.OK,
      data: tracksTemp,
    };
  }

  getById(id: string) {
    const track: TrackDto = this.tracks.find((u) => u.id === id);
    if (!track) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'This id does not exist' },
      };
    }
    if (track.artistId) {
      const artist = this.artistService.getById(track.artistId);
      if (artist.status !== 200) {
        track.artistId = null;
      }
    }
    if (track.albumId) {
      const album = this.albumService.getById(track.albumId);
      if (album.status !== 200) {
        track.albumId = null;
      }
    }
    return {
      status: HttpStatus.OK,
      data: track,
    };
  }

  create(TrackDto: CreateTrackDto) {
    const track: any = {
      id: v4(),
    };
    track.name = TrackDto.name;
    if (TrackDto.duration) {
      track.duration = TrackDto.duration;
    }

    if (TrackDto.artistId) {
      const artist = this.artistService.getById(TrackDto.artistId);
      if (artist.status === 200) {
        track.artistId = TrackDto.artistId;
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          data: { message: 'Artist ID not found' },
        };
      }
    } else {
      track.artistId = null;
    }

    if (TrackDto.albumId) {
      const album = this.albumService.getById(TrackDto.albumId);
      if (album.status === 200) {
        track.albumId = TrackDto.albumId;
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          data: { message: 'Album ID not found' },
        };
      }
    } else {
      track.albumId = null;
    }

    this.tracks.push(track);

    return {
      status: HttpStatus.CREATED,
      data: track,
    };
  }

  update(id: string, TrackDto: CreateTrackDto) {
    const track: TrackDto | any = this.tracks.find((u) => u.id === id);
    if (!track) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'This id does not exist' },
      };
    }
    if (TrackDto.duration) {
      track.duration = TrackDto.duration;
    }
    if (TrackDto.artistId) {
      const artist = this.artistService.getById(TrackDto.artistId);
      if (artist.status === 200) {
        track.artist = TrackDto.artistId;
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          data: { message: 'Artist ID not found' },
        };
      }
    }

    if (TrackDto.albumId) {
      const album = this.artistService.getById(TrackDto.albumId);
      if (album.status === 200) {
        track.artist = TrackDto.albumId;
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          data: { message: 'Artist ID not found' },
        };
      }
    }

    const index = this.tracks.findIndex((u) => u.id === id);
    this.tracks[index] = track;
    return {
      status: HttpStatus.OK,
      data: track,
    };
  }

  delete(id: string) {
    const track: TrackDto = this.tracks.find((u) => u.id === id);
    if (!track) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: { message: 'This id does not exist' },
      };
    }
    this.tracks = this.tracks.filter((user) => user.id !== id);
    return {
      status: HttpStatus.NO_CONTENT,
      data: track,
    };
  }
}

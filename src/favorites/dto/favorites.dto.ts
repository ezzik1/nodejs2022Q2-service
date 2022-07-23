import { IsArray, IsOptional } from '@nestjs/class-validator';
import { AlbumDto } from 'src/album/dto/album.dto';
import { ArtistDto } from 'src/artist/dto/artist.dto';
import { TrackDto } from 'src/track/dto/track.dto';

export class FavoritesDto {
  @IsOptional()
  @IsArray()
  artists?: ArtistDto[] | any[] | null;

  @IsOptional()
  @IsArray()
  albums?: AlbumDto[] | any[] | null;

  @IsOptional()
  @IsArray()
  tracks?: TrackDto[] | any[] | null;
}

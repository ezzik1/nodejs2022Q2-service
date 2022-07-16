import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TrackDto {
  @IsString()
  readonly id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsString()
  albumId: string | null;

  @IsOptional()
  @IsNumber()
  duration?: number;
}

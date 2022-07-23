import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';

export class AlbumDto {
  @IsString()
  readonly id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsString()
  artistId: string | null;
}

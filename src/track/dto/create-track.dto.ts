import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  artistId?: string | null;

  @IsOptional()
  @IsString()
  albumId?: string | null;

  @IsOptional()
  @IsNumber()
  duration?: number;
}

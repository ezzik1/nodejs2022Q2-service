import { IsBoolean, IsOptional, IsString } from '@nestjs/class-validator';

export class ArtistDto {
  @IsString()
  readonly id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  grammy?: boolean;
}

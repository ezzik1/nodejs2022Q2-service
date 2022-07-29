import { IsBoolean, IsOptional, IsString } from '@nestjs/class-validator';

export class CreateArtistDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  grammy?: boolean;
}

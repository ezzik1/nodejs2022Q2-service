import { IsString } from '@nestjs/class-validator';

export class AuthRefreshDto {
  @IsString()
  refreshToken: string;
}

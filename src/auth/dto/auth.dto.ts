import { IsString } from '@nestjs/class-validator';

export class AuthDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

import { IsNumber, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly login: string;

  @IsString()
  password: string;

  @IsNumber()
  version: number;

  @IsNumber()
  createdAt: number;

  @IsNumber()
  updatedAt: number;
}

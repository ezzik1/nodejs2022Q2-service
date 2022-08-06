import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRefreshDto } from './dto/auth-refresh.dto';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types/token.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @Post('login')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: AuthRefreshDto) {
    return this.authService.refresh(dto);
  }
}

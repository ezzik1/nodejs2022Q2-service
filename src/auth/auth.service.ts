import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import { AuthRefreshDto } from './dto/auth-refresh.dto';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/token.type';

//https://www.youtube.com/watch?v=uAKzFhE3rxU 1:02

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  @Inject(forwardRef(() => UserService))
  private userService: UserService;

  async signup(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);
    const newUser = await this.userService.create({
      login: dto.login,
      password: hash,
    });

    const tokens = await this.getTokens(newUser.id, newUser.login);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async login(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findFirst({
      where: {
        login: dto.login,
      },
    });

    if (!user) throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches)
      throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
  async refresh(dto: AuthRefreshDto) {}

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedId: hash,
      },
    });
  }

  hashData(data: string) {
    return bcrypt.hash(data, process.env.CRYPT_SALT);
  }

  async getTokens(userId: string, login: string): Promise<Tokens> {
    const accessTokenHours = Number(
      process.env.TOKEN_EXPIRE_TIME.replace('h', ''),
    );
    const refreshTokenHours = Number(
      process.env.TOKEN_REFRESH_EXPIRE_TIME.replace('h', ''),
    );
    const [at, rt] = await Promise.all([
      this.jwtService.sign(
        {
          userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: accessTokenHours * 60 * 60,
        },
      ),
      this.jwtService.sign(
        {
          userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: refreshTokenHours * 60 * 60,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}

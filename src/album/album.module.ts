import { Module } from '@nestjs/common';
import { ArtistModule } from 'src/artist/artist.module';
import { PrismaModule } from 'src/database/database.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [ArtistModule, PrismaModule],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}

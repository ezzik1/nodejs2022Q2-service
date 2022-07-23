import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { PrismaModule } from 'src/database/database.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [ArtistModule, AlbumModule, PrismaModule],
  providers: [TrackService],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}

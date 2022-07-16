import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getAll(@Res({ passthrough: true }) res: Response) {
    try {
      const { status, data } = this.trackService.getAll();
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  getOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.trackService.getById(id);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }

  @Post()
  @Header('Content-Type', 'application/json')
  create(
    @Body() createTrack: CreateTrackDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.trackService.create(createTrack);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrack: CreateTrackDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.trackService.update(id, updateTrack);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { status, data } = this.trackService.delete(id);
      res.status(status);
      return data;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: 'Internal Server Error' };
    }
  }
}

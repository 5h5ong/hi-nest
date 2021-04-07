import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // search가 getOne보다 아래 있으면 getOne이 먼저 실행됨.
  // 그래서 "search"를 id로 인식하는 불상사가 생길 수 있으니
  // search는 getOne보다 위에 있어야 함.
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie with a title: ${searchingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData) {
    this.moviesService.update(movieId, updateData);
  }
}

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
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

/*
 * controller는 'movies.service'를 실제로 생성해 사용하지 않음.
 * typescript 덕분에 아래와 같은 코드 작성이 가능한 것임.
 *
 * 이 코드가 작동하게 'movies.module'에서 import를 해줌.
 */
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
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    this.moviesService.update(movieId, updateData);
  }
}

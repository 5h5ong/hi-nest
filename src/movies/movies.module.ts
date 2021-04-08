import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

// 여기서 처리를 해줘서 'movies.controller'가 'movies.service'를 생성하지 않았더라도
// 작동할 수 있도록 만듬.
// Dependency Injection
@Module({
  // provicers를 controllers에 inject함
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}

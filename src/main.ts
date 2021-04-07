import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Request 유효성 검사 파이프
  app.useGlobalPipes(
    new ValidationPipe({
      // 검증되지 않은 property는 받지 않음
      whitelist: true,
      // 검증되지 않은 property는 받지도 않고 아예 경고까지 띄워버림
      forbidNonWhitelisted: true,
      // 들어온 string을 적절한 타입으로 변환
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();

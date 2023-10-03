import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { profileEnd } from 'console';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  const configService = app.get(ConfigService);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.useStaticAssets(join(__dirname, '..', 'public')); // JS, CSS, IMAGES
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // VIEW
  app.setViewEngine('ejs');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  //config cors
  app.enableCors({
    "origin": "*", // Cấu hình địa chỉ nào có thể truy cập, * là bất kỳ. Ngoài ra Vd: http://localhost:3000
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
  })

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();

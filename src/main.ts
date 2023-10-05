import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  const configService = app.get(ConfigService);

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.useStaticAssets(join(__dirname, '..', 'public')); // JS, CSS, IMAGES
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // VIEW
  app.setViewEngine('ejs');

  app.useGlobalPipes(new ValidationPipe());

  // config cookieParser
  app.use(cookieParser());

  //config cors
  app.enableCors({
    "origin": "*", // Cấu hình địa chỉ nào có thể truy cập, * là bất kỳ. Ngoài ra Vd: http://localhost:3000
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
  })

  // config versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1', '2'] // v1, v2
  });

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();

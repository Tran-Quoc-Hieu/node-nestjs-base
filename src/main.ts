import { Logger } from '@nestjs/common';
import { ConfigService } from './configs/config.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as exphbs from "express-handlebars";
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new ConfigService();
  
  let hbs = exphbs.create({extname: '.hbs', defaultLayout: 'main'})
  const viewPath = join(__dirname, '../views');
  app.engine('.hbs', hbs.engine);
  app.set('views', viewPath);
  app.set('view engine', '.hbs');

  // listen
  let port = config.get('PORT');
  await app.listen(port, ()=> {
    Logger.log(`App listen port: ${port}`);
  });
}
bootstrap();

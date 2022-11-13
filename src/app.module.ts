import { join } from 'path';
import { ConfigService } from './configs/config.service';
import { controllerProvider } from './provider/controller.provider';
import { ConfigModule } from './configs/config.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { serviceProvider } from './provider/service.provider';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST') || 'localhost',
        port: Number(configService.get('MYSQL_PORT') || 3306),
        username: configService.get('MYSQL_USERNAME') || 'user',
        password: configService.get('MYSQL_PASSWORD') || 'password',
        database: configService.get('MYSQL_DATABASE') || 'nestjs',
        entyties: [join(__dirname, '/entity/mysql/*.entity{.ts, .js}')],
        synchronize: JSON.parse(configService.get('MYSQL_SYNCHRONIZE') || 'false'),
        migrations: [join(__dirname, '/migration/mysql/*.migration{.ts, .js}')],
        migrationsRun: JSON.parse(configService.get('MYSQL_MIGRATION_RUN') || 'false'),
      })
    })
  ],
  controllers: [...controllerProvider],
  providers: [...serviceProvider],
})
export class AppModule {}

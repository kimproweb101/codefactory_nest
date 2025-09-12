import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, unknown>) => {
        const requiredEnv = [
          'DB_HOST',
          'DB_PORT',
          'DB_USERNAME',
          'DB_PASSWORD',
          'DB_NAME',
        ];

        for (const key of requiredEnv) {
          if (!config[key]) {
            throw new Error(
              `Missing environment variable: ${key}. DB 연결이 올바르지 않습니다.`,
            );
          }
        }

        // 타입 단언: validate 통과 후에는 string이 들어온다고 생각하고 캐스트
        return config as Record<string, string>;
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const host = configService.get<string>('DB_HOST')!;
        const port = parseInt(
          configService.get<string>('DB_PORT') ?? '5432',
          10,
        );
        const username = configService.get<string>('DB_USERNAME')!;
        const password = configService.get<string>('DB_PASSWORD')!;
        const database = configService.get<string>('DB_NAME')!;

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

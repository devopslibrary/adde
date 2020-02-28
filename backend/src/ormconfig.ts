import { ConnectionOptions } from 'typeorm';
import { ConfigService } from './config/config.service';
const configService: ConfigService = new ConfigService(
  `${process.env.NODE_ENV || 'development'}.env`,
);

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: 5432,
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false, // We are using migrations, synchronize should be set to false.
  migrationsRun: true,
  logging: true,
  logger: 'advanced-console',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = config;

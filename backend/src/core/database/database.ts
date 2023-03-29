import { Pool } from 'pg';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: 'PG_POOL',
      useValue: new Pool({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        port: parseInt(process.env.POSTGRES_PORT),
      }),
    },
  ],
  exports: ['PG_POOL'],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { UserPositionController } from './controller/userPositionController';
import { UserPositionService } from './service/userPositionService';

@Module({
  controllers: [UserPositionController],
  providers: [UserPositionService],
})

export class AppModule {}


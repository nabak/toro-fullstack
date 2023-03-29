import { Module } from '@nestjs/common';
import { UserPositionController } from './controller/userPositionController';
import { DatabaseModule } from './core/database/database';
import { AccountPersistence } from './persistence/accountPersistence';
import { UserAssetsPersistence } from './persistence/userAssetsPersistence';
import { UserPositionService } from './service/userPositionService';

@Module({
  imports: [DatabaseModule],
  controllers: [UserPositionController],
  providers: [UserPositionService, UserAssetsPersistence, AccountPersistence],
})

export class AppModule {}
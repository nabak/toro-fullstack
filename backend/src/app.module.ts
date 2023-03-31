import { Module } from "@nestjs/common";
import { UserController } from "./controller/userController";
import { DatabaseModule } from "./core/database/connectDatabase";
import { AccountPersistence } from "./persistence/accountPersistence";
import { UserAssetsPersistence } from "./persistence/userAssetsPersistence";
import { UserPersistence } from "./persistence/userPersistence";
import { UserPositionService } from "./service/userPositionService";
import { UserService } from "./service/userService";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        UserPositionService,
        UserAssetsPersistence,
        AccountPersistence,
        UserPersistence,
        UserService,
    ],
})
export class AppModule {}

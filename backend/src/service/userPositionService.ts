import { Injectable } from "@nestjs/common";
import { UserPositionResponse } from "../core/dto/userPositionResponse";
import { AssetPositionResponse } from "../core/dto/assetPositionResponse";
import { AccountPersistence } from "../persistence/accountPersistence";
import { UserAssetsPersistence } from "../persistence/userAssetsPersistence";

@Injectable()
export class UserPositionService {
    constructor(
        private accountPersistence: AccountPersistence,
        private userAssetsPersistence: UserAssetsPersistence
    ) {}

    async getUserPositions(userCpf: string): Promise<UserPositionResponse> {
        const account = await this.accountPersistence.getAccountByCPF(userCpf);
        const userAssets = await this.userAssetsPersistence.getUserAssetsByCPF(
            userCpf
        );

        const positions: AssetPositionResponse[] = userAssets.map((item) => {
            return new AssetPositionResponse(
                item.asset.symbol,
                item.amount,
                item.asset.currentPrice
            );
        });

        const consolidated =
            account.balance +
            positions.reduce(
                (acc, pos) => acc + pos.amount * pos.currentPrice,
                0
            );

        const userPosition: UserPositionResponse = {
            checkingAccountAmount: account.balance,
            positions,
            consolidated,
        };

        return userPosition;
    }
}

import { Injectable } from "@nestjs/common";
import { UserPositionResponse } from "../core/dto/userPositionResponse";
import { AssetPositionResponse } from "../core/dto/assetPosition.dto";

@Injectable()
export class UserPositionService {
    constructor() {}

    async getUserPosition(): Promise<UserPositionResponse> {
        const account = {
            balance: 234.0,
        };

        const positions: AssetPositionResponse[] = [
            {
                symbol: "PETR4",
                amount: 2,
                currentPrice: 28.44,
            },
            {
                symbol: "SANB11",
                amount: 3,
                currentPrice: 40.77,
            },
        ];

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

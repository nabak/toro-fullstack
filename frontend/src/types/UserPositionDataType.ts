export interface UserPositionData {
    checkingAccountAmount: number;
    positions: {
        symbol: string;
        amount: number;
        currentPrice: number;
    }[];
    consolidated: number;
}

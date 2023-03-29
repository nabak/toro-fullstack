export class Asset {
    public id: string;
    public currentPrice: number;
    public symbol: string;

    constructor(id: string, symbol: string, currentPrice: number = 0) {
        this.id = id;
        this.currentPrice = currentPrice;
        this.symbol = symbol;
    }
}

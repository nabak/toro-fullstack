export class Asset {
    public id: string;
    public currentPrice: number;

    constructor(id: string, currentPrice: number = 0) {
        this.id = id;
        this.currentPrice = currentPrice;
    }
}
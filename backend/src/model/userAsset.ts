import { Asset } from "./asset";

export class UserAsset {
    public amount: number;
    public asset: Asset;
    
    constructor(amount: number, asset: Asset) {
        this.amount = amount;
        this.asset = asset;
    }
}
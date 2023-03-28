import { AssetPositionResponse } from "./assetPosition.dto";

export class UserPositionResponse {
    checkingAccountAmount: number;
    positions: AssetPositionResponse[];
    consolidated: number;
  
    constructor(
      checkingAccountAmount: number,
      positions: AssetPositionResponse[],
      consolidated: number
    ) {
      this.checkingAccountAmount = checkingAccountAmount;
      this.positions = positions;
      this.consolidated = consolidated;
    }
  }
  
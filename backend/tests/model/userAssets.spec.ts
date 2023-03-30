import { UserAsset } from '../../src/model/userAsset';
import { Asset } from '../../src/model/asset';

describe('UserAsset', () => {
  const asset: Asset = {
      symbol: 'PETR4',
      currentPrice: 28.44,
      id: '1'
  };

  it('should create a UserAsset instance', () => {
    const amount = 2;
    const userAsset = new UserAsset(amount, asset);

    expect(userAsset).toBeInstanceOf(UserAsset);
    expect(userAsset.amount).toEqual(amount);
    expect(userAsset.asset).toEqual(asset);
  });
});

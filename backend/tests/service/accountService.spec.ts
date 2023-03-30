import { Test } from "@nestjs/testing";
import { UserPositionService } from "../../src/service/userPositionService";
import { AccountPersistence } from "../../src/persistence/accountPersistence";
import { UserAssetsPersistence } from "../../src/persistence/userAssetsPersistence";

describe("UserPositionService", () => {
    let userPositionService;
    let accountPersistence;
    let userAssetsPersistence;

    const mockAccountPersistence = {
        getAccountByCPF: jest.fn(),
    };

    const mockUserAssetsPersistence = {
        getUserAssetsByCPF: jest.fn(),
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UserPositionService,
                {
                    provide: AccountPersistence,
                    useValue: mockAccountPersistence,
                },
                {
                    provide: UserAssetsPersistence,
                    useValue: mockUserAssetsPersistence,
                },
            ],
        }).compile();

        userPositionService =
            moduleRef.get<UserPositionService>(UserPositionService);
        accountPersistence =
            moduleRef.get<AccountPersistence>(AccountPersistence);
        userAssetsPersistence = moduleRef.get<UserAssetsPersistence>(
            UserAssetsPersistence
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getUserPositions", () => {
        it("should return user positions", async () => {
            const userCpf = "12345678900";
            const accountBalance = 1019.68;
            const userAssets = [
                { asset: { symbol: "PETR4", currentPrice: 28.44 }, amount: 2 },
                { asset: { symbol: "VALE3", currentPrice: 103.11 }, amount: 3 },
                { asset: { symbol: "SANB11", currentPrice: 40.77 }, amount: 4 },
            ];

            mockAccountPersistence.getAccountByCPF.mockResolvedValueOnce({
                balance: accountBalance,
            });

            mockUserAssetsPersistence.getUserAssetsByCPF.mockResolvedValueOnce(
                userAssets
            );

            const userPosition =
                await userPositionService.getUserPositions(userCpf);

            expect(mockAccountPersistence.getAccountByCPF).toHaveBeenCalledWith(
                userCpf
            );
            expect(
                mockUserAssetsPersistence.getUserAssetsByCPF
            ).toHaveBeenCalledWith(userCpf);

            expect(userPosition.checkingAccountAmount).toBe(accountBalance);

            expect(userPosition.positions.length).toBe(userAssets.length);
            userAssets.forEach((asset, index) => {
                const position = userPosition.positions[index];
                expect(position.symbol).toBe(asset.asset.symbol);
                expect(position.amount).toBe(asset.amount);
                expect(position.currentPrice).toBe(asset.asset.currentPrice);
            });

            const totalValue =
                accountBalance +
                userAssets.reduce(
                    (acc, asset) =>
                        acc + asset.amount * asset.asset.currentPrice,
                    0
                );
            expect(userPosition.consolidated).toBe(totalValue);
        });
    });
});

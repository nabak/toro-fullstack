import { Test, TestingModule } from "@nestjs/testing";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UserController } from "../../src/controller/userController";
import { UserPositionService } from "../../src/service/userPositionService";
import { UserService } from "../../src/service/userService";
import { UserPositionResponse } from "../../src/core/dto/userPositionResponse";
import { HttpModule } from "@nestjs/axios";
import { AccountPersistence } from "../../src/persistence/accountPersistence";
import { UserAssetsPersistence } from "../../src/persistence/userAssetsPersistence";
import { DatabaseModule } from "../../src/core/database/database";

describe("UserController", () => {
    let userController;
    let userPositionService;
    let userService;

    const useValue = {
        getUserById: jest.fn(),
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [HttpModule, DatabaseModule ],
            controllers: [UserController],
            providers: [
                UserPositionService,
                {
                    provide: UserService,
                    useValue: useValue,
                },
                AccountPersistence,
                UserAssetsPersistence
            ],
        }).compile();

        userController = moduleRef.get<UserController>(UserController);
        userPositionService =
            moduleRef.get<UserPositionService>(UserPositionService);
        userService = moduleRef.get<UserService>(UserService);
    });

    describe("getUserPositions", () => {
        it("should return user positions", async () => {
            const userId = 1;
            const userCpf = "12345678900";
            const accountBalance = 1019.68;
            const userAssets = [
                { asset: { symbol: "PETR4", currentPrice: 28.44 }, amount: 2 },
                { asset: { symbol: "VALE3", currentPrice: 103.11 }, amount: 3 },
                { asset: { symbol: "SANB11", currentPrice: 40.77 }, amount: 4 },
            ];

            jest.spyOn(userService, "getUserById").mockResolvedValueOnce({
                cpf: userCpf,
                name: "John Doe",
            });

            jest.spyOn(
                userPositionService,
                "getUserPositions"
            ).mockResolvedValueOnce({
                checkingAccountAmount: accountBalance,
                positions: userAssets.map((asset) => ({
                    symbol: asset.asset.symbol,
                    amount: asset.amount,
                    currentPrice: asset.asset.currentPrice,
                })),
                consolidated:
                    accountBalance +
                    userAssets.reduce(
                        (acc, asset) =>
                            acc + asset.amount * asset.asset.currentPrice,
                        0
                    ),
            });

            const userPosition: UserPositionResponse =
                await userController.getUserPositions(userId);

            expect(userService.getUserById).toHaveBeenCalledWith(userId);
            expect(userPositionService.getUserPositions).toHaveBeenCalledWith(
                userCpf
            );

            expect(userService.getUserById).toHaveBeenCalledWith(userId);
            expect(userPositionService.getUserPositions).toHaveBeenCalledWith(
                userCpf
            );

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

        it("should throw an error if user is not found", async () => {
            const userId = 1;

            jest.spyOn(userService, "getUserById").mockResolvedValueOnce(null);

            await expect(
                userController.getUserPositions(userId)
            ).rejects.toThrow(
                new HttpException("User not found", HttpStatus.NOT_FOUND)
            );
        });
    });
});

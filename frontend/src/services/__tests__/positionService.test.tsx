import { fetchPositions } from "../positionsService";
import { expect, jest } from "@jest/globals";

describe("fetchPositions function", () => {
    const mockData = {
        checkingAccountAmount: 10000,
        consolidated: 5000,
        positions: [
            {
                symbol: "AAPL",
                amount: 10,
                currentPrice: 148.95,
            },
            {
                symbol: "TSLA",
                amount: 5,
                currentPrice: 758.49,
            },
        ],
    };

    test("returns correct data when given a valid userId", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: async () => mockData,
            } as Response)
        );

        const result = await fetchPositions(1);
        expect(result).toEqual(mockData);
    });

    test("throws an error when given an invalid userId", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 404,
            } as Response)
        );

        await expect(fetchPositions(0)).rejects.toThrow();
    });
});

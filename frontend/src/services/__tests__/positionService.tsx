import { fetchPositions } from "../positionsService";

describe("fetchPositions function", () => {
    test("returns correct data when given a valid userId", async () => {
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
        jest.spyOn(global, "fetch").mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        } as Response);

        const result = await fetchPositions(1);
        expect(result).toEqual(mockData);
    });

    test("throws an error when given an invalid userId", async () => {
        jest.spyOn(global, "fetch").mockResolvedValueOnce({
            ok: false,
            status: 404,
        } as Response);
        await expect(fetchPositions(0)).rejects.toThrow();
    });
});

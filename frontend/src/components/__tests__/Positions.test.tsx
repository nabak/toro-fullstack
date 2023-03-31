import React from "react";
import { render, screen } from "@testing-library/react";
import PositionsList from "../PositionsList";
import { IntlProvider } from "react-intl";

function App() {
    return (
        <IntlProvider locale="en">
            <PositionsList userId={1} />
        </IntlProvider>
    );
}

describe("Positions component", () => {
    test("renders Positions component with initial loading state", async () => {
        render(<App />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    test("renders Positions component with fetched data", async () => {
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

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: async () => mockData,
            } as Response)
        );

        render(<PositionsList userId={1} />);
        expect(await screen.findByText("AAPL")).toBeInTheDocument();
        expect(await screen.findByText("10")).toBeInTheDocument();
        expect(await screen.findByText("$148.95")).toBeInTheDocument();
        expect(await screen.findByText("TSLA")).toBeInTheDocument();
        expect(await screen.findByText("5")).toBeInTheDocument();
        expect(await screen.findByText("$758.49")).toBeInTheDocument();
    });
});

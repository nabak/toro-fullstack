import React from "react";
import { render, screen } from "@testing-library/react";
import PositionsList from "../PositionsList";

describe("Positions component", () => {
    test("renders Positions component with initial loading state", async () => {
        render(<PositionsList userId={1} />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });


});

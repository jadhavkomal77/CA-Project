import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import AdvanceTaxCalculator from "./AdvanceTaxCalculator";

vi.mock("react-toastify", () => ({
  toast: Object.assign(vi.fn(), {
    success: vi.fn(),
    error: vi.fn(),
  }),
}));

describe("AdvanceTaxCalculator", () => {
  it("updates the rendered result immediately when inputs change", () => {
    render(
      <MemoryRouter>
        <AdvanceTaxCalculator />
      </MemoryRouter>,
    );

    const [estimatedIncome, tdsDeducted, advanceTaxPaid] =
      screen.getAllByRole("slider");

    fireEvent.change(estimatedIncome, { target: { value: "1600000" } });
    fireEvent.change(tdsDeducted, { target: { value: "10000" } });
    fireEvent.change(advanceTaxPaid, { target: { value: "5000" } });

    expect(screen.getByText("Calculation Summary")).toBeInTheDocument();
    expect(screen.getByText("Advance Tax Payable")).toBeInTheDocument();
    expect(screen.getByText(/Q2: ₹48,540/)).toBeInTheDocument();
    expect(
      screen.getByText("Results refresh instantly as you adjust the inputs."),
    ).toBeInTheDocument();
  });
});

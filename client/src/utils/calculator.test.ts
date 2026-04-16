import { describe, expect, it } from "vitest";
import { calculateAdvanceTax } from "./calculator";

describe("calculateAdvanceTax", () => {
  it("calculates advance tax with corrected installment percentages", () => {
    const calculation = calculateAdvanceTax({
      estimatedIncome: 1600000,
      tdsDeducted: 10000,
      previousAdvanceTax: 5000,
    });

    expect(calculation.errors).toEqual([]);
    expect(calculation.result).toEqual({
      estimatedIncome: 1600000,
      tdsDeducted: 10000,
      previousAdvanceTax: 5000,
      taxOnEstimated: 170000,
      cess: 6800,
      totalTaxLiability: 176800,
      advanceTaxPayable: 161800,
      installments: {
        q1: 24270,
        q2: 48540,
        q3: 48540,
        q4: 40450,
      },
    });
  });

  it("returns zero payable tax when prior credits exceed liability", () => {
    const calculation = calculateAdvanceTax({
      estimatedIncome: 750000,
      tdsDeducted: 50000,
      previousAdvanceTax: 10000,
    });

    expect(calculation.errors).toEqual([]);
    expect(calculation.result?.advanceTaxPayable).toBe(0);
    expect(calculation.result?.installments).toEqual({
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
    });
  });

  it("rejects invalid and negative inputs", () => {
    const calculation = calculateAdvanceTax({
      estimatedIncome: "",
      tdsDeducted: -1,
      previousAdvanceTax: "abc",
    });

    expect(calculation.result).toBeNull();
    expect(calculation.errors).toEqual([
      "Estimated income must be greater than 0.",
      "TDS deducted cannot be negative.",
      "Advance tax paid must be a valid number.",
    ]);
  });

  it("rounds decimal-heavy values deterministically", () => {
    const calculation = calculateAdvanceTax({
      estimatedIncome: 700000.1,
      tdsDeducted: 0.1,
      previousAdvanceTax: 0.2,
    });

    expect(calculation.errors).toEqual([]);
    expect(calculation.result).toMatchObject({
      taxOnEstimated: 20000.01,
      cess: 800,
      totalTaxLiability: 20800.01,
      advanceTaxPayable: 20799.71,
      installments: {
        q1: 3119.96,
        q2: 6239.91,
        q3: 6239.91,
        q4: 5199.93,
      },
    });
  });
});

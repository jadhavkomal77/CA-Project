export type AdvanceTaxInput = {
  estimatedIncome?: number | string | null;
  tdsDeducted?: number | string | null;
  previousAdvanceTax?: number | string | null;
};

export type Installments = {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
};

export type AdvanceTaxResult = {
  estimatedIncome: number;
  tdsDeducted: number;
  previousAdvanceTax: number;
  taxOnEstimated: number;
  cess: number;
  totalTaxLiability: number;
  advanceTaxPayable: number;
  installments: Installments;
};

export type AdvanceTaxCalculation = {
  errors: string[];
  result: AdvanceTaxResult | null;
};

const roundCurrency = (value: number): number =>
  Number((Math.round((value + Number.EPSILON) * 100) / 100).toFixed(2));

const toNumber = (value: number | string | null | undefined): number => {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : Number.NaN;
  }

  const normalized = String(value).replace(/,/g, "").trim();

  if (normalized === "") {
    return 0;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

const calculateIncomeTaxBySlab = (estimatedIncome: number): number => {
  if (estimatedIncome <= 300000) {
    return 0;
  }

  if (estimatedIncome <= 700000) {
    return (estimatedIncome - 300000) * 0.05;
  }

  if (estimatedIncome <= 1000000) {
    return 20000 + (estimatedIncome - 700000) * 0.1;
  }

  if (estimatedIncome <= 1200000) {
    return 50000 + (estimatedIncome - 1000000) * 0.15;
  }

  if (estimatedIncome <= 1500000) {
    return 80000 + (estimatedIncome - 1200000) * 0.2;
  }

  return 140000 + (estimatedIncome - 1500000) * 0.3;
};

export const calculateAdvanceTax = (
  input: AdvanceTaxInput,
): AdvanceTaxCalculation => {
  const estimatedIncome = toNumber(input.estimatedIncome);
  const tdsDeducted = toNumber(input.tdsDeducted);
  const previousAdvanceTax = toNumber(input.previousAdvanceTax);
  const errors: string[] = [];

  if (Number.isNaN(estimatedIncome)) {
    errors.push("Estimated income must be a valid number.");
  } else if (estimatedIncome <= 0) {
    errors.push("Estimated income must be greater than 0.");
  }

  if (Number.isNaN(tdsDeducted)) {
    errors.push("TDS deducted must be a valid number.");
  } else if (tdsDeducted < 0) {
    errors.push("TDS deducted cannot be negative.");
  }

  if (Number.isNaN(previousAdvanceTax)) {
    errors.push("Advance tax paid must be a valid number.");
  } else if (previousAdvanceTax < 0) {
    errors.push("Advance tax paid cannot be negative.");
  }

  if (errors.length > 0) {
    return {
      errors,
      result: null,
    };
  }

  const taxOnEstimated = calculateIncomeTaxBySlab(estimatedIncome);
  const cess = taxOnEstimated * 0.04;
  const totalTaxLiability = taxOnEstimated + cess;
  const advanceTaxPayable = Math.max(
    0,
    totalTaxLiability - tdsDeducted - previousAdvanceTax,
  );

  return {
    errors: [],
    result: {
      estimatedIncome: roundCurrency(estimatedIncome),
      tdsDeducted: roundCurrency(tdsDeducted),
      previousAdvanceTax: roundCurrency(previousAdvanceTax),
      taxOnEstimated: roundCurrency(taxOnEstimated),
      cess: roundCurrency(cess),
      totalTaxLiability: roundCurrency(totalTaxLiability),
      advanceTaxPayable: roundCurrency(advanceTaxPayable),
      installments: {
        q1: roundCurrency(advanceTaxPayable * 0.15),
        q2: roundCurrency(advanceTaxPayable * 0.3),
        q3: roundCurrency(advanceTaxPayable * 0.3),
        q4: roundCurrency(advanceTaxPayable * 0.25),
      },
    },
  };
};

import asyncHandler from "express-async-handler";

// Income Tax Calculator
export const calculateIncomeTax = asyncHandler(async (req, res) => {
  const {
    annualIncome,
    age,
    regime,
    deduction80C = 0,
    deduction80D = 0,
    otherDeductions = 0,
  } = req.body;

  // Validation
  if (!annualIncome || annualIncome < 0) {
    return res.status(400).json({
      success: false,
      message: "Annual income is required and must be positive",
    });
  }

  if (!age || age < 0) {
    return res.status(400).json({
      success: false,
      message: "Age is required and must be positive",
    });
  }

  if (!regime || !["old", "new"].includes(regime.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: "Regime must be 'old' or 'new'",
    });
  }

  const totalDeductions = deduction80C + deduction80D + otherDeductions;
  const taxableIncome = Math.max(0, annualIncome - totalDeductions);

  let taxPayable = 0;
  const slabs = [];

  if (regime.toLowerCase() === "old") {
    // Old Tax Regime (FY 2024-25)
    if (age < 60) {
      // General
      if (taxableIncome <= 250000) {
        taxPayable = 0;
        slabs.push({ from: 0, to: 250000, rate: 0, tax: 0 });
      } else if (taxableIncome <= 500000) {
        taxPayable = (taxableIncome - 250000) * 0.05;
        slabs.push({ from: 0, to: 250000, rate: 0, tax: 0 });
        slabs.push({
          from: 250001,
          to: 500000,
          rate: 5,
          tax: taxPayable,
        });
      } else if (taxableIncome <= 1000000) {
        taxPayable = 12500 + (taxableIncome - 500000) * 0.2;
        slabs.push({ from: 0, to: 250000, rate: 0, tax: 0 });
        slabs.push({ from: 250001, to: 500000, rate: 5, tax: 12500 });
        slabs.push({
          from: 500001,
          to: 1000000,
          rate: 20,
          tax: (taxableIncome - 500000) * 0.2,
        });
      } else {
        taxPayable = 112500 + (taxableIncome - 1000000) * 0.3;
        slabs.push({ from: 0, to: 250000, rate: 0, tax: 0 });
        slabs.push({ from: 250001, to: 500000, rate: 5, tax: 12500 });
        slabs.push({ from: 500001, to: 1000000, rate: 20, tax: 100000 });
        slabs.push({
          from: 1000001,
          to: taxableIncome,
          rate: 30,
          tax: (taxableIncome - 1000000) * 0.3,
        });
      }
    } else if (age >= 60 && age < 80) {
      // Senior Citizen
      if (taxableIncome <= 300000) {
        taxPayable = 0;
        slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
      } else if (taxableIncome <= 500000) {
        taxPayable = (taxableIncome - 300000) * 0.05;
        slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
        slabs.push({
          from: 300001,
          to: 500000,
          rate: 5,
          tax: taxPayable,
        });
      } else if (taxableIncome <= 1000000) {
        taxPayable = 10000 + (taxableIncome - 500000) * 0.2;
        slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
        slabs.push({ from: 300001, to: 500000, rate: 5, tax: 10000 });
        slabs.push({
          from: 500001,
          to: 1000000,
          rate: 20,
          tax: (taxableIncome - 500000) * 0.2,
        });
      } else {
        taxPayable = 110000 + (taxableIncome - 1000000) * 0.3;
        slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
        slabs.push({ from: 300001, to: 500000, rate: 5, tax: 10000 });
        slabs.push({ from: 500001, to: 1000000, rate: 20, tax: 100000 });
        slabs.push({
          from: 1000001,
          to: taxableIncome,
          rate: 30,
          tax: (taxableIncome - 1000000) * 0.3,
        });
      }
    } else {
      // Super Senior Citizen (80+)
      if (taxableIncome <= 500000) {
        taxPayable = 0;
        slabs.push({ from: 0, to: 500000, rate: 0, tax: 0 });
      } else if (taxableIncome <= 1000000) {
        taxPayable = (taxableIncome - 500000) * 0.2;
        slabs.push({ from: 0, to: 500000, rate: 0, tax: 0 });
        slabs.push({
          from: 500001,
          to: 1000000,
          rate: 20,
          tax: taxPayable,
        });
      } else {
        taxPayable = 100000 + (taxableIncome - 1000000) * 0.3;
        slabs.push({ from: 0, to: 500000, rate: 0, tax: 0 });
        slabs.push({ from: 500001, to: 1000000, rate: 20, tax: 100000 });
        slabs.push({
          from: 1000001,
          to: taxableIncome,
          rate: 30,
          tax: (taxableIncome - 1000000) * 0.3,
        });
      }
    }
  } else {
    // New Tax Regime (FY 2024-25)
    if (taxableIncome <= 300000) {
      taxPayable = 0;
      slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
    } else if (taxableIncome <= 700000) {
      taxPayable = (taxableIncome - 300000) * 0.05;
      slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
      slabs.push({
        from: 300001,
        to: 700000,
        rate: 5,
        tax: taxPayable,
      });
    } else if (taxableIncome <= 1000000) {
      taxPayable = 20000 + (taxableIncome - 700000) * 0.1;
      slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
      slabs.push({ from: 300001, to: 700000, rate: 5, tax: 20000 });
      slabs.push({
        from: 700001,
        to: 1000000,
        rate: 10,
        tax: (taxableIncome - 700000) * 0.1,
      });
    } else if (taxableIncome <= 1200000) {
      taxPayable = 50000 + (taxableIncome - 1000000) * 0.15;
      slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
      slabs.push({ from: 300001, to: 700000, rate: 5, tax: 20000 });
      slabs.push({ from: 700001, to: 1000000, rate: 10, tax: 30000 });
      slabs.push({
        from: 1000001,
        to: 1200000,
        rate: 15,
        tax: (taxableIncome - 1000000) * 0.15,
      });
    } else if (taxableIncome <= 1500000) {
      taxPayable = 80000 + (taxableIncome - 1200000) * 0.2;
      slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
      slabs.push({ from: 300001, to: 700000, rate: 5, tax: 20000 });
      slabs.push({ from: 700001, to: 1000000, rate: 10, tax: 30000 });
      slabs.push({ from: 1000001, to: 1200000, rate: 15, tax: 30000 });
      slabs.push({
        from: 1200001,
        to: 1500000,
        rate: 20,
        tax: (taxableIncome - 1200000) * 0.2,
      });
    } else {
      taxPayable = 140000 + (taxableIncome - 1500000) * 0.3;
      slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
      slabs.push({ from: 300001, to: 700000, rate: 5, tax: 20000 });
      slabs.push({ from: 700001, to: 1000000, rate: 10, tax: 30000 });
      slabs.push({ from: 1000001, to: 1200000, rate: 15, tax: 30000 });
      slabs.push({ from: 1200001, to: 1500000, rate: 20, tax: 60000 });
      slabs.push({
        from: 1500001,
        to: taxableIncome,
        rate: 30,
        tax: (taxableIncome - 1500000) * 0.3,
      });
    }
  }

  const cess = taxPayable * 0.04; // 4% cess
  const totalTax = taxPayable + cess;

  res.json({
    success: true,
    data: {
      annualIncome,
      totalDeductions,
      taxableIncome,
      taxPayable,
      cess,
      totalTax,
      slabs,
      regime: regime.toLowerCase(),
    },
  });
});

// GST Calculator
export const calculateGST = asyncHandler(async (req, res) => {
  const { amount, gstRate, isInclusive } = req.body;

  // Validation
  if (!amount || amount < 0) {
    return res.status(400).json({
      success: false,
      message: "Amount is required and must be positive",
    });
  }

  if (!gstRate || gstRate < 0 || gstRate > 100) {
    return res.status(400).json({
      success: false,
      message: "GST rate must be between 0 and 100",
    });
  }

  let baseAmount, gstAmount, totalAmount;

  if (isInclusive) {
    // GST is included in the amount
    baseAmount = (amount * 100) / (100 + gstRate);
    gstAmount = amount - baseAmount;
    totalAmount = amount;
  } else {
    // GST is exclusive
    baseAmount = amount;
    gstAmount = (amount * gstRate) / 100;
    totalAmount = amount + gstAmount;
  }

  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  res.json({
    success: true,
    data: {
      baseAmount: Math.round(baseAmount * 100) / 100,
      gstRate,
      gstAmount: Math.round(gstAmount * 100) / 100,
      cgst: Math.round(cgst * 100) / 100,
      sgst: Math.round(sgst * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      isInclusive,
    },
  });
});

// EMI Calculator
export const calculateEMI = asyncHandler(async (req, res) => {
  const { loanAmount, interestRate, tenureYears } = req.body;

  // Validation
  if (!loanAmount || loanAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Loan amount must be greater than 0",
    });
  }

  if (!interestRate || interestRate < 0) {
    return res.status(400).json({
      success: false,
      message: "Interest rate must be positive",
    });
  }

  if (!tenureYears || tenureYears <= 0) {
    return res.status(400).json({
      success: false,
      message: "Tenure must be greater than 0",
    });
  }

  const monthlyRate = interestRate / 12 / 100;
  const tenureMonths = tenureYears * 12;

  // EMI Formula: [P x R x (1+R)^N] / [(1+R)^N - 1]
  const emi =
    (loanAmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - loanAmount;

  res.json({
    success: true,
    data: {
      loanAmount,
      interestRate,
      tenureYears,
      tenureMonths,
      emi: Math.round(emi * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
    },
  });
});

// SIP Calculator
export const calculateSIP = asyncHandler(async (req, res) => {
  const { monthlyInvestment, expectedReturn, years } = req.body;

  // Validation
  if (!monthlyInvestment || monthlyInvestment <= 0) {
    return res.status(400).json({
      success: false,
      message: "Monthly investment must be greater than 0",
    });
  }

  if (!expectedReturn || expectedReturn < 0) {
    return res.status(400).json({
      success: false,
      message: "Expected return must be positive",
    });
  }

  if (!years || years <= 0) {
    return res.status(400).json({
      success: false,
      message: "Years must be greater than 0",
    });
  }

  const monthlyRate = expectedReturn / 12 / 100;
  const months = years * 12;

  // SIP Formula: P * [((1 + r)^n - 1) / r] * (1 + r)
  const maturityValue =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate);

  const totalInvested = monthlyInvestment * months;
  const estimatedReturns = maturityValue - totalInvested;

  res.json({
    success: true,
    data: {
      monthlyInvestment,
      expectedReturn,
      years,
      months,
      totalInvested: Math.round(totalInvested * 100) / 100,
      estimatedReturns: Math.round(estimatedReturns * 100) / 100,
      maturityValue: Math.round(maturityValue * 100) / 100,
    },
  });
});
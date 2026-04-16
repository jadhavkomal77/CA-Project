
import asyncHandler from "express-async-handler";

// Home Loan EMI Calculator
export const calculateEMI = asyncHandler(async (req, res) => {
  const { loanAmount, interestRate, tenureYears } = req.body;

  if (!loanAmount || loanAmount <= 0) {
    return res.status(400).json({ success: false, message: "Loan amount must be greater than 0" });
  }
  if (!interestRate || interestRate < 0 || interestRate > 100) {
    return res.status(400).json({ success: false, message: "Interest rate must be between 0 and 100" });
  }
  if (!tenureYears || tenureYears <= 0) {
    return res.status(400).json({ success: false, message: "Tenure must be greater than 0" });
  }

  const monthlyRate = interestRate / 12 / 100;
  const tenureMonths = tenureYears * 12;

  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
              (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - loanAmount;

  res.json({
    success: true,
    data: {
      loanAmount: parseFloat(loanAmount),
      interestRate: parseFloat(interestRate),
      tenureYears: parseFloat(tenureYears),
      tenureMonths,
      emi: Math.round(emi * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      principal: parseFloat(loanAmount),
    },
  });
});

// SIP Calculator
export const calculateSIP = asyncHandler(async (req, res) => {
  const { monthlyInvestment, expectedReturn, years } = req.body;

  if (!monthlyInvestment || monthlyInvestment <= 0) {
    return res.status(400).json({ success: false, message: "Monthly investment must be greater than 0" });
  }
  if (!expectedReturn || expectedReturn < 0 || expectedReturn > 100) {
    return res.status(400).json({ success: false, message: "Expected return must be between 0 and 100" });
  }
  if (!years || years <= 0) {
    return res.status(400).json({ success: false, message: "Years must be greater than 0" });
  }

  const monthlyRate = expectedReturn / 12 / 100;
  const months = years * 12;

  const maturityValue = monthlyInvestment * 
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
    (1 + monthlyRate);

  const totalInvested = monthlyInvestment * months;
  const estimatedReturns = maturityValue - totalInvested;

  res.json({
    success: true,
    data: {
      monthlyInvestment: parseFloat(monthlyInvestment),
      expectedReturn: parseFloat(expectedReturn),
      years: parseFloat(years),
      months,
      totalInvested: Math.round(totalInvested * 100) / 100,
      estimatedReturns: Math.round(estimatedReturns * 100) / 100,
      maturityValue: Math.round(maturityValue * 100) / 100,
    },
  });
});

// GST Calculator
export const calculateGST = asyncHandler(async (req, res) => {
  const { amount, gstRate, isInclusive } = req.body;

  if (!amount || amount < 0) {
    return res.status(400).json({ success: false, message: "Amount must be positive" });
  }
  if (!gstRate || gstRate < 0 || gstRate > 100) {
    return res.status(400).json({ success: false, message: "GST rate must be between 0 and 100" });
  }

  let baseAmount, gstAmount, totalAmount;

  if (isInclusive) {
    baseAmount = (amount * 100) / (100 + gstRate);
    gstAmount = amount - baseAmount;
    totalAmount = amount;
  } else {
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
      gstRate: parseFloat(gstRate),
      gstAmount: Math.round(gstAmount * 100) / 100,
      cgst: Math.round(cgst * 100) / 100,
      sgst: Math.round(sgst * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      isInclusive,
    },
  });
});

// GST Search (Dummy)
export const searchGST = asyncHandler(async (req, res) => {
  const { gstNumber } = req.body;

  if (!gstNumber || gstNumber.length !== 15) {
    return res.status(400).json({ success: false, message: "Invalid GST number format" });
  }

  // Dummy response
  res.json({
    success: true,
    data: {
      gstNumber,
      legalName: "Sample Company Private Limited",
      tradeName: "Sample Trade Name",
      status: "Active",
      registrationDate: "2020-01-15",
      businessType: "Private Limited Company",
      address: "123 Business Street, Mumbai, Maharashtra - 400001",
    },
  });
});

// Income Tax Calculator (New Regime)
export const calculateIncomeTax = asyncHandler(async (req, res) => {
  const { annualIncome, age, deductions = 0 } = req.body;

  if (!annualIncome || annualIncome < 0) {
    return res.status(400).json({ success: false, message: "Annual income must be positive" });
  }
  if (!age || age < 0) {
    return res.status(400).json({ success: false, message: "Age must be positive" });
  }

  const taxableIncome = Math.max(0, annualIncome - deductions);

  let taxPayable = 0;
  const slabs = [];

  // New Tax Regime (FY 2024-25)
  if (taxableIncome <= 300000) {
    taxPayable = 0;
    slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
  } else if (taxableIncome <= 700000) {
    taxPayable = (taxableIncome - 300000) * 0.05;
    slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
    slabs.push({ from: 300001, to: 700000, rate: 5, tax: taxPayable });
  } else if (taxableIncome <= 1000000) {
    taxPayable = 20000 + (taxableIncome - 700000) * 0.1;
    slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
    slabs.push({ from: 300001, to: 700000, rate: 5, tax: 20000 });
    slabs.push({ from: 700001, to: 1000000, rate: 10, tax: (taxableIncome - 700000) * 0.1 });
  } else if (taxableIncome <= 1200000) {
    taxPayable = 50000 + (taxableIncome - 1000000) * 0.15;
    slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
    slabs.push({ from: 300001, to: 700000, rate: 5, tax: 20000 });
    slabs.push({ from: 700001, to: 1000000, rate: 10, tax: 30000 });
    slabs.push({ from: 1000001, to: 1200000, rate: 15, tax: (taxableIncome - 1000000) * 0.15 });
  } else if (taxableIncome <= 1500000) {
    taxPayable = 80000 + (taxableIncome - 1200000) * 0.2;
    slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
    slabs.push({ from: 300001, to: 700000, rate: 5, tax: 20000 });
    slabs.push({ from: 700001, to: 1000000, rate: 10, tax: 30000 });
    slabs.push({ from: 1000001, to: 1200000, rate: 15, tax: 30000 });
    slabs.push({ from: 1200001, to: 1500000, rate: 20, tax: (taxableIncome - 1200000) * 0.2 });
  } else {
    taxPayable = 140000 + (taxableIncome - 1500000) * 0.3;
    slabs.push({ from: 0, to: 300000, rate: 0, tax: 0 });
    slabs.push({ from: 300001, to: 700000, rate: 5, tax: 20000 });
    slabs.push({ from: 700001, to: 1000000, rate: 10, tax: 30000 });
    slabs.push({ from: 1000001, to: 1200000, rate: 15, tax: 30000 });
    slabs.push({ from: 1200001, to: 1500000, rate: 20, tax: 60000 });
    slabs.push({ from: 1500001, to: taxableIncome, rate: 30, tax: (taxableIncome - 1500000) * 0.3 });
  }

  const cess = taxPayable * 0.04;
  const totalTax = taxPayable + cess;

  res.json({
    success: true,
    data: {
      annualIncome: parseFloat(annualIncome),
      deductions: parseFloat(deductions),
      taxableIncome: Math.round(taxableIncome * 100) / 100,
      taxPayable: Math.round(taxPayable * 100) / 100,
      cess: Math.round(cess * 100) / 100,
      totalTax: Math.round(totalTax * 100) / 100,
      slabs,
    },
  });
});

// Advance Tax Calculator
export const calculateAdvanceTax = asyncHandler(async (req, res) => {
  const { estimatedIncome, tdsDeducted = 0, previousAdvanceTax = 0 } = req.body;

  if (!estimatedIncome || estimatedIncome < 0) {
    return res.status(400).json({ success: false, message: "Estimated income must be positive" });
  }

  // Calculate tax on estimated income (simplified - using new regime)
  let taxOnEstimated = 0;
  if (estimatedIncome > 300000) {
    if (estimatedIncome <= 700000) {
      taxOnEstimated = (estimatedIncome - 300000) * 0.05;
    } else if (estimatedIncome <= 1000000) {
      taxOnEstimated = 20000 + (estimatedIncome - 700000) * 0.1;
    } else if (estimatedIncome <= 1200000) {
      taxOnEstimated = 50000 + (estimatedIncome - 1000000) * 0.15;
    } else if (estimatedIncome <= 1500000) {
      taxOnEstimated = 80000 + (estimatedIncome - 1200000) * 0.2;
    } else {
      taxOnEstimated = 140000 + (estimatedIncome - 1500000) * 0.3;
    }
  }

  const cess = taxOnEstimated * 0.04;
  const totalTaxLiability = taxOnEstimated + cess;
  const advanceTaxPayable = Math.max(0, totalTaxLiability - tdsDeducted - previousAdvanceTax);

  const installments = {
    q1: Math.round(advanceTaxPayable * 0.15 * 100) / 100,
    q2: Math.round(advanceTaxPayable * 0.3 * 100) / 100,
    q3: Math.round(advanceTaxPayable * 0.3 * 100) / 100,
    q4: Math.round(advanceTaxPayable * 0.25 * 100) / 100,
  };

  res.json({
    success: true,
    data: {
      estimatedIncome: parseFloat(estimatedIncome),
      tdsDeducted: parseFloat(tdsDeducted),
      previousAdvanceTax: parseFloat(previousAdvanceTax),
      taxOnEstimated: Math.round(taxOnEstimated * 100) / 100,
      cess: Math.round(cess * 100) / 100,
      totalTaxLiability: Math.round(totalTaxLiability * 100) / 100,
      advanceTaxPayable: Math.round(advanceTaxPayable * 100) / 100,
      installments,
    },
  });
});
// utils/calculators.js

export const calculateEMI = (P, annualRate, years) => {
  const r = annualRate / 12 / 100;
  const n = years * 12;

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  const interest = total - P;

  return {
    emi: Math.round(emi),
    totalAmount: Math.round(total),
    totalInterest: Math.round(interest),
  };
};

export const calculateSIP = (monthly, rate, years) => {
  const r = rate / 12 / 100;
  const n = years * 12;

  const futureValue =
    monthly *
    ((Math.pow(1 + r, n) - 1) / r) *
    (1 + r);

  return {
    invested: monthly * n,
    value: Math.round(futureValue),
    profit: Math.round(futureValue - monthly * n),
  };
};

export const calculateGST = (amount, rate) => {
  const gst = (amount * rate) / 100;
  return {
    gst,
    total: amount + gst,
  };
};

export const calculateIncomeTax = (income) => {
  let tax = 0;

  if (income <= 300000) tax = 0;
  else if (income <= 600000) tax = income * 0.05;
  else if (income <= 900000) tax = income * 0.1;
  else if (income <= 1200000) tax = income * 0.15;
  else if (income <= 1500000) tax = income * 0.2;
  else tax = income * 0.3;

  return { tax: Math.round(tax) };
};

export const calculateAdvanceTax = (income, paid) => {
  const tax = income * 0.3;
  return {
    totalTax: tax,
    remaining: tax - paid,
  };
};

export const formatINR = (num) => {
  if (!num && num !== 0) return "";
  return Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

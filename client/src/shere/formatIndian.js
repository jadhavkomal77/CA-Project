export const formatIndianNumber = (num) => {
  if (!num) return "";
  return Number(num).toLocaleString("en-IN");
};

export const formatIndianWord = (num) => {
  if (!num) return "";

  num = Number(num);

  if (num >= 10000000) return (num / 10000000).toFixed(2) + " Cr";
  if (num >= 100000) return (num / 100000).toFixed(2) + " Lakh";
  if (num >= 1000) return (num / 1000).toFixed(2) + " Thousand";

  return num;
};

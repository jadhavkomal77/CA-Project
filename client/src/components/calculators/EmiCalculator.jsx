import { useState } from "react";
import { Home, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCalculateEMIMutation } from "../../redux/apis/calculatorApi";

export default function EmiCalculator() {
  const navigate = useNavigate();
  const [calculateEMI, { isLoading }] = useCalculateEMIMutation();

  const [formData, setFormData] = useState({
    loanAmount: "",
    interestRate: "",
    tenureYears: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const response = await calculateEMI({
        loanAmount: parseFloat(formData.loanAmount),
        interestRate: parseFloat(formData.interestRate),
        tenureYears: parseFloat(formData.tenureYears),
      }).unwrap();

      setResult(response.data);
    } catch (err) {
      setError(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Home className="text-blue-700" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Home Loan EMI Calculator
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter loan amount"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Interest Rate (% p.a.)
            </label>
            <input
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter interest rate"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tenure (Years)
            </label>
            <input
              type="number"
              name="tenureYears"
              value={formData.tenureYears}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter tenure"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Calculating..." : "Calculate EMI"}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            EMI Calculation Results
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
              <p className="text-2xl font-bold text-blue-700">
                ₹{result.emi.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Total Interest</p>
              <p className="text-2xl font-bold text-red-600">
                ₹{result.totalInterest.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Total Payment</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{result.totalPayment.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
            <p className="text-sm text-gray-600 mb-2">Loan Details</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Amount:</span>
                <span className="font-semibold">
                  ₹{result.loanAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Rate:</span>
                <span className="font-semibold">{result.interestRate}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tenure:</span>
                <span className="font-semibold">
                  {result.tenureYears} years ({result.tenureMonths} months)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800 flex items-center gap-2">
              <AlertCircle size={16} />
              <span>
                This is an estimate. Consult our CA for exact calculation.
              </span>
            </p>
          </div>

          <button
            onClick={() => navigate("/contact")}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Book Consultation
          </button>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import { TrendingUp, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCalculateSIPMutation } from "../../redux/apis/calculatorApi";

export default function SipCalculator() {
  const navigate = useNavigate();
  const [calculateSIP, { isLoading }] = useCalculateSIPMutation();

  const [formData, setFormData] = useState({
    monthlyInvestment: "",
    expectedReturn: "",
    years: "",
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
      const response = await calculateSIP({
        monthlyInvestment: parseFloat(formData.monthlyInvestment),
        expectedReturn: parseFloat(formData.expectedReturn),
        years: parseFloat(formData.years),
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
          <TrendingUp className="text-blue-700" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">SIP Calculator</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Monthly Investment (₹)
            </label>
            <input
              type="number"
              name="monthlyInvestment"
              value={formData.monthlyInvestment}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter monthly investment"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Expected Return (% p.a.)
            </label>
            <input
              type="number"
              name="expectedReturn"
              value={formData.expectedReturn}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter expected return"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Investment Period (Years)
            </label>
            <input
              type="number"
              name="years"
              value={formData.years}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter years"
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
          {isLoading ? "Calculating..." : "Calculate SIP"}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            SIP Calculation Results
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Total Invested</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{result.totalInvested.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Estimated Returns</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{result.estimatedReturns.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Maturity Value</p>
              <p className="text-2xl font-bold text-blue-700">
                ₹{result.maturityValue.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
            <p className="text-sm text-gray-600 mb-2">Investment Details</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Investment:</span>
                <span className="font-semibold">
                  ₹{result.monthlyInvestment.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Return:</span>
                <span className="font-semibold">{result.expectedReturn}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Investment Period:</span>
                <span className="font-semibold">
                  {result.years} years ({result.months} months)
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
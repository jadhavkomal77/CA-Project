import { useState } from "react";
import { DollarSign, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCalculateGSTMutation } from "../../redux/apis/calculatorApi";

export default function GstCalculator() {
  const navigate = useNavigate();
  const [calculateGST, { isLoading }] = useCalculateGSTMutation();

  const [formData, setFormData] = useState({
    amount: "",
    gstRate: "18",
    isInclusive: false,
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    setError("");
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const response = await calculateGST({
        amount: parseFloat(formData.amount),
        gstRate: parseFloat(formData.gstRate),
        isInclusive: formData.isInclusive,
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
          <DollarSign className="text-blue-700" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">GST Calculator</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              GST Rate (%)
            </label>
            <select
              name="gstRate"
              value={formData.gstRate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isInclusive"
            checked={formData.isInclusive}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="text-sm font-semibold text-gray-700">
            GST is included in the amount
          </label>
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
          {isLoading ? "Calculating..." : "Calculate GST"}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            GST Calculation Results
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Base Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{result.baseAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">GST Amount</p>
              <p className="text-2xl font-bold text-blue-700">
                ₹{result.gstAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">CGST ({result.gstRate / 2}%)</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{result.cgst.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">SGST ({result.gstRate / 2}%)</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{result.sgst.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2">
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-red-600">
                ₹{result.totalAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
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
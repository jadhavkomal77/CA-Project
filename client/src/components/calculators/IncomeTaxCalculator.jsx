import { useState } from "react";
import { Calculator, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCalculateIncomeTaxMutation } from "../../redux/apis/calculatorApi";

export default function IncomeTaxCalculator() {
  const navigate = useNavigate();
  const [calculateIncomeTax, { isLoading }] = useCalculateIncomeTaxMutation();

  const [formData, setFormData] = useState({
    annualIncome: "",
    age: "",
    regime: "old",
    deduction80C: "",
    deduction80D: "",
    otherDeductions: "",
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
      const response = await calculateIncomeTax({
        annualIncome: parseFloat(formData.annualIncome),
        age: parseInt(formData.age),
        regime: formData.regime,
        deduction80C: parseFloat(formData.deduction80C) || 0,
        deduction80D: parseFloat(formData.deduction80D) || 0,
        otherDeductions: parseFloat(formData.otherDeductions) || 0,
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
          <Calculator className="text-blue-700" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Income Tax Calculator
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Annual Income (₹)
            </label>
            <input
              type="number"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter annual income"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your age"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tax Regime
            </label>
            <select
              name="regime"
              value={formData.regime}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="old">Old Regime</option>
              <option value="new">New Regime</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              80C Deduction (₹)
            </label>
            <input
              type="number"
              name="deduction80C"
              value={formData.deduction80C}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter 80C deduction"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              80D Deduction (₹)
            </label>
            <input
              type="number"
              name="deduction80D"
              value={formData.deduction80D}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter 80D deduction"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Other Deductions (₹)
            </label>
            <input
              type="number"
              name="otherDeductions"
              value={formData.otherDeductions}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter other deductions"
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
          {isLoading ? "Calculating..." : "Calculate Tax"}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Tax Calculation Results
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Annual Income</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{result.annualIncome.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Total Deductions</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{result.totalDeductions.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Taxable Income</p>
              <p className="text-2xl font-bold text-blue-700">
                ₹{result.taxableIncome.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Total Tax Payable</p>
              <p className="text-2xl font-bold text-red-600">
                ₹{result.totalTax.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Tax Slab Breakdown</h4>
            <div className="space-y-2">
              {result.slabs.map((slab, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200"
                >
                  <span className="text-sm text-gray-600">
                    ₹{slab.from.toLocaleString("en-IN")} - ₹
                    {slab.to.toLocaleString("en-IN")}
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      {slab.rate}% = ₹{slab.tax.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
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
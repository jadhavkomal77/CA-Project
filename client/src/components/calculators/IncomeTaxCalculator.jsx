import { useState } from "react";
import { Calculator, AlertCircle, CheckCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCalculateIncomeTaxMutation } from "../../redux/apis/calculatorApi";
import FormattedNumberInput from "./FormattedNumberInput";

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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError("");
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await calculateIncomeTax({
        annualIncome: Number(formData.annualIncome),
        age: Number(formData.age),
        regime: formData.regime,
        deduction80C: Number(formData.deduction80C) || 0,
        deduction80D: Number(formData.deduction80D) || 0,
        otherDeductions: Number(formData.otherDeductions) || 0,
      }).unwrap();

      setResult(response.data);
    } catch (err) {
      setError(err?.data?.message || "Calculation failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-xl">
          <Calculator className="text-blue-700" size={26} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Income Tax Calculator
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg space-y-5"
        >

          <FormattedNumberInput
            label="Annual Income (₹)"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
          />

          <div>
            <label className="label">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="input"
              placeholder="Enter age"
              min="1"
            />
          </div>

          <div>
            <label className="label">Tax Regime</label>
            <select
              name="regime"
              value={formData.regime}
              onChange={handleChange}
              className="input"
            >
              <option value="old">Old Regime</option>
              <option value="new">New Regime</option>
            </select>
          </div>

          <FormattedNumberInput
            label="80C Deduction"
            name="deduction80C"
            value={formData.deduction80C}
            onChange={handleChange}
          />

          <FormattedNumberInput
            label="80D Deduction"
            name="deduction80D"
            value={formData.deduction80D}
            onChange={handleChange}
          />

          <FormattedNumberInput
            label="Other Deductions"
            name="otherDeductions"
            value={formData.otherDeductions}
            onChange={handleChange}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex gap-2">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <button
            disabled={isLoading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition"
          >
            {isLoading ? "Calculating..." : "Calculate Tax"}
          </button>
        </form>

        {/* RESULT */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">

          {result ? (
            <>
              <div className="flex items-center gap-2 text-green-700 mb-5">
                <CheckCircle />
                <h3 className="text-xl font-bold">Calculation Result</h3>
              </div>

              <div className="space-y-4">

                <ResultCard title="Taxable Income" value={result.taxableIncome} blue />
                <ResultCard title="Total Tax Payable" value={result.totalTax} red />
                <ResultCard title="Tax Amount" value={result.taxPayable} />
                <ResultCard title="Cess (4%)" value={result.cess} />

              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm text-yellow-800 flex gap-2">
                <Info size={16}/>
                This is estimated value. Contact CA for exact calculation.
              </div>

              <button
                onClick={() => navigate("/contact")}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
              >
                Book Consultation
              </button>
            </>
          ) : (
            <div className="text-center text-gray-400 py-20">
              <Calculator size={48} className="mx-auto mb-3 opacity-50"/>
              Enter details to calculate
            </div>
          )}
        </div>

      </div>
    </div>
  );
}


/* Result Card */
function ResultCard({ title, value, blue, red }) {
  return (
    <div className="p-4 rounded-xl border bg-gray-50">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-2xl font-bold mt-1
        ${blue ? "text-blue-700" : ""}
        ${red ? "text-red-600" : ""}
      `}>
        ₹ {Number(value).toLocaleString("en-IN")}
      </p>
    </div>
  );
}








// import { useState } from "react";
// import { Calculator, AlertCircle, CheckCircle, Info } from "lucide-react";

// import { useCalculateIncomeTaxMutation } from "../../redux/apis/calculatorApi";

// export default function IncomeTaxCalculator() {
//   const [calculateIncomeTax, { isLoading }] = useCalculateIncomeTaxMutation();
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [showContactForm, setShowContactForm] = useState(false);

//   const [formData, setFormData] = useState({
//     annualIncome: "",
//     age: "",
//     regime: "old",
//     deduction80C: "",
//     deduction80D: "",
//     otherDeductions: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//     setResult(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setResult(null);

//     try {
//       const response = await calculateIncomeTax({
//         annualIncome: parseFloat(formData.annualIncome.replace(/,/g, "")) || 0,
//         age: parseInt(formData.age.replace(/,/g, "")) || 0,
//         regime: formData.regime,
//         deduction80C: parseFloat(formData.deduction80C.replace(/,/g, "")) || 0,
//         deduction80D: parseFloat(formData.deduction80D.replace(/,/g, "")) || 0,
//         otherDeductions: parseFloat(formData.otherDeductions.replace(/,/g, "")) || 0,
//       }).unwrap();

//       setResult(response.data);
//     } catch (err) {
//       setError(err?.data?.message || "Calculation failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl shadow-xl p-8 mb-8 text-white">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-white/20 rounded-xl">
//               <Calculator size={32} />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold">Income Tax Calculator</h1>
//               <p className="text-blue-100 mt-1">
//                 Calculate your income tax for Old & New regime
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Form */}
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <FormattedNumberInput
//                 label="Annual Income (₹)"
//                 name="annualIncome"
//                 value={formData.annualIncome}
//                 onChange={handleChange}
//                 required
//                 min={0}
//                 placeholder="Enter annual income"
//                 showBreakdown={true}
//               />

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Age * <span className="text-gray-400 text-xs">(1-120)</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="age"
//                   value={formData.age}
//                   onChange={handleChange}
//                   required
//                   min="1"
//                   max="120"
//                   className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Tax Regime *
//                 </label>
//                 <select
//                   name="regime"
//                   value={formData.regime}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="old">Old Regime</option>
//                   <option value="new">New Regime</option>
//                 </select>
//               </div>

//               <FormattedNumberInput
//                 label="80C Deduction (₹)"
//                 name="deduction80C"
//                 value={formData.deduction80C}
//                 onChange={handleChange}
//                 min={0}
//                 placeholder="Enter 80C deduction"
//                 showBreakdown={true}
//               />

//               <FormattedNumberInput
//                 label="80D Deduction (₹)"
//                 name="deduction80D"
//                 value={formData.deduction80D}
//                 onChange={handleChange}
//                 min={0}
//                 placeholder="Enter 80D deduction"
//                 showBreakdown={true}
//               />

//               <FormattedNumberInput
//                 label="Other Deductions (₹)"
//                 name="otherDeductions"
//                 value={formData.otherDeductions}
//                 onChange={handleChange}
//                 min={0}
//                 placeholder="Enter other deductions"
//                 showBreakdown={true}
//               />

//               {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
//                   <AlertCircle size={20} />
//                   <span>{error}</span>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
//               >
//                 {isLoading ? "Calculating..." : "Calculate Tax"}
//               </button>
//             </form>
//           </div>

//           {/* Result */}
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             {result ? (
//               <div className="space-y-4">
//                 <div className="flex items-center gap-2 text-green-700 mb-4">
//                   <CheckCircle size={24} />
//                   <h3 className="text-xl font-bold">Calculation Result</h3>
//                 </div>

//                 <div className="space-y-3">
//                   {/* Taxable Income */}
//                   <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//                     <p className="text-sm text-gray-600 mb-1">Taxable Income</p>
//                     <p className="text-2xl font-bold text-blue-700 mb-2">
//                       ₹{formatIndianNumber(result.taxableIncome)}
//                     </p>
//                     <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
//                       <Info size={14} />
//                       <span>{getIndianNumberBreakdown(result.taxableIncome).breakdown}</span>
//                     </div>
//                   </div>

//                   {/* Total Tax Payable */}
//                   <div className="bg-red-50 p-4 rounded-lg border border-red-200">
//                     <p className="text-sm text-gray-600 mb-1">Total Tax Payable</p>
//                     <p className="text-2xl font-bold text-red-700 mb-2">
//                       ₹{formatIndianNumber(result.totalTax)}
//                     </p>
//                     <div className="flex items-center gap-2 text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
//                       <Info size={14} />
//                       <span>{getIndianNumberBreakdown(result.totalTax).breakdown}</span>
//                     </div>
//                   </div>

//                   {/* Tax Amount */}
//                   <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                     <p className="text-sm text-gray-600 mb-1">Tax Amount</p>
//                     <p className="text-xl font-semibold text-gray-900 mb-2">
//                       ₹{formatIndianNumber(result.taxPayable)}
//                     </p>
//                     <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
//                       <Info size={14} />
//                       <span>{getIndianNumberBreakdown(result.taxPayable).breakdown}</span>
//                     </div>
//                   </div>

//                   {/* Cess */}
//                   <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                     <p className="text-sm text-gray-600 mb-1">Cess (4%)</p>
//                     <p className="text-xl font-semibold text-gray-900 mb-2">
//                       ₹{formatIndianNumber(result.cess)}
//                     </p>
//                     <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
//                       <Info size={14} />
//                       <span>{getIndianNumberBreakdown(result.cess).breakdown}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
//                   <p className="text-sm text-yellow-800 flex items-center gap-2">
//                     <AlertCircle size={16} />
//                     <span>
//                       This is an estimate. For detailed report, please contact
//                       us.
//                     </span>
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => setShowContactForm(true)}
//                   className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors"
//                 >
//                   Request Detailed Report
//                 </button>
//               </div>
//             ) : (
//               <div className="text-center py-12 text-gray-400">
//                 <Calculator size={48} className="mx-auto mb-4 opacity-50" />
//                 <p>Enter details and calculate to see results</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

      
//     </div>
//   );
// }
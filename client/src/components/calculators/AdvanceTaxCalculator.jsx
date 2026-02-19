// import { useState } from "react";
// import { Landmark, AlertCircle, CheckCircle, Info } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useCalculateAdvanceTaxMutation } from "../../redux/apis/calculatorApi";
// import FormattedNumberInput from "./FormattedNumberInput";

// export default function AdvanceTaxCalculator() {
//   const navigate = useNavigate();
//   const [calculate, { isLoading }] = useCalculateAdvanceTaxMutation();

//   const [form, setForm] = useState({
//     estimatedIncome: "",
//     tdsDeducted: "",
//     previousAdvanceTax: "",
//   });

//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//     setError("");
//     setResult(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await calculate({
//         estimatedIncome: Number(form.estimatedIncome),
//         tdsDeducted: Number(form.tdsDeducted) || 0,
//         previousAdvanceTax: Number(form.previousAdvanceTax) || 0,
//       }).unwrap();

//       setResult(res.data);
//     } catch (err) {
//       setError(err?.data?.message || "Calculation failed");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto">

//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-8">
//         <div className="p-3 bg-indigo-100 rounded-xl">
//           <Landmark className="text-indigo-700" size={26}/>
//         </div>
//         <h2 className="text-3xl font-bold text-gray-900">
//           Advance Tax Calculator
//         </h2>
//       </div>

//       <div className="grid md:grid-cols-2 gap-8">

//         {/* FORM */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded-2xl shadow-lg space-y-5"
//         >

//           <FormattedNumberInput
//             label="Estimated Annual Income (₹)"
//             name="estimatedIncome"
//             value={form.estimatedIncome}
//             onChange={handleChange}
//           />

//           <FormattedNumberInput
//             label="TDS Deducted (₹)"
//             name="tdsDeducted"
//             value={form.tdsDeducted}
//             onChange={handleChange}
//           />

//           <FormattedNumberInput
//             label="Previous Advance Tax Paid (₹)"
//             name="previousAdvanceTax"
//             value={form.previousAdvanceTax}
//             onChange={handleChange}
//           />

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex gap-2">
//               <AlertCircle size={18}/> {error}
//             </div>
//           )}

//           <button
//             disabled={isLoading}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
//           >
//             {isLoading ? "Calculating..." : "Calculate Advance Tax"}
//           </button>
//         </form>

//         {/* RESULT */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg">

//           {result ? (
//             <>
//               <div className="flex items-center gap-2 text-green-700 mb-5">
//                 <CheckCircle />
//                 <h3 className="text-xl font-bold">Tax Result</h3>
//               </div>

//               <ResultCard title="Tax on Estimated Income" value={result.taxOnEstimated}/>
//               <ResultCard title="Cess (4%)" value={result.cess}/>
//               <ResultCard title="Total Tax Liability" value={result.totalTaxLiability} blue/>
//               <ResultCard title="Advance Tax Payable" value={result.advanceTaxPayable} green/>

//               {/* INSTALLMENTS */}
//               <div className="mt-6">
//                 <h4 className="font-semibold mb-3 flex items-center gap-2">
//                   <Info size={18}/> Installment Schedule
//                 </h4>

//                 <Installment label="Q1 (15%)" value={result.installments.q1}/>
//                 <Installment label="Q2 (45%)" value={result.installments.q2}/>
//                 <Installment label="Q3 (75%)" value={result.installments.q3}/>
//                 <Installment label="Q4 (100%)" value={result.installments.q4}/>
//               </div>

//               {/* CTA */}
//               <button
//                 onClick={() => navigate("/contact")}
//                 className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold"
//               >
//                 Consult Tax Expert
//               </button>
//             </>
//           ) : (
//             <div className="text-center text-gray-400 py-20">
//               <Landmark size={48} className="mx-auto mb-3 opacity-50"/>
//               Enter details to calculate advance tax
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }


// /* Result Card */
// function ResultCard({ title, value, blue, green }) {
//   return (
//     <div className="p-4 rounded-xl border bg-gray-50 mb-4">
//       <p className="text-sm text-gray-500">{title}</p>
//       <p className={`text-2xl font-bold mt-1
//         ${blue ? "text-blue-700" : ""}
//         ${green ? "text-green-600" : ""}
//       `}>
//         ₹ {Number(value).toLocaleString("en-IN")}
//       </p>
//     </div>
//   );
// }

// /* Installment Row */
// function Installment({ label, value }) {
//   return (
//     <div className="flex justify-between border rounded-lg px-4 py-3 mb-2 bg-gray-50">
//       <span className="font-medium">{label}</span>
//       <span className="font-semibold text-indigo-700">
//         ₹ {Number(value).toLocaleString("en-IN")}
//       </span>
//     </div>
//   );
// }



import { useState } from "react";
import { Calculator, AlertCircle } from "lucide-react";
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <h2 className="text-3xl font-bold text-slate-900">
          Income Tax Calculator
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-5"
        >
          <FormattedNumberInput
            label="Annual Income (₹)"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            placeholder="Enter annual income"
          />

          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 block">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 block">
              Tax Regime
            </label>
            <select
              name="regime"
              value={formData.regime}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
            >
              <option value="old">Old Regime</option>
              <option value="new">New Regime</option>
            </select>
          </div>

          <FormattedNumberInput
            label="80C Deduction (₹)"
            name="deduction80C"
            value={formData.deduction80C}
            onChange={handleChange}
          />

          <FormattedNumberInput
            label="80D Deduction (₹)"
            name="deduction80D"
            value={formData.deduction80D}
            onChange={handleChange}
          />

          <FormattedNumberInput
            label="Other Deductions (₹)"
            name="otherDeductions"
            value={formData.otherDeductions}
            onChange={handleChange}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex gap-2">
              <AlertCircle size={18} />
              {error}
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
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">

          {result ? (
            <>
              <h3 className="text-xl font-bold text-slate-800 mb-5">
                Calculation Result
              </h3>

              <Result title="Annual Income" value={result.annualIncome} />
              <Result title="Total Deductions" value={result.totalDeductions} />
              <Result title="Taxable Income" value={result.taxableIncome} blue />
              <Result title="Total Tax Payable" value={result.totalTax} red />

              <button
                onClick={() => navigate("/contact")}
                className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold"
              >
                Book Consultation
              </button>
            </>
          ) : (
            <div className="text-center text-slate-400 py-20">
              <Calculator size={48} className="mx-auto mb-3 opacity-40" />
              Enter details to calculate tax
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

/* RESULT CARD */
function Result({ title, value, blue, red }) {
  return (
    <div className="p-4 rounded-xl border bg-slate-50 mb-4">
      <p className="text-sm text-slate-500">{title}</p>
      <p
        className={`text-2xl font-bold mt-1
        ${blue ? "text-blue-700" : ""}
        ${red ? "text-red-600" : ""}
      `}
      >
        ₹ {Number(value).toLocaleString("en-IN")}
      </p>
    </div>
  );
}

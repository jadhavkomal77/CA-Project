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
import { Landmark, AlertCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCalculateAdvanceTaxMutation } from "../../redux/apis/calculatorApi";

export default function AdvanceTaxCalculator() {

  const navigate = useNavigate();
  const [calculate, { isLoading }] = useCalculateAdvanceTaxMutation();

  const [formData, setFormData] = useState({
    estimatedIncome: "",
    tdsDeducted: "",
    previousAdvanceTax: "",
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
      const response = await calculate({
        estimatedIncome: Number(formData.estimatedIncome),
        tdsDeducted: Number(formData.tdsDeducted) || 0,
        previousAdvanceTax: Number(formData.previousAdvanceTax) || 0,
      }).unwrap();

      setResult(response.data);
    } catch (err) {
      setError(err?.data?.message || "Calculation failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
        <Landmark className="text-blue-600"/>
        Advance Tax Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* LEFT PANEL */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white rounded-2xl shadow-lg p-6"
        >

          <SliderInput
            label="Estimated Income"
            name="estimatedIncome"
            value={formData.estimatedIncome}
            onChange={handleChange}
            max={5000000}
          />

          <SliderInput
            label="TDS Deducted"
            name="tdsDeducted"
            value={formData.tdsDeducted}
            onChange={handleChange}
            max={1000000}
          />

          <SliderInput
            label="Advance Tax Paid"
            name="previousAdvanceTax"
            value={formData.previousAdvanceTax}
            onChange={handleChange}
            max={1000000}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex gap-2">
              <AlertCircle size={18}/> {error}
            </div>
          )}

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {isLoading ? "Calculating..." : "Calculate Tax"}
          </button>

        </form>


        {/* RESULT PANEL */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          {result ? (
            <>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Calculation Summary
              </h3>

              <div className="space-y-4">
                <ResultItem label="Tax on Income" value={result.taxOnEstimated}/>
                <ResultItem label="Cess (4%)" value={result.cess}/>
                <ResultItem label="Total Tax Liability" value={result.totalTaxLiability}/>
                <ResultItem label="Advance Tax Payable" value={result.advanceTaxPayable}/>
              </div>

              {/* Installments */}
              <div className="mt-6 bg-yellow-100 border border-yellow-300 p-4 rounded-lg text-sm text-yellow-700 flex gap-2">
                <Info size={16}/>
                Installments → Q1: ₹{result.installments.q1.toLocaleString()} | 
                Q2: ₹{result.installments.q2.toLocaleString()} | 
                Q3: ₹{result.installments.q3.toLocaleString()} | 
                Q4: ₹{result.installments.q4.toLocaleString()}
              </div>

              <button
                onClick={() => navigate("/contact")}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                Book Consultation
              </button>
            </>
          ) : (
            <div className="text-center text-gray-400 py-20">
              <Landmark size={48} className="mx-auto mb-3 opacity-50"/>
              Enter details to calculate
            </div>
          )}
        </div>

      </div>
    </div>
  );
}



/* SLIDER INPUT */
function SliderInput({label,name,value,onChange,min=0,max=1000000}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-blue-600 font-semibold">
          ₹ {Number(value || 0).toLocaleString("en-IN")}
        </span>
      </div>

      <input
        type="range"
        name={name}
        min={min}
        max={max}
        value={value || 0}
        onChange={onChange}
        className="w-full accent-blue-600"
      />
    </div>
  );
}


/* RESULT ITEM */
function ResultItem({label,value}) {
  return (
    <div className="flex justify-between border-b pb-2">
      <p className="text-gray-600">{label}</p>
      <p className="font-semibold text-gray-900">
        ₹ {Number(value).toLocaleString("en-IN")}
      </p>
    </div>
  );
}
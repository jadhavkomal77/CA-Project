
// import { useState } from "react";
// import { IndianRupee, AlertCircle, CheckCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useCalculateGSTMutation } from "../../redux/apis/calculatorApi";
// import FormattedNumberInput from "./FormattedNumberInput";

// export default function GstCalculator() {
//   const navigate = useNavigate();
//   const [calculateGST, { isLoading }] = useCalculateGSTMutation();

//   const [form, setForm] = useState({
//     amount: "",
//     gstRate: "",
//     isInclusive: false,
//   });

//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setForm(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     setError("");
//     setResult(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await calculateGST({
//         amount: Number(form.amount),
//         gstRate: Number(form.gstRate),
//         isInclusive: form.isInclusive,
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
//         <div className="p-3 bg-blue-100 rounded-xl">
//           <IndianRupee className="text-blue-700" size={26} />
//         </div>
//         <h2 className="text-3xl font-bold text-slate-900">
//           GST Calculator
//         </h2>
//       </div>

//       <div className="grid md:grid-cols-2 gap-8">

//         {/* FORM CARD */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 space-y-5"
//         >

//           <FormattedNumberInput
//             label="Amount (₹)"
//             name="amount"
//             value={form.amount}
//             onChange={handleChange}
//           />

//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               GST Rate (%)
//             </label>
//             <input
//               type="number"
//               name="gstRate"
//               value={form.gstRate}
//               onChange={handleChange}
//               placeholder="Enter GST %"
//               className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
//             <input
//               type="checkbox"
//               name="isInclusive"
//               checked={form.isInclusive}
//               onChange={handleChange}
//               className="accent-blue-600 w-4 h-4"
//             />
//             GST Included in Amount
//           </label>

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex gap-2">
//               <AlertCircle size={18} />
//               {error}
//             </div>
//           )}

//           <button
//             disabled={isLoading}
//             className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition"
//           >
//             {isLoading ? "Calculating..." : "Calculate GST"}
//           </button>

//         </form>

//         {/* RESULT CARD */}
//         <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">

//           {result ? (
//             <>
//               <div className="flex items-center gap-2 text-blue-700 mb-5">
//                 <CheckCircle />
//                 <h3 className="text-xl font-bold">Calculation Result</h3>
//               </div>

//               <ResultCard title="Base Amount" value={result.baseAmount} />
//               <ResultCard title="GST Amount" value={result.gstAmount} highlight />
//               <ResultCard title="CGST" value={result.cgst} />
//               <ResultCard title="SGST" value={result.sgst} />
//               <ResultCard title="Total Amount" value={result.totalAmount} total />

//               {/* CTA */}
//               <button
//                 onClick={() => navigate("/contact")}
//                 className="mt-6 w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:opacity-90 text-white py-3 rounded-xl font-semibold"
//               >
//                 Book Consultation
//               </button>
//             </>
//           ) : (
//             <div className="text-center text-slate-400 py-20">
//               <IndianRupee size={48} className="mx-auto mb-3 opacity-40"/>
//               Enter values to calculate GST
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }


// /* RESULT CARD */
// function ResultCard({ title, value, highlight, total }) {
//   return (
//     <div className="p-4 rounded-xl border bg-slate-50 mb-4">
//       <p className="text-sm text-slate-500">{title}</p>

//       <p className={`
//         text-2xl font-bold mt-1
//         ${highlight ? "text-blue-700" : ""}
//         ${total ? "text-blue-900" : ""}
//       `}>
//         ₹ {Number(value).toLocaleString("en-IN")}
//       </p>
//     </div>
//   );
// }





import { useState } from "react";
import { Calculator, AlertCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCalculateGSTMutation } from "../../redux/apis/calculatorApi";
import FormattedNumberInput from "./FormattedNumberInput";

export default function GstCalculator() {

  const navigate = useNavigate();
  const [calculateGST, { isLoading }] = useCalculateGSTMutation();

  const [form, setForm] = useState({
    amount: "",
    gstRate: "",
    isInclusive: false,
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await calculateGST({
        amount: Number(form.amount),
        gstRate: Number(form.gstRate),
        isInclusive: form.isInclusive,
      }).unwrap();

      setResult(res.data);
    } catch (err) {
      setError(err?.data?.message || "Calculation failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
        <Calculator className="text-blue-600"/>
        GST Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* FORM PANEL */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white rounded-2xl shadow-lg p-6"
        >

          <FormattedNumberInput
            label="Amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />

          <div>
            <label className="text-sm font-medium mb-1 block">
              GST Rate (%)
            </label>
            <input
              type="number"
              name="gstRate"
              value={form.gstRate}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter GST %"
            />
          </div>

          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="isInclusive"
              checked={form.isInclusive}
              onChange={handleChange}
              className="accent-blue-600 w-4 h-4"
            />
            GST Included in Amount
          </label>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex gap-2">
              <AlertCircle size={18}/> {error}
            </div>
          )}

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {isLoading ? "Calculating..." : "Calculate GST"}
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
                <ResultItem label="Base Amount" value={result.baseAmount}/>
                <ResultItem label="GST Amount" value={result.gstAmount}/>
                <ResultItem label="CGST" value={result.cgst}/>
                <ResultItem label="SGST" value={result.sgst}/>
                <ResultItem label="Total Amount" value={result.totalAmount}/>
              </div>

              <div className="mt-6 bg-yellow-100 border border-yellow-300 p-4 rounded-lg text-sm text-yellow-700 flex gap-2">
                <Info size={16}/>
                This is estimated value. Contact CA for exact calculation.
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
              <Calculator size={48} className="mx-auto mb-3 opacity-50"/>
              Enter details to calculate
            </div>
          )}
        </div>

      </div>
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
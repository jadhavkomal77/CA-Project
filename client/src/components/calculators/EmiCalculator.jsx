

// import { useState } from "react";
// import { Home, AlertCircle, CheckCircle } from "lucide-react";
// import { useCalculateEMIMutation } from "../../redux/apis/calculatorApi";
// import { useNavigate } from "react-router-dom";
// import FormattedNumberInput from "./FormattedNumberInput";

// export default function EmiCalculator() {
//   const navigate = useNavigate();
//   const [calculateEMI, { isLoading }] = useCalculateEMIMutation();

//   const [form, setForm] = useState({
//     loanAmount: "",
//     interestRate: "",
//     tenureYears: "",
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
//       const res = await calculateEMI({
//         loanAmount: Number(form.loanAmount),
//         interestRate: Number(form.interestRate),
//         tenureYears: Number(form.tenureYears),
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
//         <div className="p-3 bg-emerald-100 rounded-xl">
//           <Home className="text-emerald-700" size={26}/>
//         </div>
//         <h2 className="text-3xl font-bold text-gray-900">
//           EMI Calculator
//         </h2>
//       </div>

//       <div className="grid md:grid-cols-2 gap-8">

//         {/* FORM */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded-2xl shadow-lg space-y-5"
//         >
//           <FormattedNumberInput
//             label="Loan Amount (₹)"
//             name="loanAmount"
//             value={form.loanAmount}
//             onChange={handleChange}
//           />

//           <div>
//             <label className="label">Interest Rate (%)</label>
//             <input
//               type="number"
//               name="interestRate"
//               value={form.interestRate}
//               onChange={handleChange}
//               className="input"
//               placeholder="Enter interest rate"
//             />
//           </div>

//           <div>
//             <label className="label">Loan Tenure (Years)</label>
//             <input
//               type="number"
//               name="tenureYears"
//               value={form.tenureYears}
//               onChange={handleChange}
//               className="input"
//               placeholder="Enter years"
//             />
//           </div>

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex gap-2">
//               <AlertCircle size={18}/> {error}
//             </div>
//           )}

//           <button
//             disabled={isLoading}
//             className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition"
//           >
//             {isLoading ? "Calculating..." : "Calculate EMI"}
//           </button>
//         </form>

//         {/* RESULT */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg">

//           {result ? (
//             <>
//               <div className="flex items-center gap-2 text-green-700 mb-5">
//                 <CheckCircle />
//                 <h3 className="text-xl font-bold">Loan Summary</h3>
//               </div>

//               <Card title="Monthly EMI" value={result.emi} big green/>
//               <Card title="Total Interest" value={result.totalInterest}/>
//               <Card title="Total Payment" value={result.totalPayment} blue/>
//               <Card title="Principal Amount" value={result.principal}/>

//               <button
//                 onClick={() => navigate("/contact")}
//                 className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold"
//               >
//                 Get Loan Consultation
//               </button>
//             </>
//           ) : (
//             <div className="text-center text-gray-400 py-20">
//               <Home size={48} className="mx-auto mb-3 opacity-50"/>
//               Enter loan details to calculate EMI
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }


// /* Result Card */
// function Card({ title, value, big, green, blue }) {
//   return (
//     <div className="p-4 rounded-xl border bg-gray-50 mb-4">
//       <p className="text-sm text-gray-500">{title}</p>
//       <p className={`mt-1 font-bold
//         ${big ? "text-3xl" : "text-2xl"}
//         ${green ? "text-green-600" : ""}
//         ${blue ? "text-blue-700" : ""}
//       `}>
//         ₹ {Number(value).toLocaleString("en-IN")}
//       </p>
//     </div>
//   );
// }


import { useState } from "react";
import { Home, AlertCircle, CheckCircle } from "lucide-react";
import { useCalculateEMIMutation } from "../../redux/apis/calculatorApi";
import { useNavigate } from "react-router-dom";
import FormattedNumberInput from "./FormattedNumberInput";

export default function EmiCalculator() {
  const navigate = useNavigate();
  const [calculateEMI, { isLoading }] = useCalculateEMIMutation();

  const [form, setForm] = useState({
    loanAmount: "",
    interestRate: "",
    tenureYears: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError("");
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await calculateEMI({
        loanAmount: Number(form.loanAmount),
        interestRate: Number(form.interestRate),
        tenureYears: Number(form.tenureYears),
      }).unwrap();

      setResult(res.data);
    } catch (err) {
      setError(err?.data?.message || "Calculation failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-xl">
          <Home className="text-blue-700" size={26}/>
        </div>
        <h2 className="text-3xl font-bold text-slate-800">
          EMI Calculator
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md border space-y-5"
        >
          <FormattedNumberInput
            label="Loan Amount (₹)"
            name="loanAmount"
            value={form.loanAmount}
            onChange={handleChange}
          />

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">
              Interest Rate (%)
            </label>
            <input
              type="number"
              name="interestRate"
              value={form.interestRate}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter interest rate"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              name="tenureYears"
              value={form.tenureYears}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter years"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex gap-2">
              <AlertCircle size={18}/> {error}
            </div>
          )}

          <button
            disabled={isLoading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition"
          >
            {isLoading ? "Calculating..." : "Calculate EMI"}
          </button>
        </form>

        {/* RESULT */}
        <div className="bg-white p-6 rounded-2xl shadow-md border">

          {result ? (
            <>
              <div className="flex items-center gap-2 text-blue-700 mb-5">
                <CheckCircle />
                <h3 className="text-xl font-bold">Loan Summary</h3>
              </div>

              <Card title="Monthly EMI" value={result.emi} big highlight/>
              <Card title="Total Interest" value={result.totalInterest}/>
              <Card title="Total Payment" value={result.totalPayment} blue/>
              <Card title="Principal Amount" value={result.principal}/>

              <button
                onClick={() => navigate("/contact")}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                Get Loan Consultation
              </button>
            </>
          ) : (
            <div className="text-center text-gray-400 py-20">
              <Home size={48} className="mx-auto mb-3 opacity-40"/>
              Enter loan details to calculate EMI
            </div>
          )}
        </div>

      </div>
    </div>
  );
}


/* Result Card */
function Card({ title, value, big, highlight, blue }) {
  return (
    <div className="p-4 rounded-xl border bg-slate-50 mb-4">
      <p className="text-sm text-slate-500">{title}</p>
      <p className={`mt-1 font-bold
        ${big ? "text-3xl" : "text-2xl"}
        ${highlight ? "text-blue-700" : ""}
        ${blue ? "text-blue-700" : ""}
      `}>
        ₹ {Number(value).toLocaleString("en-IN")}
      </p>
    </div>
  );
}

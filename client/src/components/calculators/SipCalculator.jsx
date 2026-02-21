
// import { useState } from "react";
// import { TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import FormattedNumberInput from "./FormattedNumberInput";
// import { useCalculateSIPMutation } from "../../redux/apis/calculatorApi";

// export default function SipCalculator() {
//   const navigate = useNavigate();
//   const [calculateSIP, { isLoading }] = useCalculateSIPMutation();

//   const [form, setForm] = useState({
//     monthlyInvestment: "",
//     expectedReturn: "",
//     years: "",
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
//       const res = await calculateSIP({
//         monthlyInvestment: Number(form.monthlyInvestment),
//         expectedReturn: Number(form.expectedReturn),
//         years: Number(form.years),
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
//           <TrendingUp className="text-blue-700" size={26}/>
//         </div>
//         <h2 className="text-3xl font-bold text-slate-800">
//           SIP Calculator
//         </h2>
//       </div>

//       <div className="grid md:grid-cols-2 gap-8">

//         {/* FORM */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-5"
//         >
//           <FormattedNumberInput
//             label="Monthly Investment (₹)"
//             name="monthlyInvestment"
//             value={form.monthlyInvestment}
//             onChange={handleChange}
//           />

//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               Expected Return (%)
//             </label>
//             <input
//               type="number"
//               name="expectedReturn"
//               value={form.expectedReturn}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
//               placeholder="Expected return rate"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               Investment Period (Years)
//             </label>
//             <input
//               type="number"
//               name="years"
//               value={form.years}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
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
//             className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition"
//           >
//             {isLoading ? "Calculating..." : "Calculate SIP"}
//           </button>
//         </form>

//         {/* RESULT */}
//         <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">

//           {result ? (
//             <>
//               <div className="flex items-center gap-2 text-black mb-5">
//                 <CheckCircle />
//                 <h3 className="text-xl font-bold">Investment Result</h3>
//               </div>

//               <Card title="Maturity Value" value={result.maturityValue} big highlight/>
//               <Card title="Total Invested" value={result.totalInvested}/>
//               <Card title="Estimated Returns" value={result.estimatedReturns}/>

//               <button
//                 onClick={() => navigate("/contact")}
//                 className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold"
//               >
//                 Get Investment Advice
//               </button>
//             </>
//           ) : (
//             <div className="text-center text-slate-400 py-20">
//               <TrendingUp size={48} className="mx-auto mb-3 opacity-50"/>
//               Enter SIP details to calculate returns
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }


// /* RESULT CARD */
// function Card({ title, value, big, highlight }) {
//   return (
//     <div className="p-4 rounded-xl border bg-slate-50 mb-4">
//       <p className="text-sm text-slate-500">{title}</p>
//       <p className={`mt-1 font-bold
//         ${big ? "text-3xl text-blue-700" : "text-2xl text-slate-800"}
//         ${highlight ? "text-blue-700" : ""}
//       `}>
//         ₹ {Number(value).toLocaleString("en-IN")}
//       </p>
//     </div>
//   );
// }



import { useState } from "react";
import { TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FormattedNumberInput from "./FormattedNumberInput";
import { useCalculateSIPMutation } from "../../redux/apis/calculatorApi";

export default function SipCalculator() {
  const navigate = useNavigate();
  const [calculateSIP, { isLoading }] = useCalculateSIPMutation();

  const [form, setForm] = useState({
    monthlyInvestment: "",
    expectedReturn: "",
    years: "",
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
      const res = await calculateSIP({
        monthlyInvestment: Number(form.monthlyInvestment),
        expectedReturn: Number(form.expectedReturn),
        years: Number(form.years),
      }).unwrap();

      setResult(res.data);
    } catch (err) {
      setError(err?.data?.message || "Calculation failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto"
    >

      {/* HEADER */}
      <motion.div
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="p-3 bg-blue-100 rounded-xl">
          <TrendingUp className="text-blue-700" size={26}/>
        </div>

        <h2 className="text-3xl font-bold text-black">
          SIP Calculator
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white p-6 rounded-2xl shadow-md space-y-5"
        >
          <FormattedNumberInput
            label="Monthly Investment (₹)"
            name="monthlyInvestment"
            value={form.monthlyInvestment}
            onChange={handleChange}
                placeholder="monthly Investment"
          />

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Expected Return (%)
            </label>
            <input
              type="number"
              name="expectedReturn"
              value={form.expectedReturn}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
              placeholder="Expected return rate"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Investment Period (Years)
            </label>
            <input
              type="number"
              name="years"
              value={form.years}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
              placeholder="Enter years"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex gap-2">
              <AlertCircle size={18}/> {error}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            disabled={isLoading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold"
          >
            {isLoading ? "Calculating..." : "Calculate SIP"}
          </motion.button>
        </motion.form>

        {/* RESULT */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white p-6 rounded-2xl shadow-md"
        >

          {result ? (
            <>
              <div className="flex items-center gap-2 text-blue-700 mb-5">
                <CheckCircle />
                <h3 className="text-xl font-bold">Investment Result</h3>
              </div>

              <Card title="Maturity Value" value={result.maturityValue} big highlight/>
              <Card title="Total Invested" value={result.totalInvested}/>
              <Card title="Estimated Returns" value={result.estimatedReturns}/>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact")}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                Get Investment Advice
              </motion.button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 py-20"
            >
              <TrendingUp size={48} className="mx-auto mb-3 opacity-40"/>
              Enter SIP details to calculate returns
            </motion.div>
          )}
        </motion.div>

      </div>
    </motion.div>
  );
}


/* RESULT CARD */
function Card({ title, value, big, highlight }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-xl mb-4 transition
      ${highlight ? "shadow-lg bg-blue-50" : "shadow-sm bg-white"}`}
    >
      <p className="text-sm text-slate-500">{title}</p>

      <p className={`mt-1 font-bold
        ${big ? "text-3xl text-blue-700" : "text-2xl text-slate-800"}`}
      >
        ₹ {Number(value).toLocaleString("en-IN")}
      </p>
    </motion.div>
  );
}
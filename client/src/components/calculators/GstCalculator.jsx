

// import { useState } from "react";
// import { Calculator, AlertCircle, Info } from "lucide-react";
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
//     <div className="max-w-5xl mx-auto py-10 px-4">

//       {/* HEADER */}
//       <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
//         <Calculator className="text-blue-600"/>
//         GST Calculator
//       </h1>

//       <div className="grid md:grid-cols-2 gap-8">

//         {/* FORM PANEL */}
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6 bg-white rounded-2xl shadow-lg p-6"
//         >

//           <FormattedNumberInput
//             label="Amount"
//             name="amount"
//             value={form.amount}
//             onChange={handleChange}
//           />

//           <div>
//             <label className="text-sm font-medium mb-1 block">
//               GST Rate (%)
//             </label>
//             <input
//               type="number"
//               name="gstRate"
//               value={form.gstRate}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter GST %"
//             />
//           </div>

//           <label className="flex items-center gap-2 text-sm font-medium">
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
//               <AlertCircle size={18}/> {error}
//             </div>
//           )}

//           <button
//             disabled={isLoading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
//           >
//             {isLoading ? "Calculating..." : "Calculate GST"}
//           </button>

//         </form>

//         {/* RESULT PANEL */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">

//           {result ? (
//             <>
//               <h3 className="text-xl font-bold text-gray-800 mb-6">
//                 Calculation Summary
//               </h3>

//               <div className="space-y-4">
//                 <ResultItem label="Base Amount" value={result.baseAmount}/>
//                 <ResultItem label="GST Amount" value={result.gstAmount}/>
//                 <ResultItem label="CGST" value={result.cgst}/>
//                 <ResultItem label="SGST" value={result.sgst}/>
//                 <ResultItem label="Total Amount" value={result.totalAmount}/>
//               </div>

//               <div className="mt-6 bg-yellow-100 border border-yellow-300 p-4 rounded-lg text-sm text-yellow-700 flex gap-2">
//                 <Info size={16}/>
//                 This is estimated value. Contact CA for exact calculation.
//               </div>

//               <button
//                 onClick={() => navigate("/contact")}
//                 className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
//               >
//                 Book Consultation
//               </button>
//             </>
//           ) : (
//             <div className="text-center text-gray-400 py-20">
//               <Calculator size={48} className="mx-auto mb-3 opacity-50"/>
//               Enter details to calculate
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }
// /* RESULT ITEM */
// function ResultItem({label,value}) {
//   return (
//     <div className="flex justify-between border-b pb-2">
//       <p className="text-gray-600">{label}</p>
//       <p className="font-semibold text-gray-900">
//         ₹ {Number(value).toLocaleString("en-IN")}
//       </p>
//     </div>
//   );
// }




import { useState } from "react";
import { Calculator, AlertCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useCalculateGSTMutation } from "../../redux/apis/calculatorApi";
import FormattedNumberInput from "./FormattedNumberInput";

export default function GstCalculator() {

  const navigate = useNavigate();
  const [calculateGST, { isLoading }] = useCalculateGSTMutation();
  const [redirecting,setRedirecting] = useState(false);

  const [form, setForm] = useState({
    amount: "",
    gstRate: "",
    isInclusive: false,
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* INPUT */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setResult(null);
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await calculateGST({
        amount: Number(form.amount),
        gstRate: Number(form.gstRate),
        isInclusive: form.isInclusive,
      }).unwrap();

      setResult(res.data);
      toast.success("GST calculated successfully ✅");

    } catch (err) {
      const msg = err?.data?.message || "Calculation failed";
      setError(msg);
      toast.error(msg);
    }
  };

  /* CONSULT */
  const handleConsult = ()=>{
    setRedirecting(true);

    toast("Opening consultation ...✨✨",{
      style:{background:"#000",color:"#fff"}
    });

    setTimeout(()=> navigate("/contact"),1200);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">

      {/* HEADER */}
      <motion.h1
        initial={{opacity:0,y:-20}}
        animate={{opacity:1,y:0}}
        className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3"
      >
        <Calculator className="text-blue-600"/>
        GST Calculator
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{x:-40,opacity:0}}
          animate={{x:0,opacity:1}}
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

          <motion.button
            whileTap={{scale:0.95}}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"/>
                Calculating...
              </>
            ) : "Calculate GST"}
          </motion.button>

        </motion.form>


        {/* RESULT */}
        <motion.div initial={{x:40,opacity:0}} animate={{x:0,opacity:1}} className="bg-white rounded-2xl shadow-lg p-6">

          <AnimatePresence>

          {result ? (
            <motion.div
              key="result"
              initial={{opacity:0,scale:0.95}}
              animate={{opacity:1,scale:1}}
              exit={{opacity:0}}
            >

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

              <motion.button
                whileHover={{scale:1.03}}
                whileTap={{scale:0.95}}
                onClick={handleConsult}
                disabled={redirecting}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                {redirecting ? "Opening..." : "Book Consultation"}
              </motion.button>

            </motion.div>
          ) : (
            <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} className="text-center text-gray-400 py-20">
              <Calculator size={48} className="mx-auto mb-3 opacity-50"/>
              Enter details to calculate
            </motion.div>
          )}

          </AnimatePresence>

        </motion.div>

      </div>
    </div>
  );
}


/* RESULT ITEM */
function ResultItem({label,value}) {
  return (
    <motion.div whileHover={{scale:1.02}} className="flex justify-between border-b pb-2">
      <p className="text-gray-600">{label}</p>
      <p className="font-semibold text-gray-900">
        ₹ {Number(value).toLocaleString("en-IN")}
      </p>
    </motion.div>
  );
}
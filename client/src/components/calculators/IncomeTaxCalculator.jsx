
// import { useState } from "react";
// import { Calculator, AlertCircle, Info } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useCalculateIncomeTaxMutation } from "../../redux/apis/calculatorApi";

// export default function IncomeTaxCalculator() {

//   const navigate = useNavigate();
//   const [calculateIncomeTax, { isLoading }] = useCalculateIncomeTaxMutation();

//   const [formData, setFormData] = useState({
//     annualIncome: "",
//     age: "",
//     regime: "old",
//     deduction80C: "",
//     deduction80D: "",
//     otherDeductions: "",
//   });

//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//     setError("");
//     setResult(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await calculateIncomeTax({
//         annualIncome: Number(formData.annualIncome),
//         age: Number(formData.age),
//         regime: formData.regime,
//         deduction80C: Number(formData.deduction80C) || 0,
//         deduction80D: Number(formData.deduction80D) || 0,
//         otherDeductions: Number(formData.otherDeductions) || 0,
//       }).unwrap();

//       setResult(response.data);
//     } catch (err) {
//       setError(err?.data?.message || "Calculation failed");
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto py-10 px-4">

//       {/* HEADER */}
//       <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
//         <Calculator className="text-blue-600"/>
//         Income Tax Calculator
//       </h1>

//       <div className="grid md:grid-cols-2 gap-8">

//         {/* LEFT PANEL */}
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6 bg-white rounded-2xl shadow-lg p-6"
//         >

//           <SliderInput label="Annual Income" name="annualIncome" value={formData.annualIncome} onChange={handleChange} max={5000000}/>
//           <SliderInput label="Age" name="age" value={formData.age} onChange={handleChange} min={18} max={100}/>

//           {/* REGIME */}
//           <div>
//             <label className="text-sm font-medium mb-1 block">Tax Regime</label>
//             <select
//               name="regime"
//               value={formData.regime}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="old">Old Regime</option>
//               <option value="new">New Regime</option>
//             </select>
//           </div>

//           <SliderInput label="80C Deduction" name="deduction80C" value={formData.deduction80C} onChange={handleChange} max={200000}/>
//           <SliderInput label="80D Deduction" name="deduction80D" value={formData.deduction80D} onChange={handleChange} max={200000}/>
//           <SliderInput label="Other Deductions" name="otherDeductions" value={formData.otherDeductions} onChange={handleChange} max={500000}/>

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex gap-2">
//               <AlertCircle size={18}/> {error}
//             </div>
//           )}

//           <button
//             disabled={isLoading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
//           >
//             {isLoading ? "Calculating..." : "Calculate Tax"}
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
//                 <ResultItem label="Taxable Income" value={result.taxableIncome}/>
//                 <ResultItem label="Total Tax Payable" value={result.totalTax}/>
//                 <ResultItem label="Tax Amount" value={result.taxPayable}/>
//                 <ResultItem label="Cess (4%)" value={result.cess}/>
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


// /* SLIDER INPUT */
// function SliderInput({label,name,value,onChange,min=0,max=1000000}) {
//   return (
//     <div>
//       <div className="flex justify-between mb-1">
//         <label className="text-sm font-medium">{label}</label>
//         <span className="text-blue-600 font-semibold">
//           ₹ {Number(value || 0).toLocaleString("en-IN")}
//         </span>
//       </div>

//       <input
//         type="range"
//         name={name}
//         min={min}
//         max={max}
//         value={value || 0}
//         onChange={onChange}
//         className="w-full accent-blue-600"
//       />
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




// import { useState } from "react";
// import { Calculator, AlertCircle, Info } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useCalculateIncomeTaxMutation } from "../../redux/apis/calculatorApi";

// export default function IncomeTaxCalculator() {
//   const navigate = useNavigate();
//   const [calculateIncomeTax, { isLoading }] = useCalculateIncomeTaxMutation();

//   const [formData, setFormData] = useState({
//     annualIncome: "",
//     age: "",
//     regime: "old",
//     deduction80C: "",
//     deduction80D: "",
//     otherDeductions: "",
//   });

//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//     setError("");
//     setResult(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await calculateIncomeTax({
//         annualIncome: Number(formData.annualIncome),
//         age: Number(formData.age),
//         regime: formData.regime,
//         deduction80C: Number(formData.deduction80C) || 0,
//         deduction80D: Number(formData.deduction80D) || 0,
//         otherDeductions: Number(formData.otherDeductions) || 0,
//       }).unwrap();

//       setResult(response.data);
//     } catch (err) {
//       setError(err?.data?.message || "Calculation failed");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto py-12 px-4">

//       {/* HEADER */}
//       <h1 className="text-3xl font-bold mb-10 text-gray-800 flex items-center gap-3">
//         <Calculator className="text-blue-600" />
//         Income Tax Calculator
//       </h1>

//       <div className="grid md:grid-cols-2 gap-8">

//         {/* LEFT PANEL */}
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6 bg-white rounded-2xl shadow-lg p-6"
//         >
//           <SliderInput
//             label="Annual Income"
//             name="annualIncome"
//             value={formData.annualIncome}
//             onChange={handleChange}
//             max={5000000}
//           />

//           <SliderInput
//             label="Age"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             min={18}
//             max={100}
//             showCurrency={false}
//           />

//           {/* REGIME */}
//           <div>
//             <label className="text-sm font-medium mb-1 block">
//               Tax Regime
//             </label>
//             <select
//               name="regime"
//               value={formData.regime}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="old">Old Regime</option>
//               <option value="new">New Regime</option>
//             </select>
//           </div>

//           <SliderInput
//             label="80C Deduction"
//             name="deduction80C"
//             value={formData.deduction80C}
//             onChange={handleChange}
//             max={200000}
//           />

//           <SliderInput
//             label="80D Deduction"
//             name="deduction80D"
//             value={formData.deduction80D}
//             onChange={handleChange}
//             max={200000}
//           />

//           <SliderInput
//             label="Other Deductions"
//             name="otherDeductions"
//             value={formData.otherDeductions}
//             onChange={handleChange}
//             max={500000}
//           />

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex gap-2">
//               <AlertCircle size={18} />
//               {error}
//             </div>
//           )}

//           <button
//             disabled={isLoading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
//           >
//             {isLoading ? "Calculating..." : "Calculate Tax"}
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
//                 <ResultItem label="Taxable Income" value={result.taxableIncome}/>
//                 <ResultItem label="Total Tax Payable" value={result.totalTax}/>
//                 <ResultItem label="Tax Amount" value={result.taxPayable}/>
//                 <ResultItem label="Cess (4%)" value={result.cess}/>
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

// /* SLIDER COMPONENT */
// function SliderInput({
//   label,
//   name,
//   value,
//   onChange,
//   min = 0,
//   max = 1000000,
//   showCurrency = true
// }) {
//   return (
//     <div>
//       <div className="flex justify-between mb-1">
//         <label className="text-sm font-medium">{label}</label>

//         <span className="text-blue-600 font-semibold">
//           {showCurrency ? "₹ " : ""}
//           {Number(value || 0).toLocaleString("en-IN")}
//           {!showCurrency && " yrs"}
//         </span>
//       </div>

//       <input
//         type="range"
//         name={name}
//         min={min}
//         max={max}
//         value={value || 0}
//         onChange={onChange}
//         className="w-full accent-blue-600"
//       />
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
import { useCalculateIncomeTaxMutation } from "../../redux/apis/calculatorApi";

export default function IncomeTaxCalculator() {

  const navigate = useNavigate();
  const [calculateIncomeTax, { isLoading }] = useCalculateIncomeTaxMutation();

  const [redirecting,setRedirecting] = useState(false);

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

  /* ---------- INPUT CHANGE ---------- */
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError("");
    setResult(null);
  };

  /* ---------- SUBMIT ---------- */
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

      toast.success("Calculation completed ✅");

    } catch (err) {
      setError(err?.data?.message || "Calculation failed");
      toast.error("Calculation failed");
    }
  };

  /* ---------- CONSULT BUTTON ---------- */
  const handleConsult = () => {

    setRedirecting(true);

    toast("Opening consultation page... ✨✨", {
      style:{ background:"#000", color:"#fff" }
    });

    setTimeout(()=>{
      navigate("/contact");
    },1200);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">

      {/* HEADER */}
      <motion.h1
        initial={{opacity:0,y:-20}}
        animate={{opacity:1,y:0}}
        className="text-3xl font-bold mb-10 text-gray-800 flex items-center gap-3"
      >
        <Calculator className="text-blue-600"/>
        Income Tax Calculator
      </motion.h1>


      <div className="grid md:grid-cols-2 gap-8">

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{opacity:0,x:-40}}
          animate={{opacity:1,x:0}}
          className="space-y-6 bg-white rounded-2xl shadow-lg p-6"
        >

          <SliderInput label="Annual Income" name="annualIncome" value={formData.annualIncome} onChange={handleChange} max={5000000}/>
          <SliderInput label="Age" name="age" value={formData.age} onChange={handleChange} min={18} max={100} showCurrency={false}/>

          {/* REGIME */}
          <div>
            <label className="text-sm font-medium mb-1 block">Tax Regime</label>
            <select name="regime" value={formData.regime} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
              <option value="old">Old Regime</option>
              <option value="new">New Regime</option>
            </select>
          </div>

          <SliderInput label="80C Deduction" name="deduction80C" value={formData.deduction80C} onChange={handleChange} max={200000}/>
          <SliderInput label="80D Deduction" name="deduction80D" value={formData.deduction80D} onChange={handleChange} max={200000}/>
          <SliderInput label="Other Deductions" name="otherDeductions" value={formData.otherDeductions} onChange={handleChange} max={500000}/>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex gap-2">
              <AlertCircle size={18}/>
              {error}
            </div>
          )}

          <motion.button
            whileTap={{scale:0.95}}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"/>
                Calculating...
              </>
            ) : "Calculate Tax"}
          </motion.button>

        </motion.form>


        {/* RESULT PANEL */}
        <motion.div
          initial={{opacity:0,x:40}}
          animate={{opacity:1,x:0}}
          className="bg-white rounded-2xl shadow-lg p-6"
        >

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
                  <ResultItem label="Taxable Income" value={result.taxableIncome}/>
                  <ResultItem label="Total Tax Payable" value={result.totalTax}/>
                  <ResultItem label="Tax Amount" value={result.taxPayable}/>
                  <ResultItem label="Cess (4%)" value={result.cess}/>
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
              <motion.div
                key="empty"
                initial={{opacity:0}}
                animate={{opacity:1}}
                className="text-center text-gray-400 py-20"
              >
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


/* SLIDER */
function SliderInput({label,name,value,onChange,min=0,max=1000000,showCurrency=true}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-blue-600 font-semibold">
          {showCurrency?"₹ ":""}
          {Number(value||0).toLocaleString("en-IN")}
          {!showCurrency && " yrs"}
        </span>
      </div>

      <input type="range" name={name} min={min} max={max} value={value||0} onChange={onChange} className="w-full accent-blue-600"/>
    </div>
  );
}


/* RESULT */
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
// import { useState } from "react";
// import { DollarSign, AlertCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useCalculateGSTMutation } from "../../redux/apis/calculatorApi";

// export default function GstCalculator() {
//   const navigate = useNavigate();
//   const [calculateGST, { isLoading }] = useCalculateGSTMutation();

//   const [formData, setFormData] = useState({
//     amount: "",
//     gstRate: "18",
//     isInclusive: false,
//   });

//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const value =
//       e.target.type === "checkbox" ? e.target.checked : e.target.value;
//     setFormData({ ...formData, [e.target.name]: value });
//     setError("");
//     setResult(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setResult(null);

//     try {
//       const response = await calculateGST({
//         amount: parseFloat(formData.amount),
//         gstRate: parseFloat(formData.gstRate),
//         isInclusive: formData.isInclusive,
//       }).unwrap();

//       setResult(response.data);
//     } catch (err) {
//       setError(err?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center gap-3 mb-6">
//         <div className="p-2 bg-blue-100 rounded-lg">
//           <DollarSign className="text-blue-700" size={24} />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900">GST Calculator</h2>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Amount (₹)
//             </label>
//             <input
//               type="number"
//               name="amount"
//               value={formData.amount}
//               onChange={handleChange}
//               required
//               step="0.01"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Enter amount"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               GST Rate (%)
//             </label>
//             <select
//               name="gstRate"
//               value={formData.gstRate}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="5">5%</option>
//               <option value="12">12%</option>
//               <option value="18">18%</option>
//               <option value="28">28%</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <input
//             type="checkbox"
//             name="isInclusive"
//             checked={formData.isInclusive}
//             onChange={handleChange}
//             className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//           />
//           <label className="text-sm font-semibold text-gray-700">
//             GST is included in the amount
//           </label>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
//             <AlertCircle size={20} />
//             <span>{error}</span>
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? "Calculating..." : "Calculate GST"}
//         </button>
//       </form>

//       {result && (
//         <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200">
//           <h3 className="text-xl font-bold text-gray-900 mb-6">
//             GST Calculation Results
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div className="bg-white p-4 rounded-lg border border-gray-200">
//               <p className="text-sm text-gray-600 mb-1">Base Amount</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ₹{result.baseAmount.toLocaleString("en-IN", {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })}
//               </p>
//             </div>

//             <div className="bg-white p-4 rounded-lg border border-gray-200">
//               <p className="text-sm text-gray-600 mb-1">GST Amount</p>
//               <p className="text-2xl font-bold text-blue-700">
//                 ₹{result.gstAmount.toLocaleString("en-IN", {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })}
//               </p>
//             </div>

//             <div className="bg-white p-4 rounded-lg border border-gray-200">
//               <p className="text-sm text-gray-600 mb-1">CGST ({result.gstRate / 2}%)</p>
//               <p className="text-2xl font-bold text-green-600">
//                 ₹{result.cgst.toLocaleString("en-IN", {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })}
//               </p>
//             </div>

//             <div className="bg-white p-4 rounded-lg border border-gray-200">
//               <p className="text-sm text-gray-600 mb-1">SGST ({result.gstRate / 2}%)</p>
//               <p className="text-2xl font-bold text-green-600">
//                 ₹{result.sgst.toLocaleString("en-IN", {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })}
//               </p>
//             </div>

//             <div className="bg-white p-4 rounded-lg border border-gray-200 md:col-span-2">
//               <p className="text-sm text-gray-600 mb-1">Total Amount</p>
//               <p className="text-2xl font-bold text-red-600">
//                 ₹{result.totalAmount.toLocaleString("en-IN", {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })}
//               </p>
//             </div>
//           </div>

//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
//             <p className="text-sm text-yellow-800 flex items-center gap-2">
//               <AlertCircle size={16} />
//               <span>
//                 This is an estimate. Consult our CA for exact calculation.
//               </span>
//             </p>
//           </div>

//           <button
//             onClick={() => navigate("/contact")}
//             className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
//           >
//             Book Consultation
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }




import { useState } from "react";
import { DollarSign } from "lucide-react";
import { formatINR } from "../../shere/formatCurrency";


export default function GstCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(18);
  const [inclusive, setInclusive] = useState(false);
  const [result, setResult] = useState(null);

const handleChange = (e) => {
  let value = e.target.value;

  if (!/^\d*\.?\d*$/.test(value)) return;
  if (Number(value) > 1000000000) return;

  setFormData({ ...formData, [e.target.name]: value });
};


  const calculate = () => {
    const amt = Number(amount);

    if (!amt) return;

    let base, gst;

    if (inclusive) {
      base = (amt * 100) / (100 + rate);
      gst = amt - base;
    } else {
      base = amt;
      gst = (amt * rate) / 100;
    }

    setResult({
      base,
      gst,
      total: base + gst,
      cgst: gst / 2,
      sgst: gst / 2,
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="text-blue-700" />
        <h2 className="text-2xl font-bold">GST Calculator</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">

        {/* AMOUNT */}
        <div>
          <label className="text-sm font-semibold">Amount</label>
          <input
            type="text"
            value={amount ? Number(amount).toLocaleString("en-IN") : ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 mt-2"
            placeholder="Enter amount"
          />
        </div>

        {/* RATE */}
        <div>
          <label className="text-sm font-semibold">GST Rate</label>
          <select
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full border rounded-lg px-4 py-3 mt-2"
          >
            {[0,5,12,18,28].map(r=>(
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex gap-2 mb-6 text-sm">
        <input
          type="checkbox"
          checked={inclusive}
          onChange={(e) => setInclusive(e.target.checked)}
        />
        GST included in amount
      </label>

      <button
        onClick={calculate}
        className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold"
      >
        Calculate GST
      </button>

      {result && (
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card title="Base Amount" value={result.base}/>
          <Card title="GST Amount" value={result.gst}/>
          <Card title="Total" value={result.total}/>
          <Card title="CGST" value={result.cgst}/>
          <Card title="SGST" value={result.sgst}/>
        </div>
      )}
    </div>
  );
}

function Card({title,value}){
  return(
    <div className="bg-blue-50 p-5 rounded-xl border">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-xl font-bold text-blue-700">
        {formatINR(value)}
      </p>
    </div>
  )
}

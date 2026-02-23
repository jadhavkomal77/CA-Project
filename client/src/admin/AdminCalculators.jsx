// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   Calculator, 
//   DollarSign, 
//   Home, 
//   TrendingUp,
//   Eye,
//   Settings,
//   ExternalLink
// } from "lucide-react";
// import { toast } from "react-toastify";

// export default function AdminCalculators() {
//   const navigate = useNavigate();

//   const calculators = [
//     {
//       id: "income-tax",
//       name: "Income Tax Calculator",
//       icon: Calculator,
//       description: "Calculate income tax for Old & New regime",
//       route: "/publiccalculator",
//       color: "bg-blue-500",
//       status: "active",
//     },
//     {
//       id: "gst",
//       name: "GST Calculator",
//       icon: DollarSign,
//       description: "Calculate GST amount and breakdown",
//       route: "/publiccalculator",
//       color: "bg-green-500",
//       status: "active",
//     },
//     {
//       id: "emi",
//       name: "Home Loan EMI Calculator",
//       icon: Home,
//       description: "Calculate home loan EMI",
//       route: "/publiccalculator",
//       color: "bg-purple-500",
//       status: "active",
//     },
//     {
//       id: "sip",
//       name: "SIP Calculator",
//       icon: TrendingUp,
//       description: "Calculate SIP returns and maturity value",
//       route: "/publiccalculator",
//       color: "bg-orange-500",
//       status: "active",
//     },
//   ];

//   const handleViewCalculator = (calculatorId) => {
//     navigate("/publiccalculator");
//     toast.info(`Navigate to ${calculatorId} calculator`);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow-sm p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               Financial Calculators
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Manage and view all financial calculators
//             </p>
//           </div>
//           <button
//             onClick={() => navigate("/publiccalculator")}
//             className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
//           >
//             <ExternalLink size={18} />
//             View Public Page
//           </button>
//         </div>
//       </div>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="text-sm font-medium opacity-90">Total Calculators</h3>
//             <Calculator size={24} className="opacity-80" />
//           </div>
//           <p className="text-3xl font-bold">{calculators.length}</p>
//           <p className="text-sm opacity-80 mt-1">Active calculators</p>
//         </div>

//         <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="text-sm font-medium opacity-90">Tax Calculators</h3>
//             <DollarSign size={24} className="opacity-80" />
//           </div>
//           <p className="text-3xl font-bold">
//             {calculators.filter((c) => c.id.includes("tax") || c.id.includes("gst")).length}
//           </p>
//           <p className="text-sm opacity-80 mt-1">Tax related tools</p>
//         </div>

//         <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="text-sm font-medium opacity-90">Loan Calculators</h3>
//             <Home size={24} className="opacity-80" />
//           </div>
//           <p className="text-3xl font-bold">
//             {calculators.filter((c) => c.id.includes("emi")).length}
//           </p>
//           <p className="text-sm opacity-80 mt-1">Loan tools</p>
//         </div>

//         <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="text-sm font-medium opacity-90">Investment Tools</h3>
//             <TrendingUp size={24} className="opacity-80" />
//           </div>
//           <p className="text-3xl font-bold">
//             {calculators.filter((c) => c.id.includes("sip")).length}
//           </p>
//           <p className="text-sm opacity-80 mt-1">Investment calculators</p>
//         </div>
//       </div>

//       {/* Calculators List */}
//       <div className="bg-white rounded-xl shadow-sm p-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//           All Calculators
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {calculators.map((calculator) => {
//             const Icon = calculator.icon;
//             return (
//               <div
//                 key={calculator.id}
//                 className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-4">
//                     <div
//                       className={`${calculator.color} p-3 rounded-lg text-white`}
//                     >
//                       <Icon size={24} />
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900">
//                         {calculator.name}
//                       </h3>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {calculator.description}
//                       </p>
//                     </div>
//                   </div>
//                   <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
//                     {calculator.status}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-3 mt-6">
//                   <button
//                     onClick={() => handleViewCalculator(calculator.id)}
//                     className="flex-1 flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors duration-200"
//                   >
//                     <Eye size={18} />
//                     View Calculator
//                   </button>
//                   <button
//                     onClick={() => navigate("/publiccalculator")}
//                     className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-semibold transition-colors duration-200"
//                   >
//                     <Settings size={18} />
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Information Section */}
//       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
//         <h3 className="text-lg font-bold text-gray-900 mb-3">
//           Calculator Information
//         </h3>
//         <div className="space-y-2 text-sm text-gray-700">
//           <p>
//             • All calculators are publicly accessible at{" "}
//             <span className="font-semibold text-blue-700">/calculators</span>
//           </p>
//           <p>
//             • Calculators provide estimates only. Users are advised to consult
//             with a CA for exact calculations.
//           </p>
//           <p>
//             • Each calculator includes a "Book Consultation" CTA button that
//             redirects to the contact page.
//           </p>
//           <p>
//             • All calculations are performed on the backend for security and
//             accuracy.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



//  *******************************

// import { useState } from "react";
// import { Trash2, Pencil, Save, X, Calculator } from "lucide-react";

// export default function AdminCalculators() {

//   const [calculators, setCalculators] = useState([
//     { id: 1, name: "Income Tax", category: "Tax", status: true },
//     { id: 2, name: "GST Calculator", category: "Tax", status: true },
//     { id: 3, name: "EMI Calculator", category: "Loan", status: true },
//     { id: 4, name: "SIP Calculator", category: "Investment", status: false },
//   ]);

//   const [editId, setEditId] = useState(null);
//   const [editData, setEditData] = useState({ name: "", category: "" });

//   /* ---------- ACTIONS ---------- */

//   const toggleStatus = id =>
//     setCalculators(prev =>
//       prev.map(c =>
//         c.id === id ? { ...c, status: !c.status } : c
//       )
//     );

//   const deleteCalc = id => {
//     if (!confirm("Delete calculator?")) return;
//     setCalculators(prev => prev.filter(c => c.id !== id));
//   };

//   const startEdit = calc => {
//     setEditId(calc.id);
//     setEditData({ name: calc.name, category: calc.category });
//   };

//   const cancelEdit = () => setEditId(null);

//   const saveEdit = id => {
//     setCalculators(prev =>
//       prev.map(c =>
//         c.id === id ? { ...c, ...editData } : c
//       )
//     );
//     setEditId(null);
//   };

//   /* ---------- UI ---------- */

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-8">

//       {/* HEADER */}
//       <div className="flex items-center gap-4 mb-8">
//         <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg">
//           <Calculator />
//         </div>

//         <div>
//           <h1 className="text-3xl font-bold text-slate-800">
//             Calculators Management
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Manage all financial calculators
//           </p>
//         </div>
//       </div>

//       {/* TABLE CARD */}
//       <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">

//         <table className="w-full">

//           {/* HEADER */}
//           <thead className="bg-slate-100 text-slate-700 text-sm">
//             <tr>
//               <th className="p-5 text-left font-semibold">Calculator Name</th>
//               <th className="font-semibold">Category</th>
//               <th className="font-semibold">Status</th>
//               <th className="text-center font-semibold">Actions</th>
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>

//             {calculators.map(calc => (
//               <tr
//                 key={calc.id}
//                 className="border-t hover:bg-slate-50 transition duration-200"
//               >

//                 {/* NAME */}
//                 <td className="p-5 font-medium text-slate-800">

//                   {editId === calc.id ? (
//                     <input
//                       value={editData.name}
//                       onChange={e =>
//                         setEditData({ ...editData, name: e.target.value })
//                       }
//                       className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
//                     />
//                   ) : calc.name}

//                 </td>

//                 {/* CATEGORY */}
//                 <td className="text-center">

//                   {editId === calc.id ? (
//                     <select
//                       value={editData.category}
//                       onChange={e =>
//                         setEditData({ ...editData, category: e.target.value })
//                       }
//                       className="border px-3 py-2 rounded-lg"
//                     >
//                       <option>Tax</option>
//                       <option>Loan</option>
//                       <option>Investment</option>
//                     </select>
//                   ) : (
//                     <span className="px-4 py-1 text-xs rounded-full font-semibold bg-blue-100 text-blue-700">
//                       {calc.category}
//                     </span>
//                   )}

//                 </td>

//                 {/* STATUS */}
//                 <td className="text-center">
//                   <button
//                     onClick={() => toggleStatus(calc.id)}
//                     className={`px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition
//                       ${calc.status
//                         ? "bg-green-100 text-green-700 hover:bg-green-200"
//                         : "bg-red-100 text-red-700 hover:bg-red-200"
//                       }`}
//                   >
//                     {calc.status ? "Active" : "Disabled"}
//                   </button>
//                 </td>

//                 {/* ACTIONS */}
//                 <td className="text-center space-x-2">

//                   {editId === calc.id ? (
//                     <>
//                       <button
//                         onClick={() => saveEdit(calc.id)}
//                         className="p-2 bg-green-100 rounded-lg hover:bg-green-200 transition"
//                       >
//                         <Save size={18} className="text-green-700"/>
//                       </button>

//                       <button
//                         onClick={cancelEdit}
//                         className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
//                       >
//                         <X size={18}/>
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => startEdit(calc)}
//                         className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
//                       >
//                         <Pencil size={18} className="text-blue-700"/>
//                       </button>

//                       <button
//                         onClick={() => deleteCalc(calc.id)}
//                         className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition"
//                       >
//                         <Trash2 size={18} className="text-red-700"/>
//                       </button>
//                     </>
//                   )}

//                 </td>

//               </tr>
//             ))}

//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// }



// ***************************


// import { useState, useEffect } from "react";
// import { Trash2, Pencil, Save, X, Calculator } from "lucide-react";

// export default function AdminCalculators() {

//   /* ---------- LOAD FROM LOCAL STORAGE ---------- */
//   const [calculators, setCalculators] = useState(() => {
//     const saved = localStorage.getItem("calculators");
//     return saved
//       ? JSON.parse(saved)
//       : [
//           { id: 1, name: "Income Tax", category: "Tax", status: true },
//           { id: 2, name: "GST Calculator", category: "Tax", status: true },
//           { id: 3, name: "EMI Calculator", category: "Loan", status: true },
//           { id: 4, name: "SIP Calculator", category: "Investment", status: false },
//         ];
//   });

//   /* ---------- SAVE TO LOCAL STORAGE ---------- */
//   useEffect(() => {
//     localStorage.setItem("calculators", JSON.stringify(calculators));
//   }, [calculators]);

//   const [editId, setEditId] = useState(null);
//   const [editData, setEditData] = useState({ name: "", category: "" });

//   /* ---------- ACTIONS ---------- */

//   const toggleStatus = id => {
//     setCalculators(prev =>
//       prev.map(c =>
//         c.id === id ? { ...c, status: !c.status } : c
//       )
//     );
//   };

//   const deleteCalc = id => {
//     if (!confirm("Delete calculator?")) return;
//     setCalculators(prev => prev.filter(c => c.id !== id));
//   };

//   const startEdit = calc => {
//     setEditId(calc.id);
//     setEditData({ name: calc.name, category: calc.category });
//   };

//   const cancelEdit = () => {
//     setEditId(null);
//     setEditData({ name: "", category: "" });
//   };

//   const saveEdit = id => {
//     setCalculators(prev =>
//       prev.map(c =>
//         c.id === id ? { ...c, ...editData } : c
//       )
//     );
//     setEditId(null);
//   };

//   /* ---------- UI ---------- */

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-8">

//       {/* HEADER */}
//       <div className="flex items-center gap-4 mb-8">
//         <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg">
//           <Calculator />
//         </div>

//         <div>
//           <h1 className="text-3xl font-bold text-slate-800">
//             Calculators Management
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Manage all financial calculators
//           </p>
//         </div>
//       </div>

//       {/* TABLE CARD */}
//       <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">

//         <table className="w-full">

//           {/* HEADER */}
//           <thead className="bg-slate-100 text-slate-700 text-sm">
//             <tr>
//               <th className="p-5 text-left font-semibold">Calculator Name</th>
//               <th className="font-semibold">Category</th>
//               <th className="font-semibold">Status</th>
//               <th className="text-center font-semibold">Actions</th>
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>
//             {calculators.map(calc => (
//               <tr
//                 key={calc.id}
//                 className="border-t hover:bg-slate-50 transition duration-200"
//               >

//                 {/* NAME */}
//                 <td className="p-5 font-medium text-slate-800">
//                   {editId === calc.id ? (
//                     <input
//                       value={editData.name}
//                       onChange={e =>
//                         setEditData({ ...editData, name: e.target.value })
//                       }
//                       className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
//                     />
//                   ) : calc.name}
//                 </td>

//                 {/* CATEGORY */}
//                 <td className="text-center">
//                   {editId === calc.id ? (
//                     <select
//                       value={editData.category}
//                       onChange={e =>
//                         setEditData({ ...editData, category: e.target.value })
//                       }
//                       className="border px-3 py-2 rounded-lg"
//                     >
//                       <option>Tax</option>
//                       <option>Loan</option>
//                       <option>Investment</option>
//                     </select>
//                   ) : (
//                     <span className="px-4 py-1 text-xs rounded-full font-semibold bg-blue-100 text-blue-700">
//                       {calc.category}
//                     </span>
//                   )}
//                 </td>

//                 {/* STATUS */}
//                 <td className="text-center">
//                   <button
//                     onClick={() => toggleStatus(calc.id)}
//                     className={`px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition
//                       ${calc.status
//                         ? "bg-green-100 text-green-700 hover:bg-green-200"
//                         : "bg-red-100 text-red-700 hover:bg-red-200"
//                       }`}
//                   >
//                     {calc.status ? "Active" : "Disabled"}
//                   </button>
//                 </td>

//                 {/* ACTIONS */}
//                 <td className="text-center space-x-2">

//                   {editId === calc.id ? (
//                     <>
//                       <button
//                         onClick={() => saveEdit(calc.id)}
//                         className="p-2 bg-green-100 rounded-lg hover:bg-green-200 transition"
//                       >
//                         <Save size={18} className="text-green-700"/>
//                       </button>

//                       <button
//                         onClick={cancelEdit}
//                         className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
//                       >
//                         <X size={18}/>
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => startEdit(calc)}
//                         className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
//                       >
//                         <Pencil size={18} className="text-blue-700"/>
//                       </button>

//                       <button
//                         onClick={() => deleteCalc(calc.id)}
//                         className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition"
//                       >
//                         <Trash2 size={18} className="text-red-700"/>
//                       </button>
//                     </>
//                   )}

//                 </td>

//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Trash2, Pencil, Save, X, Calculator } from "lucide-react";
import { calculatorsMaster } from "../components/calculators/calculatorsList";

export default function AdminCalculators() {

  /* ---------- MERGE MASTER + STORAGE ---------- */
  const [calculators, setCalculators] = useState(() => {

    const saved = JSON.parse(localStorage.getItem("calculators")) || [];

    return calculatorsMaster.map(master => {
      const found = saved.find(s => s.id === master.id);
      return found ? found : { ...master, status: true };
    });

  });

  /* ---------- SAVE STORAGE ---------- */
  useEffect(() => {
    localStorage.setItem("calculators", JSON.stringify(calculators));
  }, [calculators]);

  /* ---------- EDIT ---------- */
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", category: "" });

  /* ---------- ACTIONS ---------- */

  const toggleStatus = id => {
    setCalculators(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status: !c.status } : c
      )
    );
  };

  const deleteCalc = id => {
    if (!confirm("Delete calculator?")) return;
    setCalculators(prev => prev.filter(c => c.id !== id));
  };

  const startEdit = calc => {
    setEditId(calc.id);
    setEditData({ name: calc.name, category: calc.category });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({ name: "", category: "" });
  };

  const saveEdit = id => {
    setCalculators(prev =>
      prev.map(c =>
        c.id === id ? { ...c, ...editData } : c
      )
    );
    setEditId(null);
  };

  /* ---------- UI ---------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 p-8">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg">
          <Calculator />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Calculators Management
          </h1>
          <p className="text-gray-500 text-sm">
            Manage all financial calculators
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100 text-slate-700 text-sm">
            <tr>
              <th className="p-5 text-left">Calculator</th>
              <th>Category</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {calculators.map(calc => (
              <tr key={calc.id} className="border-t hover:bg-slate-50">

                <td className="p-5">
                  {editId === calc.id ? (
                    <input
                      value={editData.name}
                      onChange={e =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="border px-3 py-2 rounded-lg w-full"
                    />
                  ) : calc.name}
                </td>

                <td className="text-center">
                  {editId === calc.id ? (
                    <input
                      value={editData.category}
                      onChange={e =>
                        setEditData({ ...editData, category: e.target.value })
                      }
                      className="border px-3 py-2 rounded-lg"
                    />
                  ) : calc.category}
                </td>

                <td className="text-center">
                  <button
                    onClick={() => toggleStatus(calc.id)}
                    className={`px-4 py-1 rounded-full text-xs font-semibold
                      ${calc.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {calc.status ? "Active" : "Disabled"}
                  </button>
                </td>

                <td className="text-center space-x-2">

                  {editId === calc.id ? (
                    <>
                      <button onClick={() => saveEdit(calc.id)} className="p-2 bg-green-100 rounded-lg">
                        <Save size={18}/>
                      </button>

                      <button onClick={cancelEdit} className="p-2 bg-gray-200 rounded-lg">
                        <X size={18}/>
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(calc)} className="p-2 bg-blue-100 rounded-lg">
                        <Pencil size={18}/>
                      </button>

                      <button onClick={() => deleteCalc(calc.id)} className="p-2 bg-red-100 rounded-lg">
                        <Trash2 size={18}/>
                      </button>
                    </>
                  )}

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
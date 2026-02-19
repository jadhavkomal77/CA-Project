// import { useState } from "react";
// import IncomeTaxCalculator from "../components/calculators/IncomeTaxCalculator";
// import GstCalculator from "../components/calculators/GstCalculator";
// import EmiCalculator from "../components/calculators/EmiCalculator";
// import SipCalculator from "../components/calculators/SipCalculator";
// import { Calculator, DollarSign, Home, TrendingUp } from "lucide-react";

// export default function PublicCalculator() {
//   const [activeCalculator, setActiveCalculator] = useState("income-tax");

//   const calculators = [
//     {
//       id: "income-tax",
//       name: "Income Tax Calculator",
//       icon: Calculator,
//       component: IncomeTaxCalculator,
//       description: "Calculate your income tax for Old & New regime",
//     },
//     {
//       id: "gst",
//       name: "GST Calculator",
//       icon: DollarSign,
//       component: GstCalculator,
//       description: "Calculate GST amount and breakdown",
//     },
//     {
//       id: "emi",
//       name: "Home Loan EMI Calculator",
//       icon: Home,
//       component: EmiCalculator,
//       description: "Calculate your home loan EMI",
//     },
//     {
//       id: "sip",
//       name: "SIP Calculator",
//       icon: TrendingUp,
//       component: SipCalculator,
//       description: "Calculate SIP returns and maturity value",
//     },
//   ];

//   const ActiveComponent = calculators.find(
//     (calc) => calc.id === activeCalculator
//   )?.component;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Financial Calculators
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Professional financial calculators to help you plan your finances
//             better
//           </p>
//         </div>

//         {/* Calculator Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {calculators.map((calc) => {
//             const Icon = calc.icon;
//             return (
//               <button
//                 key={calc.id}
//                 onClick={() => setActiveCalculator(calc.id)}
//                 className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
//                   activeCalculator === calc.id
//                     ? "border-blue-700 bg-blue-50 shadow-lg transform scale-105"
//                     : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
//                 }`}
//               >
//                 <div className="flex items-center gap-4 mb-3">
//                   <div
//                     className={`p-3 rounded-xl ${
//                       activeCalculator === calc.id
//                         ? "bg-blue-700 text-white"
//                         : "bg-blue-100 text-blue-700"
//                     }`}
//                   >
//                     <Icon size={24} />
//                   </div>
//                   <h3
//                     className={`text-lg font-bold ${
//                       activeCalculator === calc.id
//                         ? "text-blue-700"
//                         : "text-gray-900"
//                     }`}
//                   >
//                     {calc.name}
//                   </h3>
//                 </div>
//                 <p className="text-sm text-gray-600">{calc.description}</p>
//               </button>
//             );
//           })}
//         </div>

//         {/* Active Calculator Component */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
//           {ActiveComponent && <ActiveComponent />}
//         </div>
//       </div>
//     </div>
//   );
// }





// import { useState } from "react";
// import IncomeTaxCalculator from "../components/calculators/IncomeTaxCalculator";
// import GstCalculator from "../components/calculators/GstCalculator";
// import EmiCalculator from "../components/calculators/EmiCalculator";
// import SipCalculator from "../components/calculators/SipCalculator";
// import { Calculator, DollarSign, Home, TrendingUp } from "lucide-react";

// export default function PublicCalculator() {
//   const [active, setActive] = useState("tax");

//   const calculators = [
//     { id: "tax", name: "Income Tax", icon: Calculator, comp: IncomeTaxCalculator },
//     { id: "gst", name: "GST", icon: DollarSign, comp: GstCalculator },
//     { id: "emi", name: "EMI", icon: Home, comp: EmiCalculator },
//     { id: "sip", name: "SIP", icon: TrendingUp, comp: SipCalculator },
//   ];

//   const ActiveComp = calculators.find(c => c.id === active)?.comp;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-4">

//       <div className="max-w-7xl mx-auto">

//         {/* Heading */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold mb-3">Financial Calculators</h1>
//           <p className="text-gray-600 text-lg">
//             Calculate tax, GST, EMI & investment instantly
//           </p>
//         </div>

//         {/* Selector */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {calculators.map(c=>{
//             const Icon=c.icon;
//             return(
//               <button
//                 key={c.id}
//                 onClick={()=>setActive(c.id)}
//                 className={`p-6 rounded-2xl border text-left transition
//                 ${active===c.id
//                   ? "border-blue-700 bg-blue-50 shadow-xl scale-105"
//                   : "bg-white border-gray-200 hover:shadow-md"}
//                 `}
//               >
//                 <div className="flex gap-3 items-center mb-2">
//                   <div className={`p-2 rounded-lg ${active===c.id?"bg-blue-700 text-white":"bg-blue-100 text-blue-700"}`}>
//                     <Icon size={22}/>
//                   </div>
//                   <h3 className="font-bold">{c.name}</h3>
//                 </div>
//                 <p className="text-sm text-gray-500">Professional calculator</p>
//               </button>
//             )
//           })}
//         </div>

//         {/* Calculator Box */}
//         <div className="bg-white rounded-3xl shadow-2xl border p-8">
//           {ActiveComp && <ActiveComp/>}
//         </div>

//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import IncomeTaxCalculator from "../components/calculators/IncomeTaxCalculator";
import GstCalculator from "../components/calculators/GstCalculator";
import EmiCalculator from "../components/calculators/EmiCalculator";
import SipCalculator from "../components/calculators/SipCalculator";
import AdvanceTaxCalculator from "../components/calculators/AdvanceTaxCalculator";

import {
  Calculator,
  IndianRupee,
  Home,
  TrendingUp,
  Landmark
} from "lucide-react";

export default function PublicCalculator() {

  const [active, setActive] = useState("tax");

  const calculators = [
    { id: "tax", name: "Income Tax", icon: Calculator, comp: IncomeTaxCalculator },
   { id: "gst", name: "GST Calc", icon: IndianRupee, comp: GstCalculator },
    { id: "advance", name: "Advance Tax", icon: Landmark, comp: AdvanceTaxCalculator },
    { id: "emi", name: "EMI", icon: Home, comp: EmiCalculator },
    { id: "sip", name: "SIP", icon: TrendingUp, comp: SipCalculator },
  ];

  const ActiveComp = calculators.find(c => c.id === active)?.comp;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 py-12 sm:py-16 px-3 sm:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Financial Calculators
          </h1>

          <p className="text-slate-500 text-sm sm:text-base lg:text-lg">
            Smart tools for accurate financial planning
          </p>
        </div>


        {/* SELECTOR GRID */}
        <div className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          gap-4 sm:gap-6
          mb-12
        ">
          {calculators.map(c => {

            const Icon = c.icon;
            const isActive = active === c.id;

            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`
                group relative
                rounded-2xl
                border
                p-4 sm:p-6
                transition-all duration-300 text-left

                ${isActive
                  ? "bg-gradient-to-br from-blue-700 to-blue-800 text-white shadow-xl scale-[1.03]"
                  : "bg-white border-slate-200 hover:shadow-xl hover:-translate-y-1"
                }`}
              >

                {/* ICON + TITLE */}
                <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">

                  <div className={`
                    p-2 sm:p-3 rounded-xl transition
                    ${isActive
                      ? "bg-white/20"
                      : "bg-blue-100 text-blue-700 group-hover:bg-blue-200"
                    }`}>
                    <Icon size={20}/>
                  </div>

                  <h3 className="font-semibold text-sm sm:text-base">
                    {c.name}
                  </h3>

                </div>

                {/* TEXT */}
                <p className={`text-xs sm:text-sm
                  ${isActive ? "text-blue-100" : "text-slate-500"}`}>
                  Professional calculator
                </p>

                {/* ACTIVE RING */}
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-300/40"/>
                )}

              </button>
            );
          })}
        </div>


        {/* CALCULATOR BOX */}
        <div className="
          bg-white
          rounded-3xl
          shadow-2xl
          border border-slate-200
          p-5 sm:p-8 md:p-10 lg:p-14
          transition-all
        ">
          {ActiveComp && <ActiveComp />}
        </div>

      </div>
    </div>
  );
}


// import { useState } from "react";

// import IncomeTaxCalculator from "../components/calculators/IncomeTaxCalculator";
// import GstCalculator from "../components/calculators/GstCalculator";
// import EmiCalculator from "../components/calculators/EmiCalculator";
// import SipCalculator from "../components/calculators/SipCalculator";
// import AdvanceTaxCalculator from "../components/calculators/AdvanceTaxCalculator";

// import {
//   Calculator,
//   IndianRupee,
//   Home,
//   TrendingUp,
//   Landmark,
//   Search
// } from "lucide-react";
// import GstSearch from "../components/calculators/GstSearch";

// export default function PublicCalculator() {

//   const [active, setActive] = useState("tax");

//   const calculators = [
//     { id: "tax", name: "Income Tax", icon: Calculator, comp: IncomeTaxCalculator },
//     { id: "gst", name: "GST", icon: IndianRupee, comp: GstCalculator },
//     { id: "advance", name: "Advance Tax", icon: Landmark, comp: AdvanceTaxCalculator },
//     { id: "emi", name: "EMI", icon: Home, comp: EmiCalculator },
//     { id: "sip", name: "SIP", icon: TrendingUp, comp: SipCalculator },
//     { id: "gst-search", name: "GST Search", icon: Search, comp: GstSearch },
//   ];

//   const ActiveComp = calculators.find(c => c.id === active)?.comp;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 py-12 sm:py-16 px-3 sm:px-6">

//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}
//         <div className="text-center mb-14">
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
//             Financial Calculators
//           </h1>

//           <p className="text-slate-700 text-sm sm:text-base lg:text-lg">
//             Smart tools for accurate financial planning
//           </p>
//         </div>


//         {/* SELECTOR GRID */}
//         <div className="
//           grid
//           grid-cols-2
//           sm:grid-cols-3
//           md:grid-cols-4
//           lg:grid-cols-6
//           gap-4 sm:gap-6
//           mb-12
//         ">
//           {calculators.map(c => {

//             const Icon = c.icon;
//             const isActive = active === c.id;

//             return (
//               <button
//                 key={c.id}
//                 onClick={() => setActive(c.id)}
//                 className={`
//                 group relative rounded-2xl border p-4 sm:p-6
//                 transition-all duration-300 text-left

//                 ${isActive
//                   ? "bg-gradient-to-br from-blue-700 to-blue-800 text-white shadow-xl scale-[1.04]"
//                   : "bg-white border-slate-300 hover:shadow-lg hover:-translate-y-1"
//                 }`}
//               >

//                 {/* ICON + TITLE */}
//                 <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">

//                   <div className={`
//                     p-2 sm:p-3 rounded-xl transition
//                     ${isActive
//                       ? "bg-white/20"
//                       : "bg-blue-100 text-blue-700 group-hover:bg-blue-200"
//                     }`}>
//                     <Icon size={20}/>
//                   </div>

//                   <h3 className="font-semibold text-sm sm:text-base">
//                     {c.name}
//                   </h3>

//                 </div>

//                 {/* TEXT */}
//                 <p className={`text-xs sm:text-sm
//                   ${isActive ? "text-blue-100" : "text-slate-700"}`}>
//                   Professional calculator
//                 </p>

//                 {/* ACTIVE RING */}
//                 {isActive && (
//                   <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-300/40 animate-pulse"/>
//                 )}

//               </button>
//             );
//           })}
//         </div>


//         {/* CALCULATOR BOX */}
//         <div className="
//           bg-white
//           rounded-3xl
//           shadow-2xl
//           border border-slate-200
//           p-5 sm:p-8 md:p-10 lg:p-14
//           transition-all duration-300
//         ">
//           {ActiveComp && <ActiveComp />}
//         </div>

//       </div>
//     </div>
//   );
// }





import { useState, useEffect } from "react";

import IncomeTaxCalculator from "../components/calculators/IncomeTaxCalculator";
import GstCalculator from "../components/calculators/GstCalculator";
import EmiCalculator from "../components/calculators/EmiCalculator";
import SipCalculator from "../components/calculators/SipCalculator";
import AdvanceTaxCalculator from "../components/calculators/AdvanceTaxCalculator";
import GstSearch from "../components/calculators/GstSearch";

import {
  Calculator,
  IndianRupee,
  Home,
  TrendingUp,
  Landmark,
  Search
} from "lucide-react";
import { calculatorsMaster } from "../components/calculators/calculatorsList";


export default function PublicCalculator() {

  /* ---------------- ACTIVE TAB ---------------- */
  const [active, setActive] = useState(null);

  /* ---------------- STORAGE DATA ---------------- */
  const stored = JSON.parse(localStorage.getItem("calculators")) || [];

  /* ---------------- ICON MAP ---------------- */
  const iconsMap = {
    tax: Calculator,
    gst: IndianRupee,
    advance: Landmark,
    emi: Home,
    sip: TrendingUp,
    "gst-search": Search,
  };

  /* ---------------- COMPONENT MAP ---------------- */
  const componentMap = {
    tax: IncomeTaxCalculator,
    gst: GstCalculator,
    advance: AdvanceTaxCalculator,
    emi: EmiCalculator,
    sip: SipCalculator,
    "gst-search": GstSearch,
  };

  /* ---------------- FILTER ACTIVE CALCULATORS ---------------- */
  const calculators = calculatorsMaster
    .filter(c => {
      const match = stored.find(s => s.id === c.id);
      return match ? match.status : true;
    })
    .map(c => ({
      ...c,
      icon: iconsMap[c.id],
      comp: componentMap[c.id]
    }));

  /* ---------------- AUTO SELECT FIRST ---------------- */
  useEffect(() => {
    if (!active && calculators.length)
      setActive(calculators[0].id);

    if (active && !calculators.find(c => c.id === active))
      setActive(calculators[0]?.id || null);
  }, [calculators]);

  /* ---------------- ACTIVE COMPONENT ---------------- */
  const ActiveComp = calculators.find(c => c.id === active)?.comp;

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 py-12 sm:py-16 px-3 sm:px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
            Financial Calculators
          </h1>

          <p className="text-slate-700 text-sm sm:text-base lg:text-lg">
            Smart tools for accurate financial planning
          </p>
        </div>


        {/* GRID */}
        {calculators.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mb-12">

            {calculators.map(c => {

              const Icon = c.icon;
              const isActive = active === c.id;

              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`
                  group relative rounded-2xl border p-4 sm:p-6
                  transition-all duration-300 text-left

                  ${isActive
                    ? "bg-gradient-to-br from-blue-700 to-blue-800 text-white shadow-xl scale-[1.04]"
                    : "bg-white border-slate-300 hover:shadow-lg hover:-translate-y-1"
                  }`}
                >

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

                  <p className={`text-xs sm:text-sm
                    ${isActive ? "text-blue-100" : "text-slate-700"}`}>
                    Advanced Calculator
                  </p>

                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-300/40 animate-pulse"/>
                  )}

                </button>
              );
            })}

          </div>
        ) : (
          <div className="text-center py-24 text-gray-400 text-lg">
            No calculators available
          </div>
        )}


        {/* CALCULATOR BOX */}
        {ActiveComp && (
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-5 sm:p-8 md:p-10 lg:p-14 transition-all duration-300">
            <ActiveComp />
          </div>
        )}

      </div>
    </div>
  );
}
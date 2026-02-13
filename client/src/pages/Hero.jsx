// import React from "react";
// import { useGetPublicHeroQuery } from "../redux/apis/heroApi";

// export default function Hero() {
//   const { data: hero, isLoading } = useGetPublicHeroQuery();

//   if (isLoading || !hero) return null;

//   return (
//     <section className="bg-gray-50">
//       <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">

//         <div className="grid lg:grid-cols-2 gap-10 items-center">

//           {/* LEFT SIDE */}
//           <div className="space-y-5">

//             <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
//               CHARTERED ACCOUNTANT SERVICES
//             </span>

//             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//               {hero.title}
//             </h1>

//             {hero.subtitle && (
//               <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
//                 {hero.subtitle}
//               </p>
//             )}

//             <div className="flex flex-wrap gap-4 pt-2">

//               <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-white font-semibold shadow-md">
//                 {hero.buttonText || "Get a Free Quote"}
//               </button>

//               <button  className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition px-6 py-3 rounded-lg text-gray-800 font-semibold">
//                 View Services
//               </button>

//             </div>

//             <div className="flex flex-wrap gap-6 pt-4 text-gray-600 text-sm">
//               <span>✔ 10+ Years Experience</span>
//               <span>✔ 500+ Clients</span>
//               <span>✔ Expert Advisory</span>
//             </div>

//           </div>

//           {/* RIGHT SIDE */}
//           <div>
//             <img
//               src={hero.backgroundImage}
//               alt="CA Professional"
//               className="w-full h-[380px] object-cover rounded-2xl shadow-lg"
//             />
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }



import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetPublicHeroQuery } from "../redux/apis/heroApi";

export default function Hero() {
  const { data: hero, isLoading } = useGetPublicHeroQuery();
  const navigate = useNavigate();

  if (isLoading || !hero) return null;

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          
          {/* LEFT SIDE */}
          <div className="space-y-5">
            <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
              CHARTERED ACCOUNTANT SERVICES
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {hero.title}
            </h1>

            {hero.subtitle && (
              <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                {hero.subtitle}
              </p>
            )}

            <div className="flex flex-wrap gap-4 pt-2">

              {/* Get Quote Button */}
              <button
                onClick={() => navigate("/contact")}
                className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-white font-semibold shadow-md"
              >
                {hero.buttonText || "Get a Free Quote"}
              </button>

              {/* View Services Button */}
              <button
                onClick={() => navigate("/services")}
                className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition px-6 py-3 rounded-lg text-gray-800 font-semibold"
              >
                View Services
              </button>

            </div>

            <div className="flex flex-wrap gap-6 pt-4 text-gray-600 text-sm">
              <span>✔ 10+ Years Experience</span>
              <span>✔ 500+ Clients</span>
              <span>✔ Expert Advisory</span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <img
              src={hero.backgroundImage}
              alt="CA Professional"
              className="w-full h-[380px] object-cover rounded-2xl shadow-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

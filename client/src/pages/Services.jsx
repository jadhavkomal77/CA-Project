// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useGetPublicServicesQuery } from "../redux/apis/serviceApi";

// export default function Services() {
//   const navigate = useNavigate();
//   const { data: services, isLoading } = useGetPublicServicesQuery();

//   if (isLoading) return null;

//   return (
//     <>
//       {/* ================= HEADER ================= */}
//       <section className="bg-gradient-to-b from-blue-50 to-white py-12">
//         <div className="max-w-6xl mx-auto px-6 text-center">

//           <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
//             Our Services
//           </span>

//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             Professional Chartered Accountant Services
//           </h1>

//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//             We offer comprehensive financial, tax, and advisory services
//             tailored to meet the needs of businesses and individuals.
//           </p>

//         </div>
//       </section>

//       {/* ================= SERVICES GRID ================= */}
//       <section className="bg-white py-16">
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

//           {services?.map((service) => (
//             <div
//               key={service._id}
//               className="
//                 bg-gray-50
//                 rounded-3xl
//                 p-8
//                 border border-gray-100
//                 shadow-sm
//                 hover:shadow-xl
//                 hover:-translate-y-2
//                 transition-all duration-300
//               "
//             >
//               {/* ICON */}
//               <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
//                 {service.icon || "📊"}
//               </div>

//               {/* TITLE */}
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                 {service.title}
//               </h3>

//               {/* DESC */}
//               <p className="text-gray-600 leading-relaxed mb-6">
//                 {service.shortDesc}
//               </p>

//               {/* CTA */}
//               <button
//                 onClick={() => navigate(`/services/${service.slug}`)}
//                 className="text-blue-600 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
//               >
//                 Learn More →
//               </button>

//             </div>
//           ))}

//         </div>
//       </section>

     
//     </>
//   );
// }




// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useGetPublicServicesQuery } from "../redux/apis/serviceApi";
// import * as Icons from "lucide-react";

// export default function Services() {
//   const navigate = useNavigate();
//   const { data: services, isLoading } = useGetPublicServicesQuery();

//   if (isLoading)
//     return <p className="text-center py-24 text-lg">Loading services...</p>;

//   return (
//     <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50">

//       {/* HEADER */}
//       <section className="py-12 text-center">
//         <h1 className="text-5xl font-bold text-gray-900 mb-5">
//           Our Services
//         </h1>
//         <p className="text-gray-600 max-w-xl mx-auto text-lg">
//           Professional financial, taxation and advisory solutions tailored for individuals and businesses.
//         </p>
//       </section>


//       {/* SERVICES GRID */}
//       <section className="pb-20">
//         <div className="max-w-7xl mx-auto px-6 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">

//           {services?.map(service=>{
//             const Icon = Icons[service.icon] || Icons.FileText;

//             return(
//               <div
//                 key={service._id}
//                 className="
//                 group relative
//                 bg-white/90 backdrop-blur
//                 rounded-3xl
//                 p-8
//                 shadow-[0_20px_60px_rgba(0,0,0,0.08)]
//                 hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)]
//                 transition-all duration-300
//                 hover:-translate-y-3
//                 "
//               >

//                 {/* hover gradient border */}
//                 <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-blue-200 transition"/>

//                 {/* ICON */}
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition">
//                   <Icon size={26} className="text-blue-600"/>
//                 </div>

//                 {/* TITLE */}
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">
//                   {service.title}
//                 </h3>

//                 {/* DESC */}
//                 <p className="text-gray-600 mb-6 leading-relaxed">
//                   {service.shortDesc}
//                 </p>

//                 {/* CTA */}
//                 <button
//                   onClick={()=>navigate(`/services/${service.slug}`)}
//                   className="font-semibold text-blue-600 hover:text-blue-800"
//                 >
//                   Learn More →
//                 </button>

//               </div>
//             )
//           })}
//         </div>
//       </section>

//     </div>
//   );
// }



import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetPublicServicesQuery } from "../redux/apis/serviceApi";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const navigate = useNavigate();
  const { data: services, isLoading } = useGetPublicServicesQuery();

  if (isLoading)
    return (
      <div className="h-[60vh] flex items-center justify-center text-lg font-medium text-gray-600">
        Loading services...
      </div>
    );

  /* container animation */
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  /* card animation */
  const item = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* HEADER */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="pt-16 pb-14 px-6 text-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Services
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Professional financial, taxation and advisory solutions tailored for
          individuals and businesses.
        </p>
      </motion.section>


      {/* GRID */}
      <section className="pb-24 px-4 sm:px-6">

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >

          {services?.map(service=>{
            const Icon = Icons[service.icon] || Icons.FileText;

            return(
              <motion.div
                variants={item}
                key={service._id}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.97 }}
                onClick={()=>navigate(`/services/${service.slug}`)}
                className="
                group relative
                cursor-pointer
                rounded-3xl
                p-7 sm:p-8
                bg-white/90 backdrop-blur
                shadow-lg
                transition
                overflow-hidden
                "
              >

                {/* glow background animation */}
                <div className="
                absolute inset-0 opacity-0 group-hover:opacity-100 transition
                bg-gradient-to-br from-blue-50 via-white to-indigo-50
                "/>

                {/* floating light */}
                <div className="
                absolute -top-10 -right-10 w-40 h-40 bg-blue-200
                rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition duration-700
                "/>

                {/* content wrapper */}
                <div className="relative z-10">

                  {/* ICON */}
                  <div className="
                    w-14 h-14 sm:w-16 sm:h-16
                    rounded-2xl
                    bg-gradient-to-br from-blue-50 to-indigo-50
                    flex items-center justify-center
                    mb-5
                    group-hover:scale-110
                    transition
                  ">
                    <Icon size={26} className="text-blue-600"/>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>

                  {/* DESC */}
                  <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* CTA */}
                  <span className="font-semibold text-blue-600 group-hover:text-blue-800 transition">
                    Learn More →
                  </span>

                </div>

              </motion.div>
            )
          })}

        </motion.div>
      </section>
    </div>
  );
}

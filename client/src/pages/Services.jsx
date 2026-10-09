

// import { useNavigate } from "react-router-dom";
// import { useGetPublicServicesQuery } from "../redux/apis/serviceApi";
// import {
//   Banknote,
//   Building2,
//   ClipboardCheck,
//   FileCheck,
//   FileText,
//   HandCoins,
//   LineChart,
//   UserPlus,
//   Wallet,
// } from "lucide-react";
// import { motion } from "framer-motion";

// export default function Services() {
//   const navigate = useNavigate();
//   const { data: services, isLoading } = useGetPublicServicesQuery();

//   const getServiceIcon = (serviceTitle = "") => {
//     const title = serviceTitle.toLowerCase();

//     if (title.includes("wealth management")) return Wallet;
//     if (
//       title.includes("income tax return preparation") ||
//       title.includes("income tax return") ||
//       title.includes("income tax")
//     ) {
//       return FileText;
//     }
//     if (title.includes("gst")) return FileCheck;
//     if (title.includes("company incorporation")) return Building2;
//     if (title.includes("audit") || title.includes("assurance")) return ClipboardCheck;
//     if (title.includes("startup") || title.includes("msme")) return UserPlus;
//     if (title.includes("project financing") || title.includes("government subsidies")) {
//       return HandCoins;
//     }
//     if (title.includes("financial planning") || title.includes("business advisory")) {
//       return LineChart;
//     }
//     if (title.includes("incorporation")) return Building2;
//     if (title.includes("financing")) return HandCoins;
//     if (title.includes("advisory")) return LineChart;
//     if (title.includes("tax")) return FileText;
//     if (title.includes("company")) return Building2;
//     if (title.includes("project")) return Banknote;

//     return FileText;
//   };

// //  if (isLoading && !services) {
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
// //       <section className="pt-16 pb-14 px-6 text-center">
// //         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 service-heading">
// //           OUR SERVICES
// //         </h1>

// //         <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
// //           Expert financial and compliance solutions tailored to your business needs.
// //         </p>
// //       </section>
// //     </div>
// //   );
// // }

//   /* container animation */
//   const container = {
//     hidden: {},
//     show: {
//       transition: {
//         staggerChildren: 0.12,
//       },
//     },
//   };

//   /* card animation */
//   const item = {
//     hidden: { opacity: 0, y: 40, scale: 0.96 },
//     show: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

//       {/* HEADER */}
//       <motion.section
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="pt-16 pb-14 px-6 text-center"
//       >
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 service-heading">
//           OUR SERVICES
//         </h1>

//         <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
//           Expert financial and compliance solutions tailored to your business needs.
//         </p>
//       </motion.section>


//       {/* GRID */}
//       <section className="pb-24 px-4 sm:px-6">

//         <motion.div
//           variants={container}
//           initial="hidden"
//           animate="show"
//           className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
//         >

//           {services?.map(service=>{
//             const Icon = getServiceIcon(service.title);

//             return(
//               <motion.div
//                 variants={item}
//                 key={service._id}
//                 whileHover={{
//                   y: -10,
//                   scale: 1.02,
//                 }}
//                 whileTap={{ scale: 0.97 }}
//                 onClick={()=>navigate(`/services/${service.slug}`)}
//                 className="
//                 group relative
//                 cursor-pointer
//                 rounded-3xl
//                 p-7 sm:p-8
//                 bg-white/90 backdrop-blur
//                 shadow-lg
//                 transition
//                 overflow-hidden
//                 "
//               >

//                 {/* glow background animation */}
//                 <div className="
//                 absolute inset-0 opacity-0 group-hover:opacity-100 transition
//                 bg-gradient-to-br from-blue-50 via-white to-indigo-50
//                 "/>

//                 {/* floating light */}
//                 <div className="
//                 absolute -top-10 -right-10 w-40 h-40 bg-blue-200
//                 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition duration-700
//                 "/>

//                 {/* content wrapper */}
//                 <div className="relative z-10">

//                   {/* ICON */}
//                   <div className="
//                     w-14 h-14 sm:w-16 sm:h-16
//                     rounded-2xl
//                     bg-gradient-to-br from-blue-50 to-indigo-50
//                     flex items-center justify-center
//                     mb-5
//                     group-hover:scale-110
//                     transition
//                   ">
//                     <Icon className="w-6 h-6 text-blue-600"/>
//                   </div>

//                   {/* TITLE */}
//                   <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
//                     {service.title}
//                   </h3>

//                   {/* DESC */}
//                   <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed">
//                     {service.shortDesc}
//                   </p>

//                   {/* CTA */}
//                   <span className="font-semibold text-blue-600 group-hover:text-blue-800 transition">
//                     Read More →
//                   </span>

//                 </div>

//               </motion.div>
//             )
//           })}

//         </motion.div>
//       </section>
//     </div>
//   );
// }





import { useNavigate } from "react-router-dom";
import { useGetPublicServicesQuery } from "../redux/apis/serviceApi";
import {
  Banknote,
  Building2,
  ClipboardCheck,
  FileCheck,
  FileText,
  HandCoins,
  LineChart,
  UserPlus,
  Wallet,
} from "lucide-react";
import { motion } from "framer-motion";

// Fallback data: displayed immediately until API data is available.
// These are generic placeholders, not your confirmed database records.
const fallbackServices = [
  {
    _id: "fallback-income-tax",
    title: "Income Tax Return Preparation",
    shortDesc: "Professional income tax return preparation and filing assistance.",
    slug: "income-tax-return-preparation",
  },
  {
    _id: "fallback-gst",
    title: "GST Services",
    shortDesc: "GST registration, return filing and compliance assistance.",
    slug: "gst-services",
  },
  {
    _id: "fallback-audit",
    title: "Audit & Assurance",
    shortDesc: "Reliable audit and assurance support for your business.",
    slug: "audit-assurance",
  },
  {
    _id: "fallback-company",
    title: "Company Incorporation",
    shortDesc: "Support with company registration and incorporation formalities.",
    slug: "company-incorporation",
  },
  {
    _id: "fallback-advisory",
    title: "Business Advisory",
    shortDesc: "Financial guidance to support informed business decisions.",
    slug: "business-advisory",
  },
  {
    _id: "fallback-financing",
    title: "Project Financing",
    shortDesc: "Assistance with project finance planning and funding options.",
    slug: "project-financing",
  },
];

export default function Services() {
  const navigate = useNavigate();

  const { data: services } = useGetPublicServicesQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  // Show API data when available; otherwise display fallback cards.
  const serviceList =
    Array.isArray(services) && services.length > 0
      ? services
      : fallbackServices;

  const getServiceIcon = (serviceTitle = "") => {
    const title = serviceTitle.toLowerCase();

    if (title.includes("wealth management")) return Wallet;

    if (
      title.includes("income tax return preparation") ||
      title.includes("income tax return") ||
      title.includes("income tax")
    ) {
      return FileText;
    }

    if (title.includes("gst")) return FileCheck;
    if (title.includes("company incorporation")) return Building2;

    if (title.includes("audit") || title.includes("assurance")) {
      return ClipboardCheck;
    }

    if (title.includes("startup") || title.includes("msme")) {
      return UserPlus;
    }

    if (
      title.includes("project financing") ||
      title.includes("government subsidies")
    ) {
      return HandCoins;
    }

    if (
      title.includes("financial planning") ||
      title.includes("business advisory")
    ) {
      return LineChart;
    }

    if (title.includes("incorporation")) return Building2;
    if (title.includes("financing")) return HandCoins;
    if (title.includes("advisory")) return LineChart;
    if (title.includes("tax")) return FileText;
    if (title.includes("company")) return Building2;
    if (title.includes("project")) return Banknote;

    return FileText;
  };

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* HEADER */}
      <section className="pt-12 sm:pt-14 md:pt-16 pb-8 sm:pb-10 md:pb-14 px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 service-heading">
          OUR SERVICES
        </h1>

        <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
          Expert financial and compliance solutions tailored to your business needs.
        </p>
      </section>

      {/* SERVICE CARDS */}
      <section className="pb-14 sm:pb-20 md:pb-24 px-4 sm:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
        >
          {serviceList.map((service) => {
            const Icon = getServiceIcon(service.title);

            return (
              <motion.div
                variants={item}
                key={service._id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate(`/services/${service.slug}`)}
                className="
                  group relative h-full
                  cursor-pointer overflow-hidden
                  rounded-2xl sm:rounded-3xl
                  p-6 sm:p-7 md:p-8
                  bg-white/90
                  shadow-md hover:shadow-xl
                  transition-shadow duration-200
                "
              >
                {/* Hover background */}
                <div
                  className="
                    absolute inset-0
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200
                    bg-gradient-to-br from-blue-50 via-white to-indigo-50
                  "
                />

                {/* Card content */}
                <div className="relative z-10">
                  {/* ICON */}
                  <div
                    className="
                      w-14 h-14 sm:w-16 sm:h-16
                      bg-gradient-to-br from-blue-50 to-indigo-50
                      flex items-center justify-center
                      mb-5
                    "
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                  </div>

                  {/* TITLE */}
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* CTA */}
                  <span className="font-semibold text-blue-600 group-hover:text-blue-800 transition-colors">
                    Read More →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}



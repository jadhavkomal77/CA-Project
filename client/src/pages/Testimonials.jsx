

// import { Star, Quote } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function Testimonials() {
//   const navigate = useNavigate();

//   const testimonials = [
//     {
//       name: "Rahul Sharma",
//       role: "Retail Business Owner",
//       review:
//         "Excellent GST and tax compliance support. Filing process was smooth and timely. Highly recommended.",
//       highlight: true
//     },
//     {
//       name: "Priya Mehta",
//       role: "Salaried Professional",
//       review:
//         "Income tax filing handled professionally. Maximum deductions claimed without hassle."
//     },
//     {
//       name: "Neha Patel",
//       role: "Freelancer",
//       review:
//         "Very helpful team. They guided me step-by-step and made tax filing stress-free."
//     },
//     {
//       name: "Vikram Singh",
//       role: "Contractor",
//       review:
//         "Fast service and accurate work. Highly professional and trustworthy firm."
//     },
//     {
//       name: "Anjali Shah",
//       role: "Entrepreneur",
//       review:
//         "Their consultancy saved me a lot of tax legally. Extremely satisfied with service."
//     },
//     {
//       name: "Rohan Kulkarni",
//       role: "IT Professional",
//       review:
//         "Clear guidance, transparent charges and excellent support. Definitely recommend."
//     }
//   ];

//   return (
//     <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">

//       {/* HEADER */}
//       <section className="py-16 text-center px-6">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
//             Client Testimonials
//           </h1>

//           <div className="w-24 h-1 bg-blue-700 mx-auto mt-6 rounded-full" />

//           <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
//             Trusted by clients for professional, reliable and transparent financial services.
//           </p>
//         </motion.div>
//       </section>


//       {/* TESTIMONIALS GRID */}
//       <section className="pb-24 px-6">
//         <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">

//           {testimonials.map((t, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 25 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.08 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -8 }}
//               className={`
//                 relative p-8 rounded-2xl transition
//                 ${t.highlight
//                   ? "bg-gradient-to-br from-blue-700 to-indigo-700 text-white shadow-xl"
//                   : "bg-white shadow-md hover:shadow-xl"}
//               `}
//             >

//               <Quote
//                 size={40}
//                 className={`absolute top-6 right-6 ${
//                   t.highlight ? "text-white/30" : "text-blue-100"
//                 }`}
//               />

//               {/* Stars */}
//               <div className="flex gap-1 mb-4">
//                 {[...Array(5)].map((_, index) => (
//                   <Star
//                     key={index}
//                     size={17}
//                     fill="currentColor"
//                     className="text-yellow-400"
//                   />
//                 ))}
//               </div>

//               {/* Review */}
//               <p className={`mb-6 ${t.highlight ? "text-white" : "text-gray-600"}`}>
//                 "{t.review}"
//               </p>

//               {/* User */}
//               <div className="border-t pt-4 border-white/20">
//                 <h4 className="font-semibold">{t.name}</h4>
//                 <p className={t.highlight ? "text-white/80 text-sm" : "text-gray-500 text-sm"}>
//                   {t.role}
//                 </p>
//               </div>

//             </motion.div>
//           ))}
//         </div>


//         {/* CTA */}
//         <div className="mt-24 text-center">
//           <h2 className="text-3xl font-bold text-blue-900 mb-4">
//             Need Expert Financial Help?
//           </h2>

//           <button
//             onClick={() => navigate("/contact")}
//             className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-xl font-semibold shadow-lg transition"
//           >
//             Book Consultation
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }



// import { Star, Quote } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useGetTestimonialsQuery } from "../redux/apis/testimonialApi";

// export default function Testimonials() {
//   const navigate = useNavigate();
//   const { data: testimonials = [], isLoading } = useGetTestimonialsQuery();

//   return (
//     <div className="bg-[#F8FAFC] min-h-screen">

//       {/* HEADER */}
//       <section className="pt-24 pb-16 text-center px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="max-w-3xl mx-auto"
//         >
//           <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-wider">
//             Client Success Stories
//           </span>

//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-4 mb-6">
//             What Our Clients Say
//           </h1>

//           <div className="flex justify-center items-center gap-3 mb-6">
//             <div className="w-20 h-1 bg-[#2563EB] rounded-full" />
//             <div className="w-2 h-2 bg-[#2563EB] rounded-full" />
//             <div className="w-20 h-1 bg-[#2563EB] rounded-full" />
//           </div>

//           <p className="text-lg text-gray-600 leading-relaxed">
//             Trusted by hundreds of clients for reliable, transparent and professional financial services.
//           </p>
//         </motion.div>
//       </section>

//       {/* GRID */}
//       <section className="pb-24 px-6">
//         <div className="max-w-7xl mx-auto">

//           {/* LOADING */}
//           {isLoading && (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[...Array(6)].map((_, i) => (
//                 <div key={i} className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm animate-pulse space-y-4">
//                   <div className="flex gap-4">
//                     <div className="w-12 h-12 rounded-full bg-gray-200" />
//                     <div className="flex-1 space-y-2">
//                       <div className="h-4 bg-gray-200 rounded w-3/4" />
//                       <div className="h-3 bg-gray-200 rounded w-1/2" />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <div className="h-3 bg-gray-200 rounded w-full" />
//                     <div className="h-3 bg-gray-200 rounded w-5/6" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* DATA */}
//           {!isLoading && testimonials.length > 0 && (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//               {testimonials.map((t, i) => (
//                 <motion.div
//                   key={t._id}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                   viewport={{ once: true }}
//                   whileHover={{ y: -8 }}
//                   className={`
//                     relative p-6 rounded-xl transition-all duration-300
//                     ${t.highlight
//                       ? "bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] text-white shadow-2xl"
//                       : "bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#2563EB]"}
//                   `}
//                 >

//                   {/* Quote */}
//                   <Quote
//                     size={32}
//                     className={`absolute top-4 right-4 opacity-20 ${
//                       t.highlight ? "text-white" : "text-[#2563EB]"
//                     }`}
//                   />

//                   {/* USER */}
//                   <div className="flex gap-4 mb-4">

//                     {/* Avatar */}
//                     {t.image ? (
//                       <img
//                         src={t.image}
//                         alt={t.name}
//                         className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
//                       />
//                     ) : (
//                       <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg
//                         ${t.highlight
//                           ? "bg-white/20 text-white"
//                           : "bg-[#DBEAFE] text-[#1E3A8A]"
//                         }`}>
//                         {t.name?.charAt(0)}
//                       </div>
//                     )}

//                     <div>
//                       <h4 className={`font-bold text-lg ${t.highlight ? "text-white" : "text-gray-900"}`}>
//                         {t.name}
//                       </h4>
//                       <p className={`${t.highlight ? "text-white/80" : "text-gray-500"} text-sm`}>
//                         {t.role}
//                       </p>
//                     </div>
//                   </div>

//                   {/* STARS */}
//                   <div className="flex gap-1 mb-4">
//                     {[...Array(5)].map((_, index) => (
//                       <Star key={index} size={16} fill="currentColor"
//                         className={`${t.highlight ? "text-yellow-300" : "text-yellow-400"}`} />
//                     ))}
//                   </div>

//                   {/* TEXT */}
//                   <p className={`text-sm leading-relaxed ${t.highlight ? "text-white/95" : "text-gray-700"}`}>
//                     "{t.review}"
//                   </p>

//                   {/* FEATURED */}
//                   {t.highlight && (
//                     <div className="mt-5 pt-4 border-t border-white/20">
//                       <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-semibold">
//                         Featured Review
//                       </span>
//                     </div>
//                   )}

//                 </motion.div>
//               ))}

//             </div>
//           )}

//           {/* EMPTY */}
//           {!isLoading && testimonials.length === 0 && (
//             <div className="text-center py-20">
//               <Quote size={40} className="mx-auto text-gray-300 mb-4" />
//               <p className="text-gray-500 text-lg">No testimonials yet</p>
//             </div>
//           )}
//         </div>

//         {/* CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mt-24 text-center max-w-3xl mx-auto"
//         >
//           <div className="bg-gradient-to-r bg-gray-100 rounded-2xl p-12 shadow-2xl">

//             <h2 className="text-3xl font-bold text-black mb-4">
//               Ready to Experience Excellence?
//             </h2>

//             <p className="text-blue-500 mb-8">
//               Join hundreds of satisfied clients who trust us with their financial needs.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button
//                 onClick={() => navigate("/contact")}
//                 className="bg-white text-blue-500 px-8 py-4 rounded-lg font-semibold shadow hover:scale-105 transition"
//               >
//                 Book Consultation
//               </button>

//               <button
//                 onClick={() => navigate("/services")}
//                 className="bg-blue-600 text-black border border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition"
//               >
//                 View Services
//               </button>
//             </div>

//           </div>
//         </motion.div>
//       </section>
//     </div>
//   );
// }












import { Star, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetTestimonialsQuery } from "../redux/apis/testimonialApi";

export default function Testimonials() {
  const navigate = useNavigate();
  const { data: testimonials = [], isLoading } = useGetTestimonialsQuery();

  return (
    <div className="bg-[#F8FAFC] min-h-screen">

      {/* HEADER */}
      <section className="pt-24 pb-16 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-wider">
            Client Success Stories
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-4 mb-6">
            What Our Clients Say
          </h1>

          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="w-20 h-1 bg-[#2563EB] rounded-full" />
            <div className="w-2 h-2 bg-[#2563EB] rounded-full" />
            <div className="w-20 h-1 bg-[#2563EB] rounded-full" />
          </div>

          <p className="text-lg text-gray-600">
            Trusted by hundreds of clients for reliable and professional financial services.
          </p>
        </motion.div>
      </section>

      {/* GRID */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* LOADING */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-8 rounded-xl bg-white shadow animate-pulse space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gray-200" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              ))}
            </div>
          )}

          {/* DATA */}
          {!isLoading && testimonials.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {testimonials.map((t, i) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className={`
                    relative p-8 rounded-2xl transition-all duration-300
                    ${t.highlight
                      ? "bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] text-white shadow-2xl"
                      : "bg-white border border-gray-200 shadow hover:shadow-xl hover:border-[#2563EB]"}
                  `}
                >

                  {/* Quote */}
                  <Quote
                    size={36}
                    className={`absolute top-6 right-6 opacity-20 ${
                      t.highlight ? "text-white" : "text-[#2563EB]"
                    }`}
                  />

                  {/* USER */}
                  <div className="flex flex-col items-center text-center mb-6">

                    {/* LARGE AVATAR */}
                    {t.image ? (
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-4"
                      />
                    ) : (
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mb-4
                        ${t.highlight
                          ? "bg-white/20 text-white"
                          : "bg-[#DBEAFE] text-[#1E3A8A]"
                        }`}>
                        {t.name?.charAt(0)}
                      </div>
                    )}

                    <h4 className={`font-bold text-xl ${t.highlight ? "text-white" : "text-gray-900"}`}>
                      {t.name}
                    </h4>

                    <p className={`${t.highlight ? "text-white/80" : "text-gray-500"} text-sm`}>
                      {t.role}
                    </p>
                  </div>

                  {/* STARS */}
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} size={18} fill="currentColor"
                        className={`${t.highlight ? "text-yellow-300" : "text-yellow-400"}`} />
                    ))}
                  </div>

                  {/* TEXT */}
                  <p className={`text-sm text-center leading-relaxed ${t.highlight ? "text-white/95" : "text-gray-700"}`}>
                    "{t.review}"
                  </p>

                  {/* FEATURE BADGE */}
                  {t.highlight && (
                    <div className="mt-6 text-center">
                      <span className="text-xs bg-white/20 px-4 py-1 rounded-full font-semibold">
                        Featured Review
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}

            </div>
          )}

          {/* EMPTY */}
          {!isLoading && testimonials.length === 0 && (
            <div className="text-center py-20">
              <Quote size={40} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No testimonials yet</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-28 text-center max-w-3xl mx-auto"
        >
          <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-xl">

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Work With Professionals?
            </h2>

            <p className="text-gray-600 mb-8">
              Let our experts handle your taxes, compliance and financial planning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/contact")}
                className="bg-[#2563EB] text-white px-8 py-4 rounded-xl font-semibold shadow hover:scale-105 transition"
              >
                Book Consultation
              </button>

              <button
                onClick={() => navigate("/services")}
                className="border border-[#2563EB] text-[#2563EB] px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition"
              >
                View Services
              </button>
            </div>

          </div>
        </motion.div>
      </section>
    </div>
  );
}
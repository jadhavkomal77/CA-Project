
// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useGetPublicServiceBySlugQuery } from "../redux/apis/serviceApi";

// export default function ServiceDetails() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const { data: service, isLoading, isError } =
//     useGetPublicServiceBySlugQuery(slug);

//   if (isLoading) return <p className="p-10 text-center">Loading...</p>;
//   if (isError || !service)
//     return <p className="p-10 text-center text-red-500">Service not found</p>;

//   return (
//     <>
//       {/* ================= HEADER ================= */}
//       <section className="bg-gradient-to-b from-gray-50 to-white py-12">
//         <div className="max-w-5xl mx-auto px-6 text-center animate-fade-in-up">
//           <div className="text-4xl mb-4">{service.icon || "⚡"}</div>

//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             {service.title}
//           </h1>

//           <p className="text-gray-600 text-lg max-w-3xl mx-auto">
//             {service.longDesc || service.shortDesc}
//           </p>
//         </div>
//       </section>

//       {/* ================= WHY CHOOSE ================= */}
//       {service.whyChoose?.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-6xl mx-auto px-6">
//             <h2 className="text-3xl font-bold text-center mb-10">
//               Why Choose This Service
//             </h2>

//             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
//               {service.whyChoose.map((item, i) => (
//                 <div
//                   key={i}
//                   className="bg-gray-50 rounded-2xl p-6 shadow animate-scale-in"
//                 >
//                   <div className="text-3xl mb-3">{item.icon || "✔"}</div>
//                   <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
//                   <p className="text-gray-600 text-sm">{item.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ================= PROCESS ================= */}
//       {service.process?.length > 0 && (
//         <section className="py-16 bg-gray-50">
//           <div className="max-w-6xl mx-auto px-6">
//             <h2 className="text-3xl font-bold text-center mb-10">
//               Our Process
//             </h2>

//             <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
//               {service.process.map((step, i) => (
//                 <div
//                   key={i}
//                   className="bg-white rounded-2xl p-6 shadow animate-fade-in-up"
//                 >
//                   <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4">
//                     {step.step}
//                   </div>
//                   <h3 className="font-semibold mb-2">{step.title}</h3>
//                   <p className="text-gray-600 text-sm">{step.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ================= TECHNOLOGIES ================= */}
//       {service.technologies?.length > 0 && (
//         <section className="py-14 bg-white">
//           <div className="max-w-5xl mx-auto px-6 text-center">
//             <h2 className="text-3xl font-bold mb-6">Technologies</h2>

//             <div className="flex flex-wrap justify-center gap-4">
//               {service.technologies.map((tech, i) => (
//                 <span
//                   key={i}
//                   className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
//                 >
//                   {tech}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ================= PROJECTS ================= */}
//       {service.projects?.length > 0 && (
//         <section className="py-16 bg-gray-50">
//           <div className="max-w-6xl mx-auto px-6">
//             <h2 className="text-3xl font-bold text-center mb-10">
//               Related Projects
//             </h2>

//             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
//               {service.projects.map((project, i) => (
//                 <div
//                   key={i}
//                   className="bg-white rounded-2xl shadow overflow-hidden animate-fade-in-up"
//                 >
//                   {project.image && (
//                     <img
//                       src={project.image}
//                       alt={project.title}
//                       className="w-full h-48 object-cover"
//                     />
//                   )}

//                   <div className="p-5">
//                     <h3 className="font-semibold mb-2">{project.title}</h3>
//                     <p className="text-gray-600 text-sm mb-3">
//                       {project.desc}
//                     </p>

//                     <div className="flex flex-wrap gap-2">
//                       {project.tech?.map((t, idx) => (
//                         <span
//                           key={idx}
//                           className="text-xs px-2 py-1 bg-gray-200 rounded"
//                         >
//                           {t}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ================= CTA ================= */}
//       <section className="bg-gray-100 py-20">
//         <div className="max-w-4xl mx-auto px-6 text-center text-black">
//           <h2 className="text-3xl font-bold mb-4">
//             Interested in this service?
//           </h2>
//           <p className="text-black mb-8">
//             Contact us today for expert assistance and free consultation.
//           </p>

//           <button
//             onClick={() => navigate("/contact")}
//             className="bg-yellow-500 hover:bg-yellow-600 px-10 py-4 rounded-md font-semibold transition"
//           >
//             Contact Us
//           </button>
//         </div>
//       </section>
//     </>
//   );
// }





// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useGetPublicServiceBySlugQuery } from "../redux/apis/serviceApi";

// export default function ServiceDetails() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const { data: service, isLoading, isError } =
//     useGetPublicServiceBySlugQuery(slug);

//   if (isLoading) return <p className="p-10 text-center">Loading...</p>;
//   if (isError || !service)
//     return <p className="p-10 text-center text-red-500">Service not found</p>;

//   return (
//     <>
//       {/* ================= HEADER ================= */}
//       <section className="bg-gradient-to-b from-gray-50 to-white py-12">
//         <div className="max-w-5xl mx-auto px-6 text-center animate-fade-in-up">
//           <div className="text-4xl mb-4">{service.icon || "⚡"}</div>

//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             {service.title}
//           </h1>

//           <p className="text-gray-600 text-lg max-w-3xl mx-auto">
//             {service.longDesc || service.shortDesc}
//           </p>
//         </div>
//       </section>

//       {/* ================= WHY CHOOSE ================= */}
//       {service.whyChoose?.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-6xl mx-auto px-6">
//             <h2 className="text-3xl font-bold text-center mb-10">
//               Why Choose This Service
//             </h2>

//             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
//               {service.whyChoose.map((item, i) => (
//                 <div
//                   key={i}
//                   className="bg-gray-50 rounded-2xl p-6 shadow animate-scale-in"
//                 >
//                   <div className="text-3xl mb-3">{item.icon || "✔"}</div>
//                   <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
//                   <p className="text-gray-600 text-sm">{item.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ================= PROCESS ================= */}
//       {service.process?.length > 0 && (
//         <section className="py-16 bg-gray-50">
//           <div className="max-w-6xl mx-auto px-6">
//             <h2 className="text-3xl font-bold text-center mb-10">
//               Our Process
//             </h2>

//             <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
//               {service.process.map((step, i) => (
//                 <div
//                   key={i}
//                   className="bg-white rounded-2xl p-6 shadow animate-fade-in-up"
//                 >
//                   <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4">
//                     {step.step}
//                   </div>
//                   <h3 className="font-semibold mb-2">{step.title}</h3>
//                   <p className="text-gray-600 text-sm">{step.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ================= APPLY CTA STRIP ================= */}
//       <section className="py-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
//         <div className="max-w-4xl mx-auto px-6">

//           <h3 className="text-3xl font-bold text-slate-900 mb-6">
//             Ready to Apply for this Service?
//           </h3>

//           <p className="text-slate-600 mb-10">
//             Start your journey today and let our experts handle everything for you.
//           </p>

//           <button
//             onClick={() => navigate(`/apply/${service.slug}`)}
//             className="relative inline-flex items-center justify-center px-12 py-4 overflow-hidden font-semibold text-white transition duration-300 bg-gradient-to-r from-blue-600 to-blue-600 rounded-xl shadow-lg group hover:scale-105"
//           >
//             <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-600 opacity-0 group-hover:opacity-100 transition duration-300"></span>

//             <span className="relative">Apply Now</span>
//           </button>

//         </div>
//       </section>

//       {/* ================= TECHNOLOGIES ================= */}
//       {service.technologies?.length > 0 && (
//         <section className="py-14 bg-white">
//           <div className="max-w-5xl mx-auto px-6 text-center">
//             <h2 className="text-3xl font-bold mb-6">Technologies</h2>

//             <div className="flex flex-wrap justify-center gap-4">
//               {service.technologies.map((tech, i) => (
//                 <span
//                   key={i}
//                   className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
//                 >
//                   {tech}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ================= PROJECTS ================= */}
//       {service.projects?.length > 0 && (
//         <section className="py-16 bg-gray-50">
//           <div className="max-w-6xl mx-auto px-6">
//             <h2 className="text-3xl font-bold text-center mb-10">
//               Related Projects
//             </h2>

//             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
//               {service.projects.map((project, i) => (
//                 <div
//                   key={i}
//                   className="bg-white rounded-2xl shadow overflow-hidden animate-fade-in-up"
//                 >
//                   {project.image && (
//                     <img
//                       src={project.image}
//                       alt={project.title}
//                       className="w-full h-48 object-cover"
//                     />
//                   )}

//                   <div className="p-5">
//                     <h3 className="font-semibold mb-2">{project.title}</h3>
//                     <p className="text-gray-600 text-sm mb-3">
//                       {project.desc}
//                     </p>

//                     <div className="flex flex-wrap gap-2">
//                       {project.tech?.map((t, idx) => (
//                         <span
//                           key={idx}
//                           className="text-xs px-2 py-1 bg-gray-200 rounded"
//                         >
//                           {t}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ================= CTA ================= */}
//       <section className="bg-gray-100 py-20">
//         <div className="max-w-4xl mx-auto px-6 text-center text-black">
//           <h2 className="text-3xl font-bold mb-4">
//             Interested in this service?
//           </h2>
//           <p className="text-black mb-8">
//             Contact us today for expert assistance and free consultation.
//           </p>

//           <button
//             onClick={() => navigate("/contact")}
//             className="bg-yellow-500 hover:bg-yellow-600 px-10 py-4 rounded-md font-semibold transition"
//           >
//             Contact Us
//           </button>
//         </div>
//       </section>
//     </>
//   );
// }



import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPublicServiceBySlugQuery } from "../redux/apis/serviceApi";
import { motion } from "framer-motion";

export default function ServiceDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: service, isLoading, isError } =
    useGetPublicServiceBySlugQuery(slug);

  if (isLoading)
    return (
      <div className="h-[60vh] flex items-center justify-center text-lg font-semibold">
        Loading service...
      </div>
    );

  if (isError || !service)
    return (
      <div className="h-[60vh] flex items-center justify-center text-red-500 text-lg">
        Service not found
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* ================= HERO ================= */}
      <section className="py-16 text-center px-6">
        <div className="text-5xl mb-4">{service.icon || "📊"}</div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {service.title}
        </h1>

        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          {service.longDesc || service.shortDesc}
        </p>
      </section>


      {/* ================= WHY CHOOSE ================= */}
      {service.whyChoose?.length > 0 && (
        <section className="py-20 bg-white">
          <h2 className="text-3xl font-bold text-center mb-14">
            Why Choose This Service
          </h2>

          <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {service.whyChoose.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="bg-gray-50 rounded-3xl p-7 shadow hover:shadow-xl transition"
              >
                <div className="text-4xl mb-4">{item.icon || "✔"}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}


      {/* ================= PROCESS ================= */}
      {service.process?.length > 0 && (
        <section className="py-20 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-14">
            Our Process
          </h2>

          <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
            {service.process.map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-7 shadow hover:shadow-xl transition text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 font-bold">
                  {step.step}
                </div>

                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* ================= APPLY CTA ================= */}
      <section className="py-20 text-center">
        <h3 className="text-3xl font-bold mb-6">
          Ready to Apply for this Service?
        </h3>

        <p className="text-gray-600 mb-10">
          Start your journey today and let our experts handle everything.
        </p>

        <button
          onClick={() => navigate(`/apply/${service.slug}`)}
          className="px-12 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow hover:scale-105 transition"
        >
          Apply Now
        </button>
      </section>


      {/* ================= TECHNOLOGIES ================= */}
      {service.technologies?.length > 0 && (
        <section className="py-20 bg-white text-center">
          <h2 className="text-3xl font-bold mb-10">Technologies</h2>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {service.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}


      {/* ================= PROJECTS ================= */}
      {service.projects?.length > 0 && (
        <section className="py-20 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-14">
            Related Projects
          </h2>

          <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-10">

            {service.projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl shadow hover:shadow-2xl transition overflow-hidden"
              >

                {/* IMAGE */}
                <img
                  src={
                    project.image ||
                    "https://dummyimage.com/600x400/e5e7eb/9ca3af&text=No+Image"
                  }
                  alt={project.title}
                  className="w-full h-52 object-cover transition duration-500 hover:scale-110"
                />

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech?.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 bg-gray-200 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

          </div>
        </section>
      )}


      {/* ================= CONTACT CTA ================= */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Interested in this service?
        </h2>

        <p className="text-gray-600 mb-10">
          Contact us today for expert assistance and consultation.
        </p>

        <button
          onClick={() => navigate("/contact")}
          className="px-12 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl shadow transition"
        >
          Contact Us
        </button>
      </section>

    </div>
  );
}

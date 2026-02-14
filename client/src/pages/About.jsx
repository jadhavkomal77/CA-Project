// import React from "react";
// import { useGetPublicAboutQuery } from "../redux/apis/aboutApi";

// export default function About() {
//   const { data: about, isLoading } = useGetPublicAboutQuery();
//   if (isLoading || !about) return null;

//   return (
//     <section className="bg-gray-50 py-16">
//       <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-14 items-center">

//         {/* IMAGE SIDE */}
//         <div className="relative">
//           <img
//             src={about.image}
//             alt="About CA Firm"
//             className="w-full h-[420px] object-cover rounded-3xl shadow-xl"
//           />

//           {/* Experience Badge */}
//           <div className="absolute -bottom-6 -right-6 bg-white px-6 py-4 rounded-2xl shadow-lg border border-gray-100">
//             <h3 className="text-3xl font-bold text-blue-600">
//               {about.experience}+
//             </h3>
//             <p className="text-sm text-gray-500 font-medium">
//               Years of Experience
//             </p>
//           </div>
//         </div>

//         {/* CONTENT SIDE */}
//         <div>

//           <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold tracking-wide mb-4">
//             About Our Firm
//           </span>

//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
//             {about.title}
//           </h2>

//           <p className="text-gray-600 leading-relaxed mb-4">
//             {about.description1}
//           </p>

//           {about.description2 && (
//             <p className="text-gray-600 leading-relaxed mb-8">
//               {about.description2}
//             </p>
//           )}

//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition">
//             Learn More
//           </button>

//         </div>

//       </div>
//     </section>
//   );
// }



import React from "react";
import { useGetPublicAboutQuery } from "../redux/apis/aboutApi";
import { useNavigate } from "react-router-dom";

export default function About() {
  const { data: about, isLoading } = useGetPublicAboutQuery();
  const navigate = useNavigate();

  if (isLoading || !about) return null;

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-14 items-center">

        <div className="relative">
          <img
            src={about.image}
            alt="About CA Firm"
            className="w-full h-[420px] object-cover rounded-3xl shadow-xl"
          />

          <div className="absolute -bottom-6 -right-6 bg-white px-6 py-4 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-3xl font-bold text-blue-600">
              {about.experience}+
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              Years of Experience
            </p>
          </div>
        </div>

        <div>

          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold tracking-wide mb-4">
            About Our Firm
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            {about.title}
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            {about.description1}
          </p>

          {about.description2 && (
            <p className="text-gray-600 leading-relaxed mb-8">
              {about.description2}
            </p>
          )}

          <button
            onClick={()=>navigate("/about-details")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition"
          >
            Learn More
          </button>

        </div>

      </div>
    </section>
  );
}

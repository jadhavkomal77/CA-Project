import { useGetPublicAboutQuery } from "../redux/apis/aboutApi";
import { motion } from "framer-motion";

export default function AboutDetails() {
  const { data: about, isLoading } = useGetPublicAboutQuery();

  if (isLoading || !about)
    return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* HERO */}
      <section className="py-20 text-center">
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Our Firm
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Professional consulting and financial advisory firm delivering
            trusted services with excellence and integrity.
          </p>
        </motion.div>
      </section>


      {/* CONTENT */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <motion.img
            initial={{ opacity:0, scale:.95 }}
            animate={{ opacity:1, scale:1 }}
            src={about.image}
            className="rounded-3xl shadow-2xl w-full object-cover h-[420px]"
          />

          {/* TEXT */}
          <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }}>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {about.title}
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              {about.description1}
            </p>

            {about.description2 && (
              <p className="text-gray-600 leading-relaxed mb-4">
                {about.description2}
              </p>
            )}

            {/* Extra Section */}
            <div className="mt-8 grid grid-cols-2 gap-6">

              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <h3 className="text-3xl font-bold text-blue-600">
                  {about.experience}+
                </h3>
                <p className="text-gray-500 text-sm">Years Experience</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <h3 className="text-3xl font-bold text-blue-600">500+</h3>
                <p className="text-gray-500 text-sm">Clients Served</p>
              </div>

            </div>

          </motion.div>

        </div>
      </section>


      {/* CTA */}
      <section className="bg-gray-200-700 py-20 text-center text-black">
        <h2 className="text-3xl font-bold mb-4">
          Need Professional Financial Guidance?
        </h2>

        <p className="opacity-90 mb-8">
          Contact our expert team for consultation and tailored financial solutions.
        </p>

      <button
  onClick={() => window.location.href="/contact"}
  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-10 py-4 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
>
  Contact Now
</button>

      </section>

    </div>
  );
}

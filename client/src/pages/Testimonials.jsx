
import { Star, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetTestimonialsQuery } from "../redux/apis/testimonialApi";

export default function Testimonials() {
  const navigate = useNavigate();

  const { data: testimonials = [], isLoading } =
    useGetTestimonialsQuery();

  return (
    <div className="bg-[#F8FAFC] min-h-screen">

      {/* HEADER */}
      <section className="pt-24 pb-16 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
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
           Real feedback from individuals and businesses who rely on our tax and compliance expertise.
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
                <div key={i} className="p-8 rounded-2xl bg-white shadow animate-pulse space-y-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
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
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -12 }}
                  className={`
                    relative p-8 rounded-2xl transition
                    ${t.highlight
                      ? "bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] text-white shadow-2xl"
                      : "bg-white border border-gray-200 shadow hover:shadow-xl"}
                  `}
                >

                  {/* Quote icon */}
                  <Quote
                    size={36}
                    className={`absolute top-6 right-6 opacity-20 ${
                      t.highlight ? "text-white" : "text-[#2563EB]"
                    }`}
                  />

                  {/* PROFILE */}
                  <div className="flex flex-col items-center text-center mb-6">

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
                      <Star
                        key={index}
                        size={18}
                        fill="currentColor"
                        className={`${t.highlight ? "text-yellow-300" : "text-yellow-400"}`}
                      />
                    ))}
                  </div>

                  {/* REVIEW */}
                  <p className={`text-sm text-center leading-relaxed ${t.highlight ? "text-white/95" : "text-gray-700"}`}>
                    &ldquo;{t.review}&rdquo;
                  </p>

                  {/* BADGE */}
                  {t.highlight && (
                    <div className="mt-6 text-center">
                      <span className="text-xs bg-white/20 px-4 py-1 rounded-full font-semibold">
                       Verified Client
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
              Need expert assistance with tax and compliance?
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
import { Star, Quote, ShieldCheck, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Testimonials() {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Retail Business Owner",
      review:
        "Excellent GST and tax compliance support. Filing process was smooth and timely. Highly recommended.",
      highlight: true
    },
    {
      name: "Priya Mehta",
      role: "Salaried Professional",
      review:
        "Income tax filing handled professionally. Maximum deductions claimed without hassle."
    },
    {
      name: "Amit Desai",
      role: "Startup Founder",
      review:
        "Company registration completed within a week. Transparent and supportive team."
    }
  ];

  const stats = [
    { icon: Users, value: "1200+", label: "Happy Clients" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
    { icon: ShieldCheck, value: "100%", label: "Secure Process" }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">

      {/* HEADER */}
      <section className="py-16 text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-black">
            Client Testimonials
          </h1>

          <div className="w-24 h-1 bg-blue-700 mx-auto mt-6 rounded-full" />

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            Trusted by clients for professional, reliable and transparent financial services.
          </p>
        </motion.div>
      </section>


      {/* STATS */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 text-center shadow hover:shadow-lg transition"
              >
                <Icon className="mx-auto text-blue-700 mb-3" size={30}/>
                <h3 className="text-3xl font-bold text-blue-900">{stat.value}</h3>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>


      {/* TESTIMONIALS */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className={`
                relative p-8 rounded-2xl transition
                ${t.highlight
                  ? "bg-gradient-to-br from-blue-700 to-indigo-700 text-white shadow-xl"
                  : "bg-white shadow-md hover:shadow-xl"}
              `}
            >

              <Quote
                size={40}
                className={`absolute top-6 right-6 ${
                  t.highlight ? "text-white/30" : "text-blue-100"
                }`}
              />

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={17}
                    fill="currentColor"
                    className="text-yellow-400"
                  />
                ))}
              </div>

              <p className={`mb-6 ${t.highlight ? "text-white" : "text-gray-600"}`}>
                "{t.review}"
              </p>

              <div className="border-t pt-4 border-white/20">
                <h4 className="font-semibold">{t.name}</h4>
                <p className={t.highlight ? "text-white/80 text-sm" : "text-gray-500 text-sm"}>
                  {t.role}
                </p>
              </div>

            </motion.div>
          ))}
        </div>


        {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Get Professional Financial Guidance
          </h2>

          <button
            onClick={() => navigate("/contact")}
            className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-xl font-semibold shadow-lg transition"
          >
            Book Consultation
          </button>
        </div>
      </section>
    </div>
  );
}

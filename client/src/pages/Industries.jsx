import { useNavigate } from "react-router-dom";
import {
  Building2,
  Factory,
  Laptop,
  HeartPulse,
  Home,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Industries() {
  const navigate = useNavigate();

  const industries = [
    {
      name: "Retail & Trading",
      icon: Building2,
      desc: "GST compliance, inventory accounting and structured tax planning solutions.",
    },
    {
      name: "Manufacturing",
      icon: Factory,
      desc: "Audit support, statutory compliance and financial restructuring services.",
    },
    {
      name: "IT & Software",
      icon: Laptop,
      desc: "Startup advisory, payroll structuring and optimized taxation strategies.",
    },
    {
      name: "Healthcare",
      icon: HeartPulse,
      desc: "Accounting, regulatory compliance and advisory for medical institutions.",
    },
    {
      name: "Real Estate",
      icon: Home,
      desc: "Capital gains advisory, project taxation and compliance management.",
    },
    {
      name: "Startups & MSMEs",
      icon: Rocket,
      desc: "Company incorporation, funding advisory and MSME registration support.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">

      {/* HERO */}
      <section className="py-16 text-center px-6">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-black">
            Industries We Serve
          </h1>

          <div className="w-24 h-1 bg-blue-700 mx-auto mt-6 rounded-full" />

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            Delivering reliable financial, compliance and advisory services
            across diverse industries with professionalism and accuracy.
          </p>
        </motion.div>
      </section>

      {/* GRID */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {industries.map((industry, i) => {
            const Icon = industry.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="
                group relative
                bg-white
                p-9
                rounded-2xl
                shadow-md
                hover:shadow-xl
                transition
                "
              >
                {/* hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-50 to-white"/>

                {/* ICON */}
                <div className="
                  relative z-10
                  w-14 h-14
                  flex items-center justify-center
                  rounded-xl
                  bg-blue-50
                  text-blue-700
                  mb-6
                  group-hover:bg-blue-700
                  group-hover:text-white
                  transition
                ">
                  <Icon size={26}/>
                </div>

                {/* TITLE */}
                <h3 className="relative z-10 text-lg font-semibold text-gray-900 mb-3">
                  {industry.name}
                </h3>

                {/* DESC */}
                <p className="relative z-10 text-sm text-gray-600 leading-relaxed">
                  {industry.desc}
                </p>

              </motion.div>
            );
          })}

        </div>
      </section>
    </div>
  );
}

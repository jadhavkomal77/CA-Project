
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

        <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Expert financial and compliance solutions tailored to your business needs.
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
                  <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* CTA */}
                  <span className="font-semibold text-blue-600 group-hover:text-blue-800 transition">
                    Read More →
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

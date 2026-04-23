import { useParams, useNavigate } from "react-router-dom";
import { useGetPublicServiceBySlugQuery } from "../redux/apis/serviceApi";
import { motion } from "framer-motion";

/* animation presets */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } }
};

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
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">

      {/* HERO */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="py-6 text-center px-6"
      >
        <div className="text-4xl md:text-5xl mb-3">
          {service.icon || "📊"}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-4 service-heading">
          {service.title}
        </h1>

        <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          {service.longDesc || service.shortDesc}
        </p>
      </motion.section>


      {/* WHY CHOOSE */}
      {service.whyChoose?.length > 0 && (
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="py-6 bg-white"
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-center mb-6"
          >
            Why Choose This Service
          </motion.h2>

          <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {service.whyChoose.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="bg-gray-50 rounded-3xl p-5 shadow hover:shadow-xl transition"
              >
                <div className="text-3xl mb-2">{item.icon || "✔"}</div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}


      {/* PROCESS */}
      {service.process?.length > 0 && (
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="py-6 bg-gray-50"
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-center mb-6"
          >
            Our Process
          </motion.h2>

          <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {service.process.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-3xl p-5 shadow hover:shadow-xl transition text-center"
              >
                <div className="w-11 h-11 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center mb-3 font-bold">
                  {step.step}
                </div>

                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}


      {/* APPLY CTA */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-6 text-center"
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Apply for this Service?
        </h3>

        <p className="text-gray-600 mb-6">
          Start your journey today and let our experts handle everything.
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/apply/${service.slug}`)}
          className="px-10 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow"
        >
         Book Advisory Session
        </motion.button>
      </motion.section>


      {/* TECHNOLOGIES */}
      {service.technologies?.length > 0 && (
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="py-6 bg-white text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Technologies
          </h2>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {service.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>
      )}


      {/* PROJECTS */}
      {service.projects?.length > 0 && (
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="py-6 bg-gray-50"
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl md:text-3xl font-bold text-center mb-6"
          >
            Related Projects
          </motion.h2>

          <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {service.projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl shadow hover:shadow-2xl transition overflow-hidden"
              >
                <img
                  src={
                    project.image ||
                    "https://dummyimage.com/600x400/e5e7eb/9ca3af&text=No+Image"
                  }
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3">
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
        </motion.section>
      )}


      {/* CONTACT CTA */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-6 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Interested in this service?
        </h2>

        <p className="text-gray-600 mb-6">
          Contact us today for expert assistance and consultation.
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/contact")}
          className="px-10 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl shadow"
        >
          Contact Us
        </motion.button>
      </motion.section>

    </div>
  );
}
import { motion } from "framer-motion";
import { services } from "../services";
import ServiceItem from "../components/ServiceItem";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Services() {
  return (
    <div className="bg-white">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-4 pb-10 pt-16 text-center sm:px-6"
      >
        <h1 className="mb-4 text-3xl font-bold uppercase tracking-wide text-blue-600 sm:text-4xl md:text-5xl">
          OUR SERVICES
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
          Expert financial and compliance solutions tailored to your business
          needs.
        </p>
      </motion.section>

      <section className="px-4 pb-24 sm:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={item}>
              <ServiceItem
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

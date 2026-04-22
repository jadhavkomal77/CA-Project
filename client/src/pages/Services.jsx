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
        className="px-4 pb-12 pt-16 text-center sm:px-6"
        aria-label="Our services introduction"
      >
        <h1
          id="our-services-heading"
          className="mb-4 text-3xl font-bold uppercase tracking-wide text-[#2563EB] sm:text-4xl md:text-5xl"
        >
          OUR SERVICES
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
          Expert financial and compliance solutions tailored to your business
          needs.
        </p>
      </motion.section>

      <section
        className="px-4 pb-24 sm:px-6"
        aria-labelledby="our-services-heading"
      >
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-x-10 gap-y-12 text-center md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={item} className="flex justify-center">
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

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetPublicProjectsQuery } from "../redux/apis/projectApi";
import { motion } from "framer-motion";

export default function CaseStudies() {
  const navigate = useNavigate();
  const { data: projects = [], isLoading } = useGetPublicProjectsQuery();

  if (isLoading) {
    return (
      <div className="py-24 text-center text-lg font-medium text-gray-600">
        Loading case studies...
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="py-24 text-center text-lg font-medium text-gray-600">
        No case studies found.
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Client Success
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our Case Studies
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Delivering measurable financial results through expert
            chartered accountant services.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {projects.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-gray-50 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >

              <img
                src={project.image}
                alt={project.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">

                <span className="text-blue-600 text-sm font-semibold">
                  {project.category}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                  {project.shortDesc}
                </p>

                <button
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  className="text-blue-600 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Read Case Study →
                </button>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

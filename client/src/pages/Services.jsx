import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetPublicServicesQuery } from "../redux/apis/serviceApi";

export default function Services() {
  const navigate = useNavigate();
  const { data: services, isLoading } = useGetPublicServicesQuery();

  if (isLoading) return null;

  return (
    <>
      {/* ================= HEADER ================= */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Our Services
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Professional Chartered Accountant Services
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We offer comprehensive financial, tax, and advisory services
            tailored to meet the needs of businesses and individuals.
          </p>

        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {services?.map((service) => (
            <div
              key={service._id}
              className="
                bg-gray-50
                rounded-3xl
                p-8
                border border-gray-100
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-2
                transition-all duration-300
              "
            >
              {/* ICON */}
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6">
                {service.icon || "📊"}
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>

              {/* DESC */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.shortDesc}
              </p>

              {/* CTA */}
              <button
                onClick={() => navigate(`/services/${service.slug}`)}
                className="text-blue-600 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
              >
                Learn More →
              </button>

            </div>
          ))}

        </div>
      </section>

     
    </>
  );
}

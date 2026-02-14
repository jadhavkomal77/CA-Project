import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetPublicHeroQuery } from "../redux/apis/heroApi";

export default function Hero() {
  const { data: hero, isLoading } = useGetPublicHeroQuery();
  const navigate = useNavigate();

  if (isLoading || !hero) return null;

  return (
    <section className="bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-16">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-6 text-center lg:text-left">

            {/* TITLE */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {hero.title}
            </h1>

            {/* SUBTITLE */}
            {hero.subtitle && (
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                {hero.subtitle}
              </p>
            )}

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

              <button
                onClick={() => navigate("/contact")}
                className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-lg text-white font-semibold shadow-md transition"
              >
                {hero.buttonText || "Get a Free Quote"}
              </button>

              <button
                onClick={() => navigate("/services")}
                className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 px-7 py-3 rounded-lg text-gray-800 font-semibold transition"
              >
                View Services
              </button>

            </div>

            {/* STATS */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-2 text-gray-600 text-sm sm:text-base">
              <span>✔ 30+ Experience</span>
              <span>✔ 5000+ Clients</span>
              <span>✔ Expert Advisory</span>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full">
            <img
              src={hero.backgroundImage}
              alt="CA Professional"
              className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] object-cover rounded-2xl shadow-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

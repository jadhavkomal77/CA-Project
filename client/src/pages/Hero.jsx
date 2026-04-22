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
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase text-blue-600 tracking-wide leading-tight">
              DRIVING FINANCIAL GROWTH WITH TRUSTED CHARTERED ACCOUNTANTS
            </h1>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Services
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
              >
                Contact Us
              </a>
            </div>

            {/* SUBTITLE */}
            {hero.subtitle && (
              <p className="text-gray-800 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                {hero.subtitle}
              </p>
            )}

            {/* STATS */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-2 text-gray-800 text-sm sm:text-base">
              <span>✔ 30+ Years of Experience</span>
              <span>✔ 5,000+ Clients Served</span>
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
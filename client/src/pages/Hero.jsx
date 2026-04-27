import { useGetPublicHeroQuery } from "../redux/apis/heroApi";
import { CircleCheckBig } from "lucide-react";

export default function Hero() {
  const { data: hero, isLoading } = useGetPublicHeroQuery();

  if (isLoading || !hero) return null;

  return (
    <section className="bg-blue-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-16">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-6 text-center lg:text-left">

            {/* TITLE */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase text-white tracking-wide leading-tight">
              DRIVING FINANCIAL GROWTH WITH TRUSTED CHARTERED ACCOUNTANTS
            </h1>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("services");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-colors"
              >
                View Services
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Us
              </a>
            </div>

            {/* SUBTITLE */}
            {/* {hero.subtitle ? (
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                {hero.subtitle}
              </p>
            ) : null} */}

            {/* STATS */}
            {/* <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-2 text-blue-100 text-sm sm:text-base">
              <span><span className="text-green-500">✔</span> 30+ Years of Experience</span>
              <span><span className="text-green-500">✔</span> 5,000+ Clients Served</span>
              <span><span className="text-green-500">✔</span> Expert Advisory</span>
            </div> */}

<div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-start gap-x-6 gap-y-3 pt-2 text-sm sm:text-base text-blue-100">
  
  <span className="flex items-center gap-2 whitespace-nowrap">
    <CircleCheckBig className="w-5 sm:w-6 h-5 sm:h-6 text-green-400 shrink-0" />
    30+ Years of Experience
  </span>

  <span className="flex items-center gap-2 whitespace-nowrap">
    <CircleCheckBig className="w-5 sm:w-6 h-5 sm:h-6 text-green-400 shrink-0" />
    5,000+ Clients Served
  </span>

  <span className="flex items-center gap-2 whitespace-nowrap">
    <CircleCheckBig className="w-5 sm:w-6 h-5 sm:h-6 text-green-400 shrink-0" />
    Expert Advisory
  </span>

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
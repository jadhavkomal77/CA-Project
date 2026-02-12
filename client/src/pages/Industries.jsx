import { useNavigate } from "react-router-dom";
import {
  Building2,
  Factory,
  Laptop,
  HeartPulse,
  Home,
  Rocket,
} from "lucide-react";

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
    <div className="bg-white">

      {/* PREMIUM HERO */}
      <section className="py-10 text-center border-b bg-gray-50">
        <h1 className="text-4xl font-bold text-gray-900">
          Industries We Serve
        </h1>
        <div className="h-1 w-20 bg-yellow-600 mx-auto mt-4 rounded-full"></div>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
          Delivering precise and reliable Chartered Accountant services across
          diverse industry sectors with professionalism and integrity.
        </p>
      </section>

      {/* INDUSTRY GRID */}
      <section className="py-18">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          {industries.map((industry, i) => {
            const Icon = industry.icon;

            return (
              <div
                key={i}
                className="group relative bg-white p-10 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Subtle Top Accent */}
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-t-xl opacity-0 group-hover:opacity-100 transition"></div>

                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 mb-6 group-hover:bg-yellow-600 group-hover:text-white transition">
                  <Icon size={26} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {industry.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {industry.desc}
                </p>
              </div>
            );
          })}

        </div>

      </section>
    </div>
  );
}

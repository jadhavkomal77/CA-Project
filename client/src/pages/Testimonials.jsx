import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Testimonials() {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Retail Business Owner",
      review:
        "Excellent GST and tax compliance support. Filing process was smooth and timely. Highly recommended.",
    },
    {
      name: "Priya Mehta",
      role: "Salaried Professional",
      review:
        "Income tax filing handled professionally. Maximum deductions claimed without hassle.",
    },
    {
      name: "Amit Desai",
      role: "Startup Founder",
      review:
        "Company registration completed within a week. Transparent and supportive team.",
    },
  ];

  return (
    <div className="bg-gray-50">

      {/* HEADER */}
      <section className="py-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Client Testimonials
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Trusted by businesses and individuals for reliable and professional Chartered Accountant services.
        </p>
      </section>

      {/* TESTIMONIAL GRID */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                "{t.review}"
              </p>

              {/* Client Info */}
              <div>
                <h4 className="font-semibold text-gray-900">
                  {t.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {t.role}
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate("/contact")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition"
          >
            Book Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}

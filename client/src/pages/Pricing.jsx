import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPublicPricingQuery } from "../redux/apis/pricingApi";

export default function Pricing() {
  const { data: plans = [], isLoading } = useGetPublicPricingQuery();
  const [currency, setCurrency] = useState("₹");
  const navigate = useNavigate();

 
  if (isLoading) {
    return <div className="py-32 text-center">Loading pricing...</div>;
  }

  return (
    <>
      {/* HEADER */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-red-500 font-semibold tracking-widest mb-3">
            PRICING PLAN
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple & Transparent Pricing
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Clear pricing with no hidden costs. Choose the plan that fits your needs.
          </p>

          {/* CURRENCY SWITCH */}
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => setCurrency("₹")}
              className={`px-4 py-2 rounded ${
                currency === "₹" ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency("$")}
              className={`px-4 py-2 rounded ${
                currency === "$" ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              $ USD
            </button>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

          {plans
            .filter((p) => p.currency === currency)
            .map((p) => (
              <div
                key={p._id}
                className={`rounded-3xl p-10 shadow transition hover:scale-105
                  ${p.isPopular ? "bg-red-100 border-2 border-red-500" : "bg-white"}
                `}
              >
                {p.isPopular && (
                  <p className="inline-block text-red-500 text-sm font-semibold mb-4">
                    MOST POPULAR
                  </p>
                )}

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {p.title}
                </h3>

                <p className="text-gray-600 mb-6">{p.subtitle}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {p.currency}{p.price}
                  </span>
                  <span className="text-gray-500 text-sm"> {p.unit}</span>
                </div>

                <ul className="space-y-3 text-gray-700 mb-8">
                  {p.features.map((f, i) => (
                    <li key={i}>✔ {f}</li>
                  ))}
                </ul>

               <button
  onClick={() => navigate(`/booking/${p._id}`)}
  className="w-full py-3 rounded-md font-semibold"
>
  Choose Plan
</button>

              </div>
            ))}

        </div>
      </section>
    </>
  );
}



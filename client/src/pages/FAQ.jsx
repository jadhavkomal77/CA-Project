import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      question: "How long does company registration take?",
      answer:
        "Company registration usually takes 5–7 working days depending on documentation and approval process."
    },
    {
      question: "What documents are required for Income Tax Filing?",
      answer:
        "PAN card, Aadhaar card, Form 16, bank statements and investment proofs are generally required."
    },
    {
      question: "Do you provide GST return filing monthly?",
      answer:
        "Yes, we provide monthly and quarterly GST compliance services."
    },
    {
      question: "Is consultation free?",
      answer:
        "Yes, we provide an initial free consultation to understand your financial requirements."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white">

      {/* HERO */}
      <section className="py-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Frequently Asked Questions
        </h1>
        <div className="w-20 h-1 bg-yellow-600 mx-auto mt-5 rounded-full"></div>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
          Clear answers to common questions about our Chartered Accountant services.
        </p>
      </section>

      {/* FAQ */}
      <section className="pb-18">
        <div className="max-w-4xl mx-auto px-6 space-y-6">

          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-[1px] transition-all duration-300 ${
                open === i
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-xl"
                  : "bg-gray-200"
              }`}
            >
              <div className="bg-white rounded-2xl">

                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex justify-between items-center px-8 py-6 text-left"
                >
                  <span className="font-semibold text-lg text-gray-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={22}
                    className={`transition-transform duration-300 ${
                      open === i ? "rotate-180 text-yellow-600" : "text-gray-400"
                    }`}
                  />
                </button>

                <div
                  className={`px-8 text-gray-600 leading-relaxed transition-all duration-300 ${
                    open === i ? "max-h-40 pb-6" : "max-h-0 overflow-hidden"
                  }`}
                >
                  {faq.answer}
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      question: "What is e-Filing of Income Tax Return?",
      answer:
        "E-filing is the process of submitting your Income Tax Return online. It allows taxpayers to file returns electronically in a fast, secure, and convenient manner."
    },
    {
      question: "Who is required to file Income Tax Return?",
      answer:
        "Individuals whose income exceeds the exemption limit must file ITR. Filing is also mandatory if you hold foreign assets, claim refund, deposit over ₹1 crore in bank, or pay electricity bills above ₹1 lakh."
    },
    {
      question: "What documents are required for ITR filing?",
      answer:
        "Documents include PAN, Aadhaar, Form 16, salary slips, bank statements, AIS statement, tax investment proofs, capital gains statement, and Form 26AS."
    },
    {
      question: "Benefits of filing ITR on time?",
      answer:
        "Timely filing helps avoid penalties, speeds up refunds, acts as income proof, helps in loan approvals, visa processing, and allows carry-forward of losses."
    },
    {
      question: "Which ITR form should I select?",
      answer:
        "ITR-1 for salaried income up to ₹50L, ITR-2 for capital gains or foreign income, ITR-3 for business income, ITR-4 for presumptive taxation, ITR-5/6/7 for firms, companies and trusts."
    },
    {
      question: "Can I file ITR myself?",
      answer:
        "Yes. Taxpayers can file their own return using online portals. Systems automatically compute tax and select applicable forms."
    },
    {
      question: "What if I miss filing deadline?",
      answer:
        "You can still file a belated return before 31 December of the assessment year with applicable late fee penalty."
    },
    {
      question: "Late fee for delayed filing?",
      answer:
        "As per Section 234F, penalty can be up to ₹5000 depending on delay duration."
    },
    {
      question: "Can I file ITR without Form 16?",
      answer:
        "Yes. You can use Form 26AS and AIS statements to obtain income and TDS details if Form 16 is unavailable."
    },
    {
      question: "Basic exemption limit for filing ITR?",
      answer:
        "Exemption limit depends on tax regime and age. Under new regime income up to ₹3L is exempt; under old regime ₹2.5L is exempt."
    },
    {
      question: "What is Section 87A rebate?",
      answer:
        "Resident individuals with income up to ₹5L (old regime) or ₹7L (new regime) can claim rebate. Budget 2025 increased rebate up to ₹60,000 for eligible taxpayers."
    },
    {
      question: "Last date for e-verification?",
      answer:
        "ITR must be e-verified within 30 days of filing."
    },
    {
      question: "Can I upload multiple Form 16?",
      answer:
        "Yes. Multiple Form 16s from different employers can be uploaded during filing."
    },
    {
      question: "Do you provide CA assistance?",
      answer:
        "Yes. Expert Chartered Accountants can assist you with accurate filing and compliance support."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">

      {/* HEADER */}
      <section className="py-14 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Income Tax Filing FAQs
        </h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
          Everything you need to know about Income Tax Returns, filing process, eligibility, documents and rules.
        </p>
      </section>

      {/* FAQ LIST */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6 space-y-5">

          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl transition-all duration-300 border ${
                open === i
                  ? "border-blue-500 shadow-xl bg-white"
                  : "border-gray-200 bg-white hover:shadow-md"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-7 py-6 text-left"
              >
                <span className="font-semibold text-lg text-gray-900">
                  {faq.question}
                </span>

                <ChevronDown
                  size={22}
                  className={`transition-transform duration-300 ${
                    open === i
                      ? "rotate-180 text-blue-600"
                      : "text-gray-400"
                  }`}
                />
              </button>

              <div
                className={`px-7 text-gray-600 leading-relaxed transition-all duration-300 ${
                  open === i ? "max-h-[500px] pb-6" : "max-h-0 overflow-hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}

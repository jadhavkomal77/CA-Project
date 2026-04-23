

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
      answer: (
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <b>ITR-1 (Sahaj):</b> For resident individuals with income up to ₹50 lakh
            from salary, one house property and other sources (excluding capital gains and foreign assets).
          </li>
          <li>
            <b>ITR-2:</b> For individuals and HUFs not having business income but
            having capital gains, multiple house properties or foreign income/assets.
          </li>
          <li>
            <b>ITR-3:</b> For individuals and HUFs having income from business or profession.
          </li>
          <li>
            <b>ITR-4 (Sugam):</b> For presumptive business or professional income
            under Sections 44AD, 44ADA or 44AE (subject to eligibility).
          </li>
          <li>
            <b>ITR-5 / ITR-6 / ITR-7:</b> For firms, LLPs, companies, trusts and other entities.
          </li>
        </ul>
      )
    },
    {
      question: "Can I file ITR myself?",
      answer:
        "Yes. Taxpayers can file their own return using the Income Tax e-filing portal. Systems automatically compute tax and select applicable forms."
    },
    {
      question: "What if I miss filing deadline?",
      answer:
        "You can file a belated return under Section 139(4) before 31 December of the relevant assessment year, subject to applicable late fees and interest. Revised returns can also be filed within this timeline."
    },
    {
      question: "Late fee for delayed filing?",
      answer:
        "Under Section 234F, late filing fee can be up to ₹5,000. However, if total income does not exceed ₹5 lakh, the fee is restricted to ₹1,000."
    },
    {
      question: "Can I file ITR without Form 16?",
      answer:
        "Yes. Even if Form 16 is not available, you can file your return using Form 26AS, AIS statement, salary slips and bank statements to obtain income and TDS details."
    },
    {
      question: "Basic exemption limit for filing ITR?",
      answer:
        "Exemption limit depends on tax regime and age. Under the new regime income up to ₹3 lakh is exempt, while under the old regime the basic exemption limit is ₹2.5 lakh."
    },
    {
      question: "What is Section 87A rebate?",
      answer:
        "Resident individuals with income up to ₹5 lakh (old regime) or ₹7 lakh (new regime) can claim rebate under Section 87A."
    },
    {
      question: "Last date for e-verification?",
      answer:
        "ITR must be e-verified within 30 days of filing. If not verified, the return is treated as invalid."
    },
    {
      question: "Can I upload multiple Form 16?",
      answer:
        "Yes. If you worked with multiple employers during the financial year, you can upload multiple Form 16 documents while filing the return."
    },
    {
      question: "Do you provide CA assistance?",
      answer:
        "Yes. Our experienced Chartered Accountants provide end-to-end assistance including tax planning, accurate filing, compliance review, and handling notices (if any). You can book a consultation for personalized support."
    },
    {
      question: "Who is required to file?",
      answer: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Income exceeding the basic exemption limit</li>
          <li>TDS or TCS deducted during the year</li>
          <li>Foreign travel expenses above ₹2 lakh</li>
          <li>Deposit above ₹1 crore in current account</li>
          <li>Electricity consumption above ₹1 lakh</li>
        </ul>
      )
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">

      <section className="py-14 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
          Income Tax Filing FAQs
        </h1>

        <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>

        <p className="mt-6 text-gray-800 max-w-2xl mx-auto text-lg">
          Everything you need to know about Income Tax Returns, filing process,
          eligibility, documents and rules.
        </p>
      </section>

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
                className={`px-7 text-gray-800 leading-relaxed transition-all duration-300 ${
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
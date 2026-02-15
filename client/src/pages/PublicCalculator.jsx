import { useState } from "react";
import IncomeTaxCalculator from "../components/calculators/IncomeTaxCalculator";
import GstCalculator from "../components/calculators/GstCalculator";
import EmiCalculator from "../components/calculators/EmiCalculator";
import SipCalculator from "../components/calculators/SipCalculator";
import { Calculator, DollarSign, Home, TrendingUp } from "lucide-react";

export default function PublicCalculator() {
  const [activeCalculator, setActiveCalculator] = useState("income-tax");

  const calculators = [
    {
      id: "income-tax",
      name: "Income Tax Calculator",
      icon: Calculator,
      component: IncomeTaxCalculator,
      description: "Calculate your income tax for Old & New regime",
    },
    {
      id: "gst",
      name: "GST Calculator",
      icon: DollarSign,
      component: GstCalculator,
      description: "Calculate GST amount and breakdown",
    },
    {
      id: "emi",
      name: "Home Loan EMI Calculator",
      icon: Home,
      component: EmiCalculator,
      description: "Calculate your home loan EMI",
    },
    {
      id: "sip",
      name: "SIP Calculator",
      icon: TrendingUp,
      component: SipCalculator,
      description: "Calculate SIP returns and maturity value",
    },
  ];

  const ActiveComponent = calculators.find(
    (calc) => calc.id === activeCalculator
  )?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Financial Calculators
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional financial calculators to help you plan your finances
            better
          </p>
        </div>

        {/* Calculator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  activeCalculator === calc.id
                    ? "border-blue-700 bg-blue-50 shadow-lg transform scale-105"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className={`p-3 rounded-xl ${
                      activeCalculator === calc.id
                        ? "bg-blue-700 text-white"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3
                    className={`text-lg font-bold ${
                      activeCalculator === calc.id
                        ? "text-blue-700"
                        : "text-gray-900"
                    }`}
                  >
                    {calc.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">{calc.description}</p>
              </button>
            );
          })}
        </div>

        {/* Active Calculator Component */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useCreateContactMutation } from "../redux/apis/contactApi";

export default function Contact() {
  const [createContact, { isLoading }] = useCreateContactMutation();

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [agree, setAgree] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      alert("Please agree to the Privacy Policy.");
      return;
    }

    try {
      await createContact(form).unwrap();
      alert("Thank you! We will contact you shortly.✨");

      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });

      setAgree(false);
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">

        {/* LEFT CONTENT */}
        <div>
          <p className="text-blue-600 font-semibold tracking-widest mb-4">
            CONTACT OUR CA TEAM
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-6">
            Speak With a Chartered <br /> Accountant Today
          </h2>

          <p className="text-gray-700 max-w-xl mb-10 leading-relaxed">
            Get expert assistance for Income Tax Filing, GST, Company Registration,
            Audit, and Financial Advisory. Transparent fees. Accurate filing.
            100% Confidential.
          </p>

          <div className="space-y-6">

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                📑
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Income Tax & GST Specialists
                </h4>
                <p className="text-gray-700 text-sm">
                  Accurate filing, compliance review, and notice handling support.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                🏢
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Business & Startup Registration
                </h4>
                <p className="text-gray-700 text-sm">
                  Company, LLP, GST, MSME & other statutory registrations.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                🔒
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Secure & Confidential Process
                </h4>
                <p className="text-gray-700 text-sm">
                  Professional handling of your financial data with strict privacy standards.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* FORM */}
        <div className="bg-white shadow-xl rounded-2xl p-10">
          <h3 className="text-2xl font-bold text-black mb-8">
            Book Free Consultation
          </h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="border border-gray-300 px-5 py-4 rounded-lg focus:outline-none focus:border-blue-600"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="border border-gray-300 px-5 py-4 rounded-lg focus:outline-none focus:border-blue-600"
            />

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="border border-gray-300 px-5 py-4 rounded-lg focus:outline-none focus:border-blue-600"
            />

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="border border-gray-300 px-5 py-4 rounded-lg focus:outline-none focus:border-blue-600"
            >
              <option value="">Select Service</option>
              <option>Income Tax Filing</option>
              <option>GST Registration</option>
              <option>Company Registration</option>
              <option>Audit Services</option>
              <option>Accounting & Bookkeeping</option>
              <option>Wealth Management</option>
              <option>Project Financing & Government Subsidies</option>
              <option>Tax Planning</option>
            </select>

            <textarea
              rows="4"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Describe your requirement"
              required
              className="md:col-span-2 border border-gray-300 px-5 py-4 rounded-lg focus:outline-none focus:border-blue-600"
            ></textarea>

            {/* PRIVACY POLICY CHECKBOX */}
            <label className="md:col-span-2 flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="accent-blue-600"
              />
              I agree to the <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>
            </label>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="md:col-span-2 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? "Submitting..." : "Get CA Call Back"}
            </button>

            {/* TRUST TEXT */}
            <p className="md:col-span-2 text-sm text-gray-500 text-center">
              We respond within <span className="font-semibold">24 working hours.</span>
            </p>

          </form>
        </div>

      </div>
    </section>
  );
}




import React, { useState } from "react";
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createContact(form).unwrap();
      alert("Thank you! We will contact you shortly.");

      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">

        {/* ================= LEFT CONTENT ================= */}
        <div>
          <p className="text-blue-600 font-semibold tracking-widest mb-4">
            CONTACT OUR CA TEAM
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            Get Expert Financial <br /> Consultation Today
          </h2>

          <p className="text-gray-600 max-w-xl mb-10 leading-relaxed">
            We provide professional Chartered Accountant services including
            Income Tax Filing, GST Registration, Company Incorporation,
            Audit, Accounting, and Financial Advisory.
            Contact us for trusted and transparent financial solutions.
          </p>

          {/* FEATURES */}
          <div className="space-y-6">

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl">
                📑
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Income Tax & GST Experts
                </h4>
                <p className="text-gray-600 text-sm">
                  Accurate tax filing and GST compliance support.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl">
                🏢
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Business Registration
                </h4>
                <p className="text-gray-600 text-sm">
                  Company, LLP & Startup registration assistance.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl">
                🔒
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  100% Confidential & Secure
                </h4>
                <p className="text-gray-600 text-sm">
                  Complete privacy and professional handling of data.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= RIGHT FORM ================= */}
        <div className="bg-white shadow-xl rounded-2xl p-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Book Free Consultation
          </h3>

       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

  {/* NAME */}
  <input
    type="text"
    name="name"
    value={form.name}
    onChange={handleChange}
    placeholder="Your Name"
    required
    className="border border-gray-200 px-5 py-4 rounded-lg focus:outline-none focus:border-blue-600"
  />

  {/* EMAIL */}
  <input
    type="email"
    name="email"
    value={form.email}
    onChange={handleChange}
    placeholder="Email Address"
    required
    className="border border-gray-200 px-5 py-4 rounded-lg focus:outline-none focus:border-blue-600"
  />

  {/* PHONE */}
  <input
    type="text"
    name="phone"
    value={form.phone}
    onChange={handleChange}
    placeholder="Phone Number"
    required
    className="border border-gray-200 px-5 py-4 rounded-lg focus:outline-none focus:border-blue-600"
  />

  {/* SERVICE */}
  <select
    name="service"
    value={form.service}
    onChange={handleChange}
    className="border border-gray-200 px-5 py-4 rounded-lg focus:outline-none focus:border-blue-600"
  >
    <option value="">Select Service</option>
    <option>Income Tax Filing</option>
    <option>GST Registration</option>
    <option>Company Registration</option>
    <option>Audit Services</option>
    <option>Accounting & Bookkeeping</option>
    <option>Tax Planning</option>
  </select>

  {/* MESSAGE (FULL WIDTH) */}
  <textarea
    rows="4"
    name="message"
    value={form.message}
    onChange={handleChange}
    placeholder="Describe your requirement"
    required
    className="md:col-span-2 border border-gray-200 px-5 py-4 rounded-lg focus:outline-none focus:border-blue-600"
  ></textarea>

  {/* BUTTON (FULL WIDTH) */}
  <button
    type="submit"
    disabled={isLoading}
    className="md:col-span-2 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
  >
    {isLoading ? "Submitting..." : "Submit Now"}
  </button>

</form>

        </div>

      </div>
    </section>
  );
}

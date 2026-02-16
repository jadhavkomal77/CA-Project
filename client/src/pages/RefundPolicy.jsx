import React from "react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-16 px-4">
      
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-6">
          Refund Policy
        </h1>


        <Section
          title="1. Overview"
          content={`We strive to ensure customer satisfaction with our services. This Refund Policy outlines the conditions under which refunds may be granted.`}
        />

        <Section
          title="2. Eligibility for Refund"
          content={`Refunds may be considered if a service has not been delivered as promised, or if there is a technical issue from our side that prevents proper usage. Requests must be made within a reasonable time after purchase.`}
        />

        <Section
          title="3. Non-Refundable Cases"
          content={`Refunds will not be issued in cases where services have already been delivered, partially completed, or if delays are caused due to lack of required information from the client.`}
        />

        <Section
          title="4. Cancellation Policy"
          content={`Clients may request cancellation before the service process has started. Once the service work has begun, cancellation may not be possible or may be subject to partial charges.`}
        />

        <Section
          title="5. Processing Time"
          content={`Approved refunds will be processed within a reasonable number of business days through the original payment method.`}
        />

        <Section
          title="6. Changes to Policy"
          content={`We reserve the right to modify this Refund Policy at any time. Any updates will be posted on this page.`}
        />

        <Section
          title="7. Contact Us"
          content={`For refund requests or questions, contact us:
Email: support@yourdomain.com`}
        />

      </div>
    </div>
  );
}


/* SECTION COMPONENT */
function Section({ title, content }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-2">{title}</h2>
      <p className="text-gray-600 leading-relaxed">{content}</p>
    </div>
  );
}

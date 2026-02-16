import React from "react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-16 px-4">
      
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-6">
          Terms & Conditions
        </h1>


        <Section
          title="1. Acceptance of Terms"
          content={`By accessing and using this website, you accept and agree to be bound by these Terms and Conditions. If you do not agree with any part, please do not use our website.`}
        />

        <Section
          title="2. Use of Website"
          content={`You agree to use this website only for lawful purposes. You must not use it in any way that may damage the site or affect other users' experience.`}
        />

        <Section
          title="3. Intellectual Property"
          content={`All content on this website including text, graphics, logos, and design is the property of our company and protected by copyright laws. Unauthorized use is prohibited.`}
        />

        <Section
          title="4. User Responsibilities"
          content={`Users are responsible for providing accurate information and maintaining confidentiality of their login credentials if applicable.`}
        />

        <Section
          title="5. Limitation of Liability"
          content={`We shall not be held liable for any direct, indirect, or consequential damages arising from the use or inability to use our website or services.`}
        />

        <Section
          title="6. Third-Party Links"
          content={`Our website may contain links to third-party websites. We are not responsible for their content, policies, or practices.`}
        />

        <Section
          title="7. Termination"
          content={`We reserve the right to terminate or suspend access to our website without prior notice for violations of these terms.`}
        />

        <Section
          title="8. Changes to Terms"
          content={`We may update these Terms & Conditions from time to time. Continued use of the website after changes means you accept the revised terms.`}
        />

        <Section
          title="9. Governing Law"
          content={`These terms shall be governed by and interpreted in accordance with applicable laws, and any disputes will be subject to the jurisdiction of the appropriate courts.`}
        />

        <Section
          title="10. Contact Information"
          content={`If you have any questions about these Terms, please contact us at:
Email: support@yourdomain.com`}
        />

      </div>
    </div>
  );
}


/* REUSABLE SECTION COMPONENT */
function Section({ title, content }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-2">{title}</h2>
      <p className="text-gray-600 leading-relaxed">{content}</p>
    </div>
  );
}

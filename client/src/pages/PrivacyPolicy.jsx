import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-16 px-4">
      
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-6">
          Privacy Policy
        </h1>

        {/* Section */}
        <Section
          title="1. Introduction"
          content={`We value your privacy and are committed to protecting your personal information. 
          This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.`}
        />

        <Section
          title="2. Information We Collect"
          content={`We may collect personal information such as your name, email address, phone number, 
          and other details when you fill out forms, register, or interact with our services.`}
        />

        <Section
          title="3. How We Use Your Information"
          content={`We use the collected information to provide and improve our services, respond to inquiries, 
          send updates, and ensure website security and functionality.`}
        />

        <Section
          title="4. Cookies Policy"
          content={`Our website may use cookies to enhance user experience, analyze traffic, 
          and personalize content. You can disable cookies through your browser settings.`}
        />

        <Section
          title="5. Data Protection"
          content={`We implement appropriate security measures to protect your personal data 
          against unauthorized access, alteration, disclosure, or destruction.`}
        />

        <Section
          title="6. Third-Party Services"
          content={`We may use trusted third-party services for analytics, hosting, or payment processing. 
          These providers have their own privacy policies governing data usage.`}
        />

        <Section
          title="7. Your Rights"
          content={`You have the right to access, update, or delete your personal information. 
          To request changes, please contact us using the details below.`}
        />

        <Section
          title="8. Changes to This Policy"
          content={`We may update this Privacy Policy from time to time. Any changes will be posted on this page 
          with an updated revision date.`}
        />

        <Section
          title="9. Contact Us"
          content={`If you have any questions regarding this Privacy Policy, please contact us at:
          Email: support@yourdomain.com`}
        />

      </div>
    </div>
  );
}


/* Reusable Section Component */
function Section({ title, content }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-2">{title}</h2>
      <p className="text-gray-600 leading-relaxed">{content}</p>
    </div>
  );
}

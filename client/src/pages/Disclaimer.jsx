import React from "react";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-16 px-4">
      
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-6">
          Disclaimer
        </h1>


        <Section
          title="1. General Information"
          content={`The information provided on this website is for general informational purposes only. 
          All information is provided in good faith; however, we make no representation or warranty of any kind regarding accuracy, adequacy, validity, reliability, or completeness.`}
        />

        <Section
          title="2. Professional Disclaimer"
          content={`This website may contain professional, financial, or technical information. Such information is provided for general guidance only and should not be considered professional advice. You should consult a qualified professional before making any decisions.`}
        />

        <Section
          title="3. External Links Disclaimer"
          content={`Our website may contain links to external websites. We do not guarantee the accuracy or reliability of any information offered by third-party sites.`}
        />

        <Section
          title="4. Errors and Omissions"
          content={`While we strive to ensure all information is correct, we are not responsible for any errors or omissions, or for results obtained from the use of this information.`}
        />

        <Section
          title="5. Fair Use Notice"
          content={`This website may contain copyrighted material used for educational or informational purposes. Such use is believed to fall under fair use principles.`}
        />

        <Section
          title="6. Views Expressed"
          content={`Any views or opinions represented on this website are personal and belong solely to the content creators and do not represent those of organizations or institutions.`}
        />

        <Section
          title="7. Limitation of Liability"
          content={`Under no circumstance shall we be liable for any loss or damage incurred as a result of the use of this website or reliance on any information provided.`}
        />

        <Section
          title="8. Consent"
          content={`By using our website, you hereby consent to this Disclaimer and agree to its terms.`}
        />

        <Section
          title="9. Updates"
          content={`We reserve the right to update or change this Disclaimer at any time without prior notice. Any changes will be prominently posted here.`}
        />

        <Section
          title="10. Contact Us"
          content={`If you have any questions regarding this Disclaimer, please contact us:
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

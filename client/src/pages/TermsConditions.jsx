import { motion } from "framer-motion";
import { FileText, ShieldCheck, Gavel } from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg mb-6">
            <FileText size={40}/>
          </div>

          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Terms & Conditions
          </h1>

          <p className="text-slate-600 text-lg">
            Please read these terms carefully before using our website
          </p>
        </motion.div>


        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .4 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-14 space-y-10"
        >

          <Block title="Acceptance of Terms" icon={ShieldCheck}>
            By accessing and using the website of CADMA Associates Pvt. Ltd., you agree to comply with and be bound by these Terms and Conditions. The content provided on this website is for general information purposes only and may be updated or changed without prior notice.
          </Block>

          <Block title="Intellectual Property Rights" icon={FileText}>
            All information, logos, text, and materials on this website are the property of CADMA Associates Pvt. Ltd. and may not be copied, reproduced, or used without permission. Users agree to provide accurate information when submitting enquiries or forms through the website.
          </Block>

          <Block title="Limitation of Liability" icon={Gavel}>
            CADMA Associates Pvt. Ltd. is not responsible for any loss or damages arising from the use of this website or reliance on its content. Use of this website and any dispute arising from it shall be subject to the laws of India.
          </Block>

          {/* FOOT NOTE */}
          <div className="border-t pt-8 text-slate-700 leading-relaxed">
            By using this website, you acknowledge and accept these Terms and Conditions. For any queries, please contact CADMA Associates Pvt. Ltd., Chhatrapati Sambhajinagar & Pune, Maharashtra.
          </div>

        </motion.div>
      </div>
    </div>
  );
}



/* BLOCK COMPONENT */
function Block({ title, children, icon: Icon }) {
  return (
    <div className="group">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-100 text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition">
          <Icon size={18}/>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition">
          {title}
        </h2>
      </div>

      <p className="text-slate-700 leading-relaxed text-[16px]">
        {children}
      </p>
    </div>
  );
}
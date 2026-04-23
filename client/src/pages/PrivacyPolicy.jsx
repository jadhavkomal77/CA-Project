import { motion } from "framer-motion";
import { ShieldCheck, Phone, MapPin } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg mb-6">
            <ShieldCheck size={40}/>
          </div>

          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Privacy Policy
          </h1>

          <p className="text-slate-600 text-lg">
            Transparency • Security • Trust
          </p>
        </motion.div>


        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .4 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-14 space-y-10"
        >

          <PolicyBlock title="Information We Collect">
            CADMA Associates Pvt. Ltd. respects your privacy and is committed to protecting your personal information. When you visit our website or submit any enquiry, we may collect basic details such as your name, phone number, email address, and other information provided voluntarily. We may also collect limited technical data such as IP address and browser type to improve website performance.
          </PolicyBlock>

          <PolicyBlock title="How We Use Your Information">
            The information collected is used only for responding to enquiries, providing our professional services, improving user experience, and complying with legal requirements. We do not sell, rent, or share your personal information with third parties, except where required by law or for service-related compliance purposes.
          </PolicyBlock>

          <PolicyBlock title="Data Security & Policy Updates">
            We implement reasonable security measures to protect your information. By using our website, you consent to the terms of this Privacy Policy. CADMA Associates Pvt. Ltd. reserves the right to update this policy at any time.
          </PolicyBlock>


          {/* CONTACT SECTION */}
          <div className="border-t pt-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Contact Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              <ContactCard icon={MapPin} text="Chhatrapati Sambhajinagar & Pune, Maharashtra" />
              <ContactCard icon={Phone} text="+91 9921055588" />

            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}



/* POLICY BLOCK */
function PolicyBlock({ title, children }) {
  return (
    <div className="group">
      <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition">
        {title}
      </h2>

      <p className="text-slate-700 leading-relaxed text-[16px]">
        {children}
      </p>
    </div>
  );
}


/* CONTACT CARD */
function ContactCard({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
      <div className="p-3 rounded-xl bg-blue-100 text-blue-700">
        <Icon size={20}/>
      </div>

      <span className="font-medium text-slate-800">{text}</span>
    </div>
  );
}
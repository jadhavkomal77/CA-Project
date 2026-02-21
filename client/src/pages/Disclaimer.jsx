import { motion } from "framer-motion";
import { ShieldAlert, Info } from "lucide-react";

export default function Disclaimer() {
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
            <ShieldAlert size={40}/>
          </div>

          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Disclaimer
          </h1>

          <p className="text-slate-600 text-lg">
            Please read this disclaimer carefully before using our website
          </p>
        </motion.div>


        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .4 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-14 space-y-10"
        >

          <Block title="General Information" icon={Info}>
            The information provided on this website is for general informational purposes only and should not be considered as legal, financial, or professional advice. While CADMA Associates Pvt. Ltd. makes every effort to ensure accuracy and reliability, we make no warranties or guarantees regarding the completeness, accuracy, or suitability of the information.
          </Block>

          <Block title="Limitation of Liability" icon={ShieldAlert}>
            CADMA Associates Pvt. Ltd. shall not be held liable for any loss, damage, or consequences arising from the use of this website or reliance on its content. Users are advised to seek professional consultation before making any financial, legal, or business decisions.
          </Block>

          {/* FOOT TEXT */}
          <div className="border-t pt-8 text-slate-700 leading-relaxed">
            By using this website, you agree to this Disclaimer.
          </div>

        </motion.div>
      </div>
    </div>
  );
}



/* SECTION BLOCK */
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
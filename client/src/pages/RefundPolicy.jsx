import { motion } from "framer-motion";
import { ShieldCheck, FileText, BadgeCheck, Mail } from "lucide-react";

export default function RefundPolicy() {

  const Section = ({ icon: Icon, title, children, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .45, delay }}
      className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7 md:p-9 hover:shadow-xl transition"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-3 bg-blue-100 rounded-xl">
          <Icon className="text-blue-700" />
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-slate-900">
          {title}
        </h2>
      </div>

      <div className="text-slate-600 leading-relaxed text-[15.5px] md:text-[16.5px] space-y-3">
        {children}
      </div>
    </motion.div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 py-14 px-4 md:px-6">

      <div className="max-w-5xl mx-auto space-y-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, scale: .9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-lg mb-6">
            <ShieldCheck size={38}/>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Refund Policy
          </h1>

          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            CADMA Associates Pvt. Ltd. believes in transparency and fair service practices.
            Please review our refund policy carefully before purchasing any service.
          </p>
        </motion.div>


        {/* SECTIONS */}

        <Section icon={ShieldCheck} title="Service Nature" delay={0.1}>
          <p>
            CADMA Associates Pvt. Ltd. provides professional consultancy and compliance services.
            Fees paid for services are generally non-refundable, as they involve time, expertise,
            and administrative processing.
          </p>

          <p>
            However, refunds may be considered in genuine cases where services have not been initiated
            or due to any verified error from our side.
          </p>
        </Section>


        <Section icon={FileText} title="When Refund Is Not Applicable" delay={0.2}>
          <ul className="list-disc ml-6 space-y-2">
            <li>Once the service process has started</li>
            <li>Documents have been submitted</li>
            <li>Work has already been completed</li>
            <li>Delay caused by client-side response or document submission</li>
          </ul>
        </Section>


        <Section icon={BadgeCheck} title="Approved Refund Process" delay={0.3}>
          <p>
            If a refund request is approved after review, it will be processed within a reasonable
            time through the original mode of payment used during the transaction.
          </p>

          <p>
            Processing time may vary depending on bank or payment provider policies.
          </p>
        </Section>


        <Section icon={Mail} title="Requesting a Refund" delay={0.4}>
          <p>
            For refund requests or queries, clients must contact CADMA Associates Pvt. Ltd.
            with valid payment details and service information for verification.
          </p>

          <p>
            Our team will review your request and respond as soon as possible with resolution details.
          </p>
        </Section>


        {/* FOOT NOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .5 }}
          className="text-center text-sm text-slate-500 pt-6"
        >
          © {new Date().getFullYear()} CADMA Associates Pvt. Ltd. All Rights Reserved.
        </motion.div>

      </div>
    </div>
  );
}

import { useState } from "react";
import { Home, AlertCircle, CheckCircle } from "lucide-react";
import { useCalculateEMIMutation } from "../../redux/apis/calculatorApi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import FormattedNumberInput from "./FormattedNumberInput";

export default function EmiCalculator() {

  const navigate = useNavigate();
  const [calculateEMI, { isLoading }] = useCalculateEMIMutation();
  const [redirecting,setRedirecting] = useState(false);

  const [form, setForm] = useState({
    loanAmount: "",
    interestRate: "",
    tenureYears: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* INPUT */
  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError("");
    setResult(null);
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await calculateEMI({
        loanAmount: Number(form.loanAmount),
        interestRate: Number(form.interestRate),
        tenureYears: Number(form.tenureYears),
      }).unwrap();

      setResult(res.data);
      toast.success("EMI calculated successfully ✅");

    } catch (err) {
      const msg = err?.data?.message || "Calculation failed";
      setError(msg);
      toast.error(msg);
    }
  };

  /* CONSULT BUTTON */
  const handleConsult = ()=>{
    setRedirecting(true);

    toast("Opening consultation ...✨✨",{
      style:{background:"#000",color:"#fff"}
    });

    setTimeout(()=> navigate("/contact"),1200);
  };

  return (
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <motion.div
        initial={{opacity:0,y:-20}}
        animate={{opacity:1,y:0}}
        className="flex items-center gap-3 mb-8"
      >
        <div className="p-3 bg-blue-100 rounded-xl">
          <Home className="text-blue-700" size={26}/>
        </div>
        <h2 className="text-3xl font-bold text-black">
          EMI Calculator
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{x:-40,opacity:0}}
          animate={{x:0,opacity:1}}
          className="bg-white p-6 rounded-2xl shadow-md space-y-5"
        >
          <FormattedNumberInput
            label="Loan Amount (₹)"
            name="loanAmount"
            value={form.loanAmount}
            onChange={handleChange}
            placeholder="Loan Amount"
          />

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-800">
              Interest Rate (%)
            </label>
            <input
              type="number"
              name="interestRate"
              value={form.interestRate}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter interest rate"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-800">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              name="tenureYears"
              value={form.tenureYears}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter years"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex gap-2">
              <AlertCircle size={18}/> {error}
            </div>
          )}

          <motion.button
            whileTap={{scale:0.95}}
            disabled={isLoading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"/>
                Calculating...
              </>
            ) : "Calculate EMI"}
          </motion.button>

        </motion.form>


        {/* RESULT */}
        <motion.div initial={{x:40,opacity:0}} animate={{x:0,opacity:1}} className="bg-white p-6 rounded-2xl shadow-md border">

          <AnimatePresence>

          {result ? (
            <motion.div
              key="result"
              initial={{opacity:0,scale:0.95}}
              animate={{opacity:1,scale:1}}
              exit={{opacity:0}}
            >

              <div className="flex items-center gap-2 text-blue-700 mb-5">
                <CheckCircle/>
                <h3 className="text-xl font-bold">Loan Summary</h3>
              </div>

              <Card title="Monthly EMI" value={result.emi} big highlight/>
              <Card title="Total Interest" value={result.totalInterest}/>
              <Card title="Total Payment" value={result.totalPayment} blue/>
              <Card title="Principal Amount" value={result.principal}/>

              <motion.button
                whileHover={{scale:1.03}}
                whileTap={{scale:0.95}}
                onClick={handleConsult}
                disabled={redirecting}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                {redirecting ? "Opening..." : "Get Loan Consultation"}
              </motion.button>

            </motion.div>
          ) : (
            <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} className="text-center text-gray-400 py-20">
              <Home size={48} className="mx-auto mb-3 opacity-40"/>
              Enter loan details to calculate EMI
            </motion.div>
          )}

          </AnimatePresence>

        </motion.div>

      </div>
    </div>
  );
}


/* RESULT CARD */
function Card({ title, value, big, highlight, blue }) {
  return (
    <motion.div
      whileHover={{scale:1.02}}
      className={`p-4 rounded-xl mb-4 border transition
      ${highlight ? "border-blue-500 shadow-md" : "border-slate-200"} bg-white`}
    >
      <p className="text-sm text-slate-500">{title}</p>

      <p className={`mt-1 font-bold
        ${big ? "text-3xl" : "text-2xl"}
        ${highlight || blue ? "text-blue-700" : "text-slate-800"}
      `}>
        ₹ {Number(value).toLocaleString("en-IN")}
      </p>
    </motion.div>
  );
}
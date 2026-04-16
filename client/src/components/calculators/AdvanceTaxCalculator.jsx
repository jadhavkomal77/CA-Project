
import { useMemo, useState } from "react";
import { Landmark, AlertCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { calculateAdvanceTax } from "../../utils/calculator";

export default function AdvanceTaxCalculator() {

  const navigate = useNavigate();
  const [redirecting,setRedirecting] = useState(false);

  const [formData, setFormData] = useState({
    estimatedIncome: "",
    tdsDeducted: "",
    previousAdvanceTax: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const calculation = useMemo(
    () => calculateAdvanceTax(formData),
    [formData],
  );

  const hasInput = useMemo(
    () => Object.values(formData).some((value) => value !== ""),
    [formData],
  );

  const result = calculation.result;
  const error = hasInput ? calculation.errors[0] ?? "" : "";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (result) {
      toast.success("Tax calculated successfully ✅");
      return;
    }

    if (error) {
      toast.error(error);
    }
  };

  /* CONSULT BUTTON */
  const handleConsult = () => {

    setRedirecting(true);

    toast("Opening consultation ...✨✨",{
      style:{background:"#000",color:"#fff"}
    });

    setTimeout(()=> navigate("/contact"),1200);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">

      {/* HEADER */}
      <motion.h1
        initial={{opacity:0,y:-20}}
        animate={{opacity:1,y:0}}
        className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3"
      >
        <Landmark className="text-blue-600"/>
        Advance Tax Calculator
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{x:-40,opacity:0}}
          animate={{x:0,opacity:1}}
          className="space-y-6 bg-white rounded-2xl shadow-lg p-6"
        >

          <SliderInput label="Estimated Income" name="estimatedIncome" value={formData.estimatedIncome} onChange={handleChange} max={5000000}/>
          <SliderInput label="TDS Deducted" name="tdsDeducted" value={formData.tdsDeducted} onChange={handleChange} max={1000000}/>
          <SliderInput label="Advance Tax Paid" name="previousAdvanceTax" value={formData.previousAdvanceTax} onChange={handleChange} max={1000000}/>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex gap-2">
              <AlertCircle size={18}/> {error}
            </div>
          )}

          <motion.button
            whileTap={{scale:0.95}}
            disabled={!hasInput}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
          >
            Calculate Tax
          </motion.button>

          <p className="text-xs text-slate-500">
            Results refresh instantly as you adjust the inputs.
          </p>

        </motion.form>


        {/* RESULT */}
        <motion.div initial={{x:40,opacity:0}} animate={{x:0,opacity:1}} className="bg-white rounded-2xl shadow-lg p-6">

          <AnimatePresence>

          {result ? (
            <motion.div
              key="result"
              initial={{opacity:0,scale:0.95}}
              animate={{opacity:1,scale:1}}
              exit={{opacity:0}}
            >

              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Calculation Summary
              </h3>

              <div className="space-y-4">
                <ResultItem label="Tax on Income" value={result.taxOnEstimated}/>
                <ResultItem label="Cess (4%)" value={result.cess}/>
                <ResultItem label="Total Tax Liability" value={result.totalTaxLiability}/>
                <ResultItem label="Advance Tax Payable" value={result.advanceTaxPayable}/>
              </div>

              <div className="mt-6 bg-yellow-100 border border-yellow-300 p-4 rounded-lg text-sm text-yellow-700 flex gap-2">
                <Info size={16}/>
                Installments → 
                Q1: ₹{result.installments.q1.toLocaleString()} |
                Q2: ₹{result.installments.q2.toLocaleString()} |
                Q3: ₹{result.installments.q3.toLocaleString()} |
                Q4: ₹{result.installments.q4.toLocaleString()}
              </div>

              <motion.button
                whileHover={{scale:1.03}}
                whileTap={{scale:0.95}}
                onClick={handleConsult}
                disabled={redirecting}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                {redirecting ? "Opening..." : "Book Consultation"}
              </motion.button>

            </motion.div>
          ) : (
            <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} className="text-center text-gray-400 py-20">
              <Landmark size={48} className="mx-auto mb-3 opacity-50"/>
              Enter details to calculate
            </motion.div>
          )}

          </AnimatePresence>

        </motion.div>

      </div>
    </div>
  );
}


/* SLIDER */
function SliderInput({label,name,value,onChange,min=0,max=1000000}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-blue-600 font-semibold">
          ₹ {Number(value || 0).toLocaleString("en-IN")}
        </span>
      </div>

      <input type="range" name={name} min={min} max={max} value={value||0} onChange={onChange} className="w-full accent-blue-600"/>
    </div>
  );
}


/* RESULT ITEM */
function ResultItem({label,value}) {
  return (
    <div className="flex justify-between border-b pb-2">
      <p className="text-gray-600">{label}</p>
      <p className="font-semibold text-gray-900">
        ₹ {Number(value).toLocaleString("en-IN")}
      </p>
    </div>
  );
}
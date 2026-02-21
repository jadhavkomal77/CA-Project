import { useState } from "react";
import { Search, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSearchGSTMutation } from "../../redux/apis/calculatorApi";

export default function GstSearch() {

  const navigate = useNavigate();
  const [searchGST,{isLoading}] = useSearchGSTMutation();

  const [query,setQuery] = useState("");
  const [result,setResult] = useState(null);
  const [error,setError] = useState("");

  /* GST VALIDATION */
  const isValidGST = (gst)=>{
    return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst);
  };

  /* SEARCH */
  const handleSearch = async(e)=>{
    e.preventDefault();

    const gst = query.trim().toUpperCase();

    if(!gst){
      setError("Enter GST number");
      return;
    }

    if(!isValidGST(gst)){
      setError("Invalid GST number format");
      return;
    }

    try{
      const res = await searchGST({ gstNumber: gst }).unwrap();
      setResult(res.data);
      setError("");
    }
    catch(err){
      setResult(null);
      setError(err?.data?.message || "GST not found");
    }
  };

  return(
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-xl">
          <Search className="text-blue-700"/>
        </div>
        <h2 className="text-3xl font-bold">GST Search</h2>
      </div>


      <div className="grid md:grid-cols-2 gap-8">

        {/* FORM */}
        <motion.form
          onSubmit={handleSearch}
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          className="bg-white p-6 rounded-2xl shadow-md space-y-5 border border-slate-200"
        >

          <input
            type="text"
            placeholder="Enter GST Number"
            value={query}
            onChange={(e)=>{
              setQuery(e.target.value.toUpperCase());
              setError("");
            }}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          />

          {error && (
            <motion.div
              initial={{opacity:0}}
              animate={{opacity:1}}
              className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex gap-2"
            >
              <AlertCircle size={18}/>
              {error}
            </motion.div>
          )}

          <button
            disabled={isLoading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition shadow"
          >
            {isLoading ? "Searching..." : "Search GST"}
          </button>

        </motion.form>


        {/* RESULT */}
        <motion.div
          initial={{opacity:0,y:30}}
          animate={{opacity:1,y:0}}
          className="bg-white p-6 rounded-2xl shadow-md border border-slate-200"
        >

          {result ? (
            <>
              <div className="flex items-center gap-2 text-blue-700 mb-5">
                <CheckCircle/>
                <h3 className="text-xl font-bold">GST Details</h3>
              </div>

              <Result label="GSTIN" value={result.gstNumber}/>
              <Result label="Legal Name" value={result.legalName}/>
              <Result label="Trade Name" value={result.tradeName}/>
              <Result label="Status" value={result.status}/>
              <Result label="Registration Date" value={result.registrationDate}/>
              <Result label="Business Type" value={result.businessType}/>
              <Result label="Address" value={result.address}/>

              {/* CONTACT BUTTON */}
              <button
                onClick={()=>navigate("/contact")}
                className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition"
              >
                Contact CA Expert
              </button>
            </>
          ):(
            <div className="text-center text-gray-400 py-20">
              Enter GST number to search
            </div>
          )}

        </motion.div>

      </div>
    </div>
  );
}


/* RESULT CARD */
function Result({label,value}){
  return(
    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 mb-3">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-slate-800">{value}</p>
    </div>
  );
}
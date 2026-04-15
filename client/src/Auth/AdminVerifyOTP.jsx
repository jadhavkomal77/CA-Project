
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyOTPMutation, useForgotPasswordMutation } from "../redux/apis/adminApi";
import { toast } from "react-toastify";
import { FiShield, FiArrowLeft } from "react-icons/fi";

export default function AdminVerifyOTP() {

  const [otp, setOtp] = useState(["","","","","",""]);
  const [timer, setTimer] = useState(30);

  const inputs = useRef([]);

  const email = sessionStorage.getItem("resetEmail");

  const navigate = useNavigate();

  const [verifyOTP,{isLoading}] = useVerifyOTPMutation();
  const [resendOTP] = useForgotPasswordMutation();

  /* protect route */
  useEffect(()=>{
    if(!email){
      navigate("/admin-forgot-password",{replace:true});
    }
  },[email,navigate]);

  /* resend timer */
  useEffect(()=>{

    if(timer===0) return;

    const interval=setInterval(()=>{
      setTimer(prev=>prev-1);
    },1000);

    return ()=>clearInterval(interval);

  },[timer]);

  const handleChange=(value,index)=>{

    if(!/^[0-9]?$/.test(value)) return;

    const newOtp=[...otp];
    newOtp[index]=value;
    setOtp(newOtp);

    if(value && index<5){
      inputs.current[index+1].focus();
    }
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const finalOTP=otp.join("");

    if(finalOTP.length!==6){
      toast.error("Enter valid OTP");
      return;
    }

    try{

      await verifyOTP({
        email,
        otp:finalOTP
      }).unwrap();

      toast.success("OTP verified");

      navigate("/admin-reset-password",{replace:true});

    }catch(err){
      toast.error(err?.data?.message || "Invalid OTP");
    }
  };

  const handleResend=async()=>{

    try{

      await resendOTP({email}).unwrap();

      toast.success("OTP resent");

      setTimer(30);

    }catch{
      toast.error("Failed to resend OTP");
    }
  };

  return(

    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">

        <button
          onClick={()=>navigate(-1)}
          className="absolute left-4 top-4 text-gray-500 flex items-center gap-1"
        >
          <FiArrowLeft/> Back
        </button>

        <div className="text-center mb-6">

          <div className="flex justify-center text-3xl text-blue-600 mb-2">
            <FiShield/>
          </div>

          <h2 className="text-2xl font-bold">Verify OTP</h2>

          <p className="text-sm text-gray-500">
            Enter the 6 digit OTP sent to your email
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="flex justify-center gap-3">

            {otp.map((digit,index)=>(
              <input
                key={index}
                ref={(el)=>inputs.current[index]=el}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e)=>handleChange(e.target.value,index)}
                className="w-12 h-12 text-center text-lg border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            ))}

          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">

          Didn&apos;t receive OTP?{" "}

          <span
            onClick={timer===0 ? handleResend : null}
            className={`cursor-pointer ${timer===0 ? "text-blue-600" : "text-gray-400"}`}
          >

            {timer>0 ? `Resend in ${timer}s` : "Resend OTP"}

          </span>

        </p>

      </div>

    </div>
  );
}
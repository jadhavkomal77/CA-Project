
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPublicServiceBySlugQuery } from "../redux/apis/serviceApi";
import { useCreateApplicationMutation } from "../redux/apis/applicationApi";
import { toast } from "react-toastify";

import {
  Upload,
  Trash2,
  Loader2,
  CheckCircle,
  ArrowLeft,
  FileText,
  User,
} from "lucide-react";

export default function ApplyService() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetPublicServiceBySlugQuery(slug);
  const service = data?.data || data;

  const [createApplication, { isLoading: submitting }] =
    useCreateApplicationMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});

  /* INPUT CHANGE */
  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  /* VALIDATION */
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = "Invalid email";
    if (form.phone.replace(/\D/g, "").length !== 10)
      e.phone = "Invalid phone";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* FILE SELECT */
  const handleFile = (doc, e) => {
    const selected = Array.from(e.target.files);

    const valid = selected.filter((f) => {
      if (f.size > 10 * 1024 * 1024) {
        toast.error(`${f.name} exceeds 10MB limit`);
        return false;
      }
      return true;
    });

    setFiles((p) => ({
      ...p,
      [doc]: [...(p[doc] || []), ...valid],
    }));
  };

  /* REMOVE FILE */
  const removeFile = (doc, index) => {
    setFiles((p) => {
      const copy = { ...p };
      copy[doc].splice(index, 1);
      if (!copy[doc].length) delete copy[doc];
      return copy;
    });
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const fd = new FormData();
      fd.append("userDetails", JSON.stringify(form));
      fd.append("serviceId", service._id);

      Object.keys(files).forEach((key) =>
        files[key].forEach((file) =>
          fd.append("documents", file)
        )
      );

      await createApplication(fd).unwrap();

      toast.success("Application submitted successfully!🎉", {
        position: "top-right",
        autoClose: 2500,
        theme: "dark",
      });

      setTimeout(() => navigate("/contact"), 2500);
    } catch (err) {
      toast.error(
        err?.data?.message || err?.message || "Submission failed❌",
        { position: "top-right", autoClose: 3000 }
      );
    }
  };

  /* LOADING */
  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin text-blue-700" size={42} />
      </div>
    );

  /* PAGE */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4">

      <div className="max-w-5xl mx-auto">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm mb-6 text-black hover:text-blue-700"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white p-7 rounded-3xl shadow-xl mb-8">
          <h1 className="text-2xl font-bold">Apply for {service.title}</h1>
          <p className="text-sm opacity-90 mt-1">
            Fill details and upload required documents
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* PERSONAL INFO */}
          <Card title="Personal Information" icon={<User size={18}/>}>
            <div className="grid md:grid-cols-2 gap-5">

              <Input label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name}/>
              <Input label="Email Address" name="email" value={form.email} onChange={handleChange} error={errors.email}/>
              <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone}/>

              <div>
                <label className="label">Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows="2"
                  className="input-modern"
                />
              </div>

            </div>
          </Card>

          {/* DOCUMENTS */}
          {service.requiredDocuments?.length > 0 && (
            <Card title="Upload Documents" icon={<FileText size={18}/>}>
              <div className="grid md:grid-cols-2 gap-6">

                {service.requiredDocuments.map((doc,i)=>(
                  <div key={i} className="space-y-2">

                    <label className="label">{doc}</label>

                    <label className="upload-modern">
                      <span className="flex items-center gap-2 text-gray-600 text-sm">
                        <Upload size={16}/> Select Files
                      </span>

                      <input hidden type="file" multiple onChange={(e)=>handleFile(doc,e)}/>
                    </label>

                    {/* FILE LIST */}
                    {files[doc]?.map((f,index)=>{

                      const isImage = f.type.startsWith("image/");
                      const isPDF = f.type === "application/pdf";

                      return (
                        <div key={index} className="file-modern flex items-center justify-between gap-3">

                          <div className="flex items-center gap-3">

                            {isImage && (
                              <img
                                src={URL.createObjectURL(f)}
                                alt=""
                                className="w-10 h-10 object-cover rounded-md border"
                              />
                            )}

                            {isPDF && (
                              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-red-100 text-red-600 text-xs font-bold">
                                PDF
                              </div>
                            )}

                            {!isImage && !isPDF && (
                              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-gray-600 text-xs font-bold">
                                FILE
                              </div>
                            )}

                            <span className="truncate text-sm">{f.name}</span>
                          </div>

                          <Trash2
                            size={16}
                            onClick={()=>removeFile(doc,index)}
                            className="cursor-pointer text-gray-500 hover:text-red-600"
                          />
                        </div>
                      );
                    })}

                  </div>
                ))}

              </div>
            </Card>
          )}

          {/* SUBMIT */}
          <button disabled={submitting} className="submit-modern">
            {submitting
              ? <Loader2 className="animate-spin"/>
              : <CheckCircle size={18}/>}
            Submit Application
          </button>

        </form>
      </div>
    </div>
  );
}

/* CARD */
const Card = ({title,icon,children})=>(
  <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-7">
    <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2 border-b pb-2">
      {icon}{title}
    </h2>
    {children}
  </div>
);

/* INPUT */
const Input = ({label,name,value,onChange,error})=>(
  <div>
    <label className="label">{label}</label>

    <input
      name={name}
      value={value}
      onChange={onChange}
      className={`input-modern ${error?"border-red-400":""}`}
    />

    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);
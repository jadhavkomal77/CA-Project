import { useEffect, useState } from "react";
import { useAddServiceMutation, useUpdateServiceMutation } from "../redux/apis/serviceApi";
import slugify from "slugify";

export default function AdminService({ editData }) {
  const [addService] = useAddServiceMutation();
  const [updateService] = useUpdateServiceMutation();

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [icon, setIcon] = useState("⚡");

  const [whyChoose, setWhyChoose] = useState([]);
  const [process, setProcess] = useState([]);
  const [technologies, setTechnologies] = useState("");
  const [projects, setProjects] = useState([]);

  /* ✅ PREFILL WHEN EDIT */
  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setShortDesc(editData.shortDesc);
      setLongDesc(editData.longDesc);
      setIcon(editData.icon || "⚡");
      setWhyChoose(editData.whyChoose || []);
      setProcess(editData.process || []);
      setTechnologies((editData.technologies || []).join(","));
      setProjects(
        (editData.projects || []).map((p) => ({
          title: p.title,
          desc: p.desc,
          tech: (p.tech || []).join(","),
          image: null, // new image optional
        }))
      );
    }
  }, [editData]);

  /* WHY CHOOSE */
  const addWhyChoose = () =>
    setWhyChoose([...whyChoose, { icon: "", title: "", desc: "" }]);
  const updateWhyChoose = (i, field, value) => {
    const copy = [...whyChoose];
    copy[i][field] = value;
    setWhyChoose(copy);
  };
  const removeWhyChoose = (i) =>
    setWhyChoose(whyChoose.filter((_, idx) => idx !== i));

  /* PROCESS */
  const addProcess = () =>
    setProcess([...process, { step: process.length + 1, title: "", desc: "" }]);
  const updateProcess = (i, field, value) => {
    const copy = [...process];
    copy[i][field] = value;
    setProcess(copy);
  };
  const removeProcess = (i) =>
    setProcess(process.filter((_, idx) => idx !== i));

  /* PROJECTS */
  const addProject = () =>
    setProjects([...projects, { title: "", desc: "", tech: "", image: null }]);
  const updateProject = (i, field, value) => {
    const copy = [...projects];
    copy[i][field] = value;
    setProjects(copy);
  };
  const removeProject = (i) =>
    setProjects(projects.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    const slug = slugify(title, { lower: true, strict: true });

    fd.append("title", title);
    fd.append("slug", slug);
    fd.append("shortDesc", shortDesc);
    fd.append("longDesc", longDesc);
    fd.append("icon", icon);

    fd.append("whyChoose", JSON.stringify(whyChoose));
    fd.append("process", JSON.stringify(process));
    fd.append("technologies", JSON.stringify(technologies.split(",")));

    const projectData = projects.map((p) => ({
      title: p.title,
      desc: p.desc,
      tech: p.tech.split(","),
    }));

    fd.append("projects", JSON.stringify(projectData));

    projects.forEach((p) => {
      if (p.image) fd.append("projects", p.image);
    });

    if (editData) {
      await updateService({ id: editData._id, formData: fd });
      alert("Service Updated");
    } else {
      await addService(fd);
      alert("Service Added");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {editData ? "✏️ Edit Service" : "➕ Add New Service"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* BASIC INFO */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-lg">Basic Info</h3>
          <input className="input" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <textarea className="input" placeholder="Short Description" value={shortDesc} onChange={(e)=>setShortDesc(e.target.value)} />
          <textarea className="input" placeholder="Long Description" value={longDesc} onChange={(e)=>setLongDesc(e.target.value)} />
          <input className="input" placeholder="Icon (⚡)" value={icon} onChange={(e)=>setIcon(e.target.value)} />
        </div>

        {/* WHY CHOOSE */}
        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-lg">Why Choose</h3>
            <button type="button" onClick={addWhyChoose} className="btn-blue">+ Add</button>
          </div>
          {whyChoose.map((w,i)=>(
            <div key={i} className="grid grid-cols-3 gap-3 mb-3">
              <input className="input" placeholder="Icon" onChange={e=>updateWhyChoose(i,"icon",e.target.value)} />
              <input className="input" placeholder="Title" onChange={e=>updateWhyChoose(i,"title",e.target.value)} />
              <input className="input" placeholder="Desc" onChange={e=>updateWhyChoose(i,"desc",e.target.value)} />
              <button type="button" onClick={()=>removeWhyChoose(i)} className="btn-red col-span-3">Remove</button>
            </div>
          ))}
        </div>

        {/* PROCESS */}
        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-lg">Process</h3>
            <button type="button" onClick={addProcess} className="btn-blue">+ Add</button>
          </div>
          {process.map((p,i)=>(
            <div key={i} className="grid grid-cols-3 gap-3 mb-3">
              <input className="input bg-gray-100" value={p.step} disabled />
              <input className="input" placeholder="Title" onChange={e=>updateProcess(i,"title",e.target.value)} />
              <input className="input" placeholder="Desc" onChange={e=>updateProcess(i,"desc",e.target.value)} />
              <button type="button" onClick={()=>removeProcess(i)} className="btn-red col-span-3">Remove</button>
            </div>
          ))}
        </div>

        {/* TECHNOLOGIES */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-2">Technologies</h3>
          <input className="input" placeholder="React,Node,Next" onChange={(e)=>setTechnologies(e.target.value)} />
        </div>

        {/* PROJECTS */}
        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-lg">Projects</h3>
            <button type="button" onClick={addProject} className="btn-blue">+ Add</button>
          </div>
          {projects.map((p,i)=>(
            <div key={i} className="grid grid-cols-2 gap-3 mb-4">
              <input className="input" placeholder="Title" onChange={e=>updateProject(i,"title",e.target.value)} />
              <input className="input" placeholder="Desc" onChange={e=>updateProject(i,"desc",e.target.value)} />
              <input className="input" placeholder="Tech (React,Node)" onChange={e=>updateProject(i,"tech",e.target.value)} />
              <input type="file" className="input" onChange={e=>updateProject(i,"image",e.target.files[0])} />
              <button type="button" onClick={()=>removeProject(i)} className="btn-red col-span-2">Remove</button>
            </div>
          ))}
        </div>

        <button type="submit" className="btn-green w-full text-lg">💾 Save Service</button>
      </form>
    </div>
  );
}


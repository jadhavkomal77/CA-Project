// import React, { useEffect, useState } from "react";
// import { useGetAdminAboutQuery, useSaveAboutMutation } from "../redux/apis/aboutApi";


// export default function AdminAbout() {
//   const { data, isLoading } = useGetAdminAboutQuery();
//   const [saveAbout, { isLoading: saving }] = useSaveAboutMutation();

//   const [form, setForm] = useState({
//     headingSmall: "",
//     title: "",
//     description1: "",
//     description2: "",
//     experience: "",
//     isActive: true,
//   });

//   const [image, setImage] = useState(null);

//   // Load existing about data
//   useEffect(() => {
//     if (data) {
//       setForm({
//         headingSmall: data.headingSmall || "",
//         title: data.title || "",
//         description1: data.description1 || "",
//         description2: data.description2 || "",
//         experience: data.experience || "",
//         isActive: data.isActive ?? true,
//       });
//     }
//   }, [data]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const fd = new FormData();
//     fd.append("headingSmall", form.headingSmall);
//     fd.append("title", form.title);
//     fd.append("description1", form.description1);
//     fd.append("description2", form.description2);
//     fd.append("experience", form.experience);
//     fd.append("isActive", form.isActive);

//     if (image) {
//       fd.append("image", image);
//     }

//     await saveAbout(fd);
//     alert("About section updated successfully ✅");
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="max-w-5xl bg-white shadow rounded-xl p-8">
//       <h2 className="text-2xl font-bold mb-2">About Section</h2>
//       <p className="text-gray-500 mb-8">
//         Manage the About section content shown on the website.
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Small Heading */}
//         <div>
//           <label className="block font-medium mb-1">Small Heading</label>
//           <input
//             type="text"
//             name="headingSmall"
//             value={form.headingSmall}
//             onChange={handleChange}
//             className="w-full border px-4 py-3 rounded"
//             placeholder="WHO WE ARE"
//           />
//         </div>

//         {/* Title */}
//         <div>
//           <label className="block font-medium mb-1">Main Title</label>
//           <input
//             type="text"
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             className="w-full border px-4 py-3 rounded"
//             placeholder="We get the lights on fast and for a good price."
//             required
//           />
//         </div>

//         {/* Description 1 */}
//         <div>
//           <label className="block font-medium mb-1">Description (Paragraph 1)</label>
//           <textarea
//             name="description1"
//             value={form.description1}
//             onChange={handleChange}
//             className="w-full border px-4 py-3 rounded h-28"
//             required
//           />
//         </div>

//         {/* Description 2 */}
//         <div>
//           <label className="block font-medium mb-1">Description (Paragraph 2)</label>
//           <textarea
//             name="description2"
//             value={form.description2}
//             onChange={handleChange}
//             className="w-full border px-4 py-3 rounded h-28"
//           />
//         </div>

//         {/* Experience */}
//         <div>
//           <label className="block font-medium mb-1">Years of Experience</label>
//           <input
//             type="number"
//             name="experience"
//             value={form.experience}
//             onChange={handleChange}
//             className="w-full border px-4 py-3 rounded"
//             placeholder="15"
//           />
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label className="block font-medium mb-2">About Image</label>
//           <input
//             type="file"
//             onChange={(e) => setImage(e.target.files[0])}
//           />

//           {data?.image && (
//             <img
//               src={data.image}
//               alt="About preview"
//               className="mt-4 h-48 rounded object-cover"
//             />
//           )}
//         </div>

//         {/* Active Toggle */}
//         <div className="flex items-center gap-3">
//           <input
//             type="checkbox"
//             name="isActive"
//             checked={form.isActive}
//             onChange={handleChange}
//           />
//           <span>Show About section on website</span>
//         </div>

//         {/* Save Button */}
//         <button
//           disabled={saving}
//           className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition"
//         >
//           {saving ? "Saving..." : "Save About Section"}
//         </button>
//       </form>
//     </div>
//   );
// }







import React, { useEffect, useState } from "react";
import {
  useGetAdminAboutQuery,
  useSaveAboutMutation,
} from "../redux/apis/aboutApi";

export default function AdminAbout() {
  const { data, isLoading } = useGetAdminAboutQuery();
  const [saveAbout, { isLoading: saving }] = useSaveAboutMutation();

  const [form, setForm] = useState({
    headingSmall: "",
    title: "",
    description1: "",
    description2: "",
    experience: "",
    isActive: true,
  });

  const [image, setImage] = useState(null);
  const [members, setMembers] = useState([]);

  /* LOAD DATA */
  useEffect(() => {
    if (data) {
      setForm({
        headingSmall: data.headingSmall || "",
        title: data.title || "",
        description1: data.description1 || "",
        description2: data.description2 || "",
        experience: data.experience || "",
        isActive: data.isActive ?? true,
      });

      if (data.teamMembers) {
        setMembers(
          data.teamMembers.map((m) => ({
            ...m,
            photoFile: null,
            photoPreview: m.photo || "",
          }))
        );
      }
    }
  }, [data]);

  /* INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  /* ADD MEMBER */
  const addMember = () => {
    setMembers([
      ...members,
      { name: "", shortDetails: "", photoFile: null, photoPreview: "" },
    ]);
  };

  /* DELETE MEMBER */
  const removeMember = (index) => {
    const copy = [...members];
    copy.splice(index, 1);
    setMembers(copy);
  };

  /* UPDATE MEMBER TEXT */
  const updateMember = (i, field, value) => {
    const copy = [...members];
    copy[i][field] = value;
    setMembers(copy);
  };

  /* IMAGE SELECT */
  const handleMemberImage = (i, file) => {
    const copy = [...members];
    copy[i].photoFile = file;
    copy[i].photoPreview = URL.createObjectURL(file);
    setMembers(copy);
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    Object.entries(form).forEach(([k, v]) => fd.append(k, v));

    if (image) fd.append("image", image);

    /* MEMBERS CLEAN + FILE ATTACH */
    const cleanMembers = members.map((m) => {
      if (m.photoFile) {
        fd.append("teamPhotos", m.photoFile);
      }

      return {
        name: m.name,
        shortDetails: m.shortDetails,
        photo: m.photoPreview,
      };
    });

    fd.append("teamMembers", JSON.stringify(cleanMembers));

    await saveAbout(fd);
    alert("Saved Successfully ✅");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl bg-white shadow rounded-xl p-8">

      <h2 className="text-2xl font-bold mb-2">About Section</h2>
      <p className="text-gray-500 mb-8">Manage About Page Content</p>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* HEADING */}
        <input
          name="headingSmall"
          value={form.headingSmall}
          onChange={handleChange}
          placeholder="Small Heading"
          className="w-full border px-4 py-3 rounded"
        />

        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full border px-4 py-3 rounded"
        />

        {/* DESC 1 */}
        <textarea
          name="description1"
          value={form.description1}
          onChange={handleChange}
          placeholder="Description 1"
          required
          className="w-full border px-4 py-3 rounded h-28"
        />

        {/* DESC 2 */}
        <textarea
          name="description2"
          value={form.description2}
          onChange={handleChange}
          placeholder="Description 2"
          className="w-full border px-4 py-3 rounded h-28"
        />

        {/* EXPERIENCE */}
        <input
          type="number"
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="Years Experience"
          className="w-full border px-4 py-3 rounded"
        />

        {/* MAIN IMAGE */}
        <div>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          {data?.image && (
            <img
              src={data.image}
              className="h-40 mt-3 rounded object-cover"
            />
          )}
        </div>

        {/* ACTIVE */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Show Section
        </label>

        {/* TEAM */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">Team Members</h3>

          {members.map((m, i) => (
            <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">

              <div className="grid md:grid-cols-3 gap-4">

                <input
                  value={m.name}
                  placeholder="Name"
                  onChange={(e)=>updateMember(i,"name",e.target.value)}
                  className="border px-3 py-2 rounded"
                />

                <input
                  value={m.shortDetails}
                  placeholder="Short Details"
                  onChange={(e)=>updateMember(i,"shortDetails",e.target.value)}
                  className="border px-3 py-2 rounded"
                />

                {/* IMAGE UPLOAD */}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e)=>handleMemberImage(i,e.target.files[0])}
                  />

                  {m.photoPreview && (
                    <img
                      src={m.photoPreview}
                      className="h-16 mt-2 rounded object-cover"
                    />
                  )}
                </div>

              </div>

             <button
  type="button"
  onClick={()=>{
    if(confirm("Are you sure you want to delete this member?")){
      removeMember(i);
    }
  }}
  className="mt-4 inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 hover:border-red-300 transition"
>
  🗑 Delete Member
</button>

            </div>
          ))}

          <button
            type="button"
            onClick={addMember}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            + Add Member
          </button>
        </div>

        {/* SAVE */}
        <button
          disabled={saving}
          className="bg-red-500 text-white px-8 py-3 rounded"
        >
          {saving ? "Saving..." : "Save About"}
        </button>

      </form>
    </div>
  );
}
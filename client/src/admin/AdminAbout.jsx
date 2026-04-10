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

const handleSubmit = async (e) => {
  e.preventDefault();

  const fd = new FormData();

  Object.entries(form).forEach(([k, v]) => fd.append(k, v));

  if (image) {
    fd.append("image", image);
  }

  let membersData = [];

  members.forEach((m) => {

    membersData.push({
      name: m.name,
      shortDetails: m.shortDetails,

      photo: m.photoFile ? "" : m.photoPreview
    });

    if (m.photoFile) {
      fd.append("teamPhotos", m.photoFile);
    }

  });

  fd.append("teamMembers", JSON.stringify(membersData));

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





// import { useEffect, useState } from "react";
// import {
//   useGetAdminAboutQuery,
//   useSaveAboutMutation,
// } from "../redux/apis/aboutApi";

// const emptyMember = { name: "", shortDetails: "", photo: "" };
// const emptyGalleryItem = { title: "", image: "" };

// export default function AdminAbout() {
//   const { data, isLoading, isFetching } = useGetAdminAboutQuery();
//   const [saveAbout, { isLoading: saving }] = useSaveAboutMutation();

//   const [form, setForm] = useState({
//     headingSmall: "",
//     title: "",
//     description1: "",
//     description2: "",
//     experience: "",
//     isActive: true,
//   });

//   const [mainImage, setMainImage] = useState(null);
//   const [mainImagePreview, setMainImagePreview] = useState("");

//   const [teamMembers, setTeamMembers] = useState([emptyMember]);
//   const [teamPhotos, setTeamPhotos] = useState([]);
//   const [teamPreviews, setTeamPreviews] = useState([]);

//   const [gallery, setGallery] = useState([emptyGalleryItem]);
//   const [galleryImages, setGalleryImages] = useState([]);
//   const [galleryPreviews, setGalleryPreviews] = useState([]);

//   useEffect(() => {
//     if (!data) return;

//     setForm({
//       headingSmall: data.headingSmall || "",
//       title: data.title || "",
//       description1: data.description1 || "",
//       description2: data.description2 || "",
//       experience: data.experience || "",
//       isActive: data.isActive ?? true,
//     });

//     setTeamMembers(data.teamMembers?.length ? data.teamMembers : [emptyMember]);
//     setGallery(data.gallery?.length ? data.gallery : [emptyGalleryItem]);

//     setMainImage(null);
//     setMainImagePreview(data.image || "");

//     setTeamPhotos([]);
//     setGalleryImages([]);

//     setTeamPreviews(data.teamMembers?.map((m) => m.photo || "") || [""]);
//     setGalleryPreviews(data.gallery?.map((g) => g.image || "") || [""]);
//   }, [data]);

//   const handleFormChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleMainImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setMainImage(file);
//     setMainImagePreview(URL.createObjectURL(file));
//   };

//   const handleMemberChange = (index, field, value) => {
//     setTeamMembers((prev) => {
//       const updated = [...prev];
//       updated[index] = { ...updated[index], [field]: value };
//       return updated;
//     });
//   };

//   const handleMemberPhotoChange = (index, file) => {
//     if (!file) return;

//     setTeamPhotos((prev) => {
//       const updated = [...prev];
//       updated[index] = file;
//       return updated;
//     });

//     setTeamPreviews((prev) => {
//       const updated = [...prev];
//       updated[index] = URL.createObjectURL(file);
//       return updated;
//     });
//   };

//   const addMember = () => {
//     setTeamMembers((prev) => [...prev, emptyMember]);
//   };

//   const removeMember = (index) => {
//     setTeamMembers((prev) => {
//       const updated = prev.filter((_, i) => i !== index);
//       return updated.length ? updated : [emptyMember];
//     });

//     setTeamPhotos((prev) => prev.filter((_, i) => i !== index));
//     setTeamPreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleGalleryChange = (index, field, value) => {
//     setGallery((prev) => {
//       const updated = [...prev];
//       updated[index] = { ...updated[index], [field]: value };
//       return updated;
//     });
//   };

//   const handleGalleryImageChange = (index, file) => {
//     if (!file) return;

//     setGalleryImages((prev) => {
//       const updated = [...prev];
//       updated[index] = file;
//       return updated;
//     });

//     setGalleryPreviews((prev) => {
//       const updated = [...prev];
//       updated[index] = URL.createObjectURL(file);
//       return updated;
//     });
//   };

//   const addGalleryItem = () => {
//     setGallery((prev) => [...prev, emptyGalleryItem]);
//   };

//   const removeGalleryItem = (index) => {
//     setGallery((prev) => {
//       const updated = prev.filter((_, i) => i !== index);
//       return updated.length ? updated : [emptyGalleryItem];
//     });

//     setGalleryImages((prev) => prev.filter((_, i) => i !== index));
//     setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const fd = new FormData();

//     fd.append("headingSmall", form.headingSmall);
//     fd.append("title", form.title);
//     fd.append("description1", form.description1);
//     fd.append("description2", form.description2);
//     fd.append("experience", form.experience);
//     fd.append("isActive", String(form.isActive));

//     fd.append("teamMembers", JSON.stringify(teamMembers));
//     fd.append("gallery", JSON.stringify(gallery));

//     if (mainImage instanceof File) {
//       fd.append("image", mainImage);
//     }

//     teamPhotos.forEach((file) => {
//       if (file instanceof File) fd.append("teamPhotos", file);
//     });

//     galleryImages.forEach((file) => {
//       if (file instanceof File) fd.append("galleryImages", file);
//     });

//     for (const pair of fd.entries()) {
//       console.log(pair[0], pair[1]);
//     }

//     await saveAbout(fd).unwrap();
//     alert("About saved successfully");
//   } catch (err) {
//     console.error("SAVE ABOUT ERROR:", err);
//     alert(err?.data?.message || "Failed to save about section");
//   }
// };

//   if (isLoading || isFetching) {
//     return <div className="p-6">Loading...</div>;
//   }

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Admin About Page</h1>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         <section className="bg-white p-4 rounded shadow">
//           <h2 className="text-xl font-semibold mb-4">Main About Content</h2>

//           <div className="grid md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="headingSmall"
//               value={form.headingSmall}
//               onChange={handleFormChange}
//               placeholder="Heading Small"
//               className="border p-2 rounded w-full"
//             />
//             <input
//               type="text"
//               name="title"
//               value={form.title}
//               onChange={handleFormChange}
//               placeholder="Title"
//               className="border p-2 rounded w-full"
//             />
//             <textarea
//               name="description1"
//               value={form.description1}
//               onChange={handleFormChange}
//               placeholder="Description 1"
//               className="border p-2 rounded w-full"
//               rows={4}
//             />
//             <textarea
//               name="description2"
//               value={form.description2}
//               onChange={handleFormChange}
//               placeholder="Description 2"
//               className="border p-2 rounded w-full"
//               rows={4}
//             />
//             <input
//               type="text"
//               name="experience"
//               value={form.experience}
//               onChange={handleFormChange}
//               placeholder="Experience"
//               className="border p-2 rounded w-full"
//             />
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 name="isActive"
//                 checked={form.isActive}
//                 onChange={handleFormChange}
//               />
//               Active
//             </label>
//           </div>

//           <div className="mt-4">
//             <label className="block mb-2 font-medium">Main Image</label>
//             <input type="file" accept="image/*" onChange={handleMainImageChange} />
//             {mainImagePreview && (
//               <img
//                 src={mainImagePreview}
//                 alt="Main Preview"
//                 className="mt-3 w-48 h-32 object-cover rounded border"
//               />
//             )}
//           </div>
//         </section>

//         <section className="bg-white p-4 rounded shadow">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold">Team Members</h2>
//             <button
//               type="button"
//               onClick={addMember}
//               className="bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Add Member
//             </button>
//           </div>

//           <div className="space-y-4">
//             {teamMembers.map((member, index) => (
//               <div key={index} className="border rounded p-4 space-y-3">
//                 <div className="grid md:grid-cols-3 gap-3">
//                   <input
//                     type="text"
//                     value={member.name || ""}
//                     onChange={(e) => handleMemberChange(index, "name", e.target.value)}
//                     placeholder="Name"
//                     className="border p-2 rounded w-full"
//                   />
//                   <input
//                     type="text"
//                     value={member.shortDetails || ""}
//                     onChange={(e) =>
//                       handleMemberChange(index, "shortDetails", e.target.value)
//                     }
//                     placeholder="Short Details"
//                     className="border p-2 rounded w-full"
//                   />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleMemberPhotoChange(index, e.target.files?.[0])}
//                     className="border p-2 rounded w-full"
//                   />
//                 </div>

//                 {(teamPreviews[index] || member.photo) && (
//                   <img
//                     src={teamPreviews[index] || member.photo}
//                     alt="Member Preview"
//                     className="w-32 h-32 object-cover rounded border"
//                   />
//                 )}

//                 <button
//                   type="button"
//                   onClick={() => removeMember(index)}
//                   className="bg-red-600 text-white px-3 py-2 rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="bg-white p-4 rounded shadow">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold">Gallery</h2>
//             <button
//               type="button"
//               onClick={addGalleryItem}
//               className="bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Add Gallery Item
//             </button>
//           </div>

//           <div className="space-y-4">
//             {gallery.map((item, index) => (
//               <div key={index} className="border rounded p-4 space-y-3">
//                 <div className="grid md:grid-cols-2 gap-3">
//                   <input
//                     type="text"
//                     value={item.title || ""}
//                     onChange={(e) => handleGalleryChange(index, "title", e.target.value)}
//                     placeholder="Gallery Title"
//                     className="border p-2 rounded w-full"
//                   />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleGalleryImageChange(index, e.target.files?.[0])}
//                     className="border p-2 rounded w-full"
//                   />
//                 </div>

//                 {(galleryPreviews[index] || item.image) && (
//                   <img
//                     src={galleryPreviews[index] || item.image}
//                     alt="Gallery Preview"
//                     className="w-48 h-32 object-cover rounded border"
//                   />
//                 )}

//                 <button
//                   type="button"
//                   onClick={() => removeGalleryItem(index)}
//                   className="bg-red-600 text-white px-3 py-2 rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>

//         <button
//           type="submit"
//           disabled={saving}
//           className="bg-green-600 text-white px-6 py-3 rounded disabled:opacity-50"
//         >
//           {saving ? "Saving..." : "Save About"}
//         </button>
//       </form>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import {
//   useGetAdminAboutQuery,
//   useSaveAboutMutation,
// } from "../redux/apis/aboutApi";

// const emptyMember = { name: "", shortDetails: "", photo: "" };
// const emptyGalleryItem = { title: "", image: "" };

// export default function AdminAbout() {
//   const { data, isLoading, isFetching } = useGetAdminAboutQuery();
//   const [saveAbout, { isLoading: saving }] = useSaveAboutMutation();

//   const [form, setForm] = useState({
//     headingSmall: "",
//     title: "",
//     description1: "",
//     description2: "",
//     experience: "",
//     isActive: true,
//   });

//   const [mainImage, setMainImage] = useState(null);
//   const [mainImagePreview, setMainImagePreview] = useState("");

//   const [teamMembers, setTeamMembers] = useState([emptyMember]);
//   const [teamPhotos, setTeamPhotos] = useState([]);
//   const [teamPreviews, setTeamPreviews] = useState([]);

//   const [gallery, setGallery] = useState([emptyGalleryItem]);
//   const [galleryImages, setGalleryImages] = useState([]);
//   const [galleryPreviews, setGalleryPreviews] = useState([]);

//   useEffect(() => {
//     if (!data) return;

//     setForm({
//       headingSmall: data.headingSmall || "",
//       title: data.title || "",
//       description1: data.description1 || "",
//       description2: data.description2 || "",
//       experience: data.experience || "",
//       isActive: data.isActive ?? true,
//     });

//     setTeamMembers(data.teamMembers?.length ? data.teamMembers : [emptyMember]);
//     setGallery(data.gallery?.length ? data.gallery : [emptyGalleryItem]);

//     setMainImage(null);
//     setMainImagePreview(data.image || "");
//     setTeamPhotos([]);
//     setGalleryImages([]);

//     setTeamPreviews(data.teamMembers?.map((m) => m.photo || "") || [""]);
//     setGalleryPreviews(data.gallery?.map((g) => g.image || "") || [""]);
//   }, [data]);

//   const handleFormChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleMainImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setMainImage(file);
//     setMainImagePreview(URL.createObjectURL(file));
//   };

//   const handleMemberChange = (index, field, value) => {
//     setTeamMembers((prev) => {
//       const updated = [...prev];
//       updated[index] = { ...updated[index], [field]: value };
//       return updated;
//     });
//   };

//   const handleMemberPhotoChange = (index, file) => {
//     if (!file) return;

//     setTeamPhotos((prev) => {
//       const updated = [...prev];
//       updated[index] = file;
//       return updated;
//     });

//     setTeamPreviews((prev) => {
//       const updated = [...prev];
//       updated[index] = URL.createObjectURL(file);
//       return updated;
//     });
//   };

//   const addMember = () => {
//     setTeamMembers((prev) => [...prev, { ...emptyMember }]);
//     setTeamPhotos((prev) => [...prev, null]);
//     setTeamPreviews((prev) => [...prev, ""]);
//   };

//   const removeMember = (index) => {
//     setTeamMembers((prev) => prev.filter((_, i) => i !== index));
//     setTeamPhotos((prev) => prev.filter((_, i) => i !== index));
//     setTeamPreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleGalleryChange = (index, field, value) => {
//     setGallery((prev) => {
//       const updated = [...prev];
//       updated[index] = { ...updated[index], [field]: value };
//       return updated;
//     });
//   };

//   const handleGalleryImageChange = (index, file) => {
//     if (!file) return;

//     setGalleryImages((prev) => {
//       const updated = [...prev];
//       updated[index] = file;
//       return updated;
//     });

//     setGalleryPreviews((prev) => {
//       const updated = [...prev];
//       updated[index] = URL.createObjectURL(file);
//       return updated;
//     });
//   };

//   const addGalleryItem = () => {
//     setGallery((prev) => [...prev, { ...emptyGalleryItem }]);
//     setGalleryImages((prev) => [...prev, null]);
//     setGalleryPreviews((prev) => [...prev, ""]);
//   };

//   const removeGalleryItem = (index) => {
//     setGallery((prev) => prev.filter((_, i) => i !== index));
//     setGalleryImages((prev) => prev.filter((_, i) => i !== index));
//     setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const fd = new FormData();

//       fd.append("headingSmall", form.headingSmall);
//       fd.append("title", form.title);
//       fd.append("description1", form.description1);
//       fd.append("description2", form.description2);
//       fd.append("experience", form.experience);
//       fd.append("isActive", String(form.isActive));

//       fd.append("teamMembers", JSON.stringify(teamMembers));
//       fd.append("gallery", JSON.stringify(gallery));

//       if (mainImage instanceof File) fd.append("image", mainImage);

//       teamPhotos.forEach((file) => {
//         if (file instanceof File) fd.append("teamPhotos", file);
//       });

//       galleryImages.forEach((file) => {
//         if (file instanceof File) fd.append("galleryImages", file);
//       });

//       console.log("FORM DATA:");
//       for (const pair of fd.entries()) {
//         console.log(pair[0], pair[1]);
//       }

//       await saveAbout(fd).unwrap();
//       alert("About saved successfully");
//     } catch (err) {
//       console.error("SAVE ABOUT ERROR:", err);
//       alert(err?.data?.message || "Failed to save about section");
//     }
//   };

//   if (isLoading || isFetching) {
//     return <div className="p-6">Loading...</div>;
//   }

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Admin About Page</h1>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         <section className="bg-white p-4 rounded shadow">
//           <h2 className="text-xl font-semibold mb-4">Main About Content</h2>

//           <div className="grid md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="headingSmall"
//               value={form.headingSmall}
//               onChange={handleFormChange}
//               placeholder="Heading Small"
//               className="border p-2 rounded w-full"
//             />
//             <input
//               type="text"
//               name="title"
//               value={form.title}
//               onChange={handleFormChange}
//               placeholder="Title"
//               className="border p-2 rounded w-full"
//             />
//             <textarea
//               name="description1"
//               value={form.description1}
//               onChange={handleFormChange}
//               placeholder="Description 1"
//               className="border p-2 rounded w-full"
//               rows={4}
//             />
//             <textarea
//               name="description2"
//               value={form.description2}
//               onChange={handleFormChange}
//               placeholder="Description 2"
//               className="border p-2 rounded w-full"
//               rows={4}
//             />
//             <input
//               type="text"
//               name="experience"
//               value={form.experience}
//               onChange={handleFormChange}
//               placeholder="Experience"
//               className="border p-2 rounded w-full"
//             />
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 name="isActive"
//                 checked={form.isActive}
//                 onChange={handleFormChange}
//               />
//               Active
//             </label>
//           </div>

//           <div className="mt-4">
//             <label className="block mb-2 font-medium">Main Image</label>
//             <input type="file" accept="image/*" onChange={handleMainImageChange} />
//             {mainImagePreview && (
//               <img
//                 src={mainImagePreview}
//                 alt="Main Preview"
//                 className="mt-3 w-48 h-32 object-cover rounded border"
//               />
//             )}
//           </div>
//         </section>

//         <section className="bg-white p-4 rounded shadow">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold">Team Members</h2>
//             <button
//               type="button"
//               onClick={addMember}
//               className="bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Add Member
//             </button>
//           </div>

//           <div className="space-y-4">
//             {teamMembers.map((member, index) => (
//               <div key={index} className="border rounded p-4 space-y-3">
//                 <div className="grid md:grid-cols-3 gap-3">
//                   <input
//                     type="text"
//                     value={member.name || ""}
//                     onChange={(e) => handleMemberChange(index, "name", e.target.value)}
//                     placeholder="Name"
//                     className="border p-2 rounded w-full"
//                   />
//                   <input
//                     type="text"
//                     value={member.shortDetails || ""}
//                     onChange={(e) =>
//                       handleMemberChange(index, "shortDetails", e.target.value)
//                     }
//                     placeholder="Short Details"
//                     className="border p-2 rounded w-full"
//                   />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleMemberPhotoChange(index, e.target.files?.[0])}
//                     className="border p-2 rounded w-full"
//                   />
//                 </div>

//                 {(teamPreviews[index] || member.photo) && (
//                   <img
//                     src={teamPreviews[index] || member.photo}
//                     alt="Member Preview"
//                     className="w-32 h-32 object-cover rounded border"
//                   />
//                 )}

//                 <button
//                   type="button"
//                   onClick={() => removeMember(index)}
//                   className="bg-red-600 text-white px-3 py-2 rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="bg-white p-4 rounded shadow">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold">Gallery</h2>
//             <button
//               type="button"
//               onClick={addGalleryItem}
//               className="bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Add Gallery Item
//             </button>
//           </div>

//           <div className="space-y-4">
//             {gallery.map((item, index) => (
//               <div key={index} className="border rounded p-4 space-y-3">
//                 <div className="grid md:grid-cols-2 gap-3">
//                   <input
//                     type="text"
//                     value={item.title || ""}
//                     onChange={(e) => handleGalleryChange(index, "title", e.target.value)}
//                     placeholder="Gallery Title"
//                     className="border p-2 rounded w-full"
//                   />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleGalleryImageChange(index, e.target.files?.[0])}
//                     className="border p-2 rounded w-full"
//                   />
//                 </div>

//                 {(galleryPreviews[index] || item.image) && (
//                   <img
//                     src={galleryPreviews[index] || item.image}
//                     alt="Gallery Preview"
//                     className="w-48 h-32 object-cover rounded border"
//                   />
//                 )}

//                 <button
//                   type="button"
//                   onClick={() => removeGalleryItem(index)}
//                   className="bg-red-600 text-white px-3 py-2 rounded"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>

//         <button
//           type="submit"
//           disabled={saving}
//           className="bg-green-600 text-white px-6 py-3 rounded disabled:opacity-50"
//         >
//           {saving ? "Saving..." : "Save About"}
//         </button>
//       </form>
//     </div>
//   );
// }
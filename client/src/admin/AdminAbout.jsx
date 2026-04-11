
// import React, { useEffect, useState } from "react";
// import {
//   useGetAdminAboutQuery,
//   useSaveAboutMutation,
// } from "../redux/apis/aboutApi";

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
//   const [members, setMembers] = useState([]);

//   /* LOAD DATA */
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

//       if (data.teamMembers) {
//         setMembers(
//           data.teamMembers.map((m) => ({
//             ...m,
//             photoFile: null,
//             photoPreview: m.photo || "",
//           }))
//         );
//       }
//     }
//   }, [data]);

//   /* INPUT CHANGE */
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({ ...form, [name]: type === "checkbox" ? checked : value });
//   };

//   /* ADD MEMBER */
//   const addMember = () => {
//     setMembers([
//       ...members,
//       { name: "", shortDetails: "", photoFile: null, photoPreview: "" },
//     ]);
//   };

//   /* DELETE MEMBER */
//   const removeMember = (index) => {
//     const copy = [...members];
//     copy.splice(index, 1);
//     setMembers(copy);
//   };

//   /* UPDATE MEMBER TEXT */
//   const updateMember = (i, field, value) => {
//     const copy = [...members];
//     copy[i][field] = value;
//     setMembers(copy);
//   };

//   /* IMAGE SELECT */
//   const handleMemberImage = (i, file) => {
//     const copy = [...members];
//     copy[i].photoFile = file;
//     copy[i].photoPreview = URL.createObjectURL(file);
//     setMembers(copy);
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const fd = new FormData();

//   Object.entries(form).forEach(([k, v]) => fd.append(k, v));

//   if (image) {
//     fd.append("image", image);
//   }

//   let membersData = [];

//   members.forEach((m) => {

//     membersData.push({
//       name: m.name,
//       shortDetails: m.shortDetails,

//       photo: m.photoFile ? "" : m.photoPreview
//     });

//     if (m.photoFile) {
//       fd.append("teamPhotos", m.photoFile);
//     }

//   });

//   fd.append("teamMembers", JSON.stringify(membersData));

//   await saveAbout(fd);

//   alert("Saved Successfully ✅");
// };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="max-w-5xl bg-white shadow rounded-xl p-8">

//       <h2 className="text-2xl font-bold mb-2">About Section</h2>
//       <p className="text-gray-500 mb-8">Manage About Page Content</p>

//       <form onSubmit={handleSubmit} className="space-y-6">

//         {/* HEADING */}
//         <input
//           name="headingSmall"
//           value={form.headingSmall}
//           onChange={handleChange}
//           placeholder="Small Heading"
//           className="w-full border px-4 py-3 rounded"
//         />

//         {/* TITLE */}
//         <input
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Title"
//           required
//           className="w-full border px-4 py-3 rounded"
//         />

//         {/* DESC 1 */}
//         <textarea
//           name="description1"
//           value={form.description1}
//           onChange={handleChange}
//           placeholder="Description 1"
//           required
//           className="w-full border px-4 py-3 rounded h-28"
//         />

//         {/* DESC 2 */}
//         <textarea
//           name="description2"
//           value={form.description2}
//           onChange={handleChange}
//           placeholder="Description 2"
//           className="w-full border px-4 py-3 rounded h-28"
//         />

//         {/* EXPERIENCE */}
//         <input
//           type="number"
//           name="experience"
//           value={form.experience}
//           onChange={handleChange}
//           placeholder="Years Experience"
//           className="w-full border px-4 py-3 rounded"
//         />

//         {/* MAIN IMAGE */}
//         <div>
//           <input type="file" onChange={(e) => setImage(e.target.files[0])} />

//           {data?.image && (
//             <img
//               src={data.image}
//               className="h-40 mt-3 rounded object-cover"
//             />
//           )}
//         </div>

//         {/* ACTIVE */}
//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             name="isActive"
//             checked={form.isActive}
//             onChange={handleChange}
//           />
//           Show Section
//         </label>

//         {/* TEAM */}
//         <div className="mt-12">
//           <h3 className="text-xl font-bold mb-4">Team Members</h3>

//           {members.map((m, i) => (
//             <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">

//               <div className="grid md:grid-cols-3 gap-4">

//                 <input
//                   value={m.name}
//                   placeholder="Name"
//                   onChange={(e)=>updateMember(i,"name",e.target.value)}
//                   className="border px-3 py-2 rounded"
//                 />

//                 <input
//                   value={m.shortDetails}
//                   placeholder="Short Details"
//                   onChange={(e)=>updateMember(i,"shortDetails",e.target.value)}
//                   className="border px-3 py-2 rounded"
//                 />

//                 {/* IMAGE UPLOAD */}
//                 <div>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e)=>handleMemberImage(i,e.target.files[0])}
//                   />

//                   {m.photoPreview && (
//                     <img
//                       src={m.photoPreview}
//                       className="h-16 mt-2 rounded object-cover"
//                     />
//                   )}
//                 </div>

//               </div>

//              <button
//   type="button"
//   onClick={()=>{
//     if(confirm("Are you sure you want to delete this member?")){
//       removeMember(i);
//     }
//   }}
//   className="mt-4 inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 hover:border-red-300 transition"
// >
//   🗑 Delete Member
// </button>

//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addMember}
//             className="bg-blue-600 text-white px-6 py-2 rounded"
//           >
//             + Add Member
//           </button>
//         </div>

//         {/* SAVE */}
//         <button
//           disabled={saving}
//           className="bg-red-500 text-white px-8 py-3 rounded"
//         >
//           {saving ? "Saving..." : "Save About"}
//         </button>

//       </form>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useGetAdminAboutQuery,
  useSaveAboutMutation,
  useAddTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} from "../redux/apis/aboutApi";

export default function AdminAbout() {
  const { data, isLoading, refetch } = useGetAdminAboutQuery();
  const [saveAbout, { isLoading: savingAbout }] = useSaveAboutMutation();
  const [addTeamMember, { isLoading: addingMember }] = useAddTeamMemberMutation();
  const [updateTeamMember, { isLoading: updatingMember }] = useUpdateTeamMemberMutation();
  const [deleteTeamMember, { isLoading: deletingMember }] = useDeleteTeamMemberMutation();

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

  const [newMember, setNewMember] = useState({ name: "", shortDetails: "" });
  const [newMemberPhoto, setNewMemberPhoto] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editMember, setEditMember] = useState({ name: "", shortDetails: "" });
  const [editPhoto, setEditPhoto] = useState(null);

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
      setMembers(data.teamMembers || []);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append("image", image);

    try {
      await saveAbout(fd).unwrap();
      toast.success("About updated successfully");
      setImage(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update about");
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();

    if (!newMember.name || !newMember.shortDetails || !newMemberPhoto) {
      toast.error("All member fields are required");
      return;
    }

    const fd = new FormData();
    fd.append("name", newMember.name);
    fd.append("shortDetails", newMember.shortDetails);
    fd.append("photo", newMemberPhoto);

    try {
      await addTeamMember(fd).unwrap();
      toast.success("Member added successfully");
      setNewMember({ name: "", shortDetails: "" });
      setNewMemberPhoto(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add member");
    }
  };

  const startEdit = (m) => {
    setEditId(m._id);
    setEditMember({
      name: m.name || "",
      shortDetails: m.shortDetails || "",
    });
    setEditPhoto(null);
  };

  const handleUpdateMember = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", editMember.name);
    fd.append("shortDetails", editMember.shortDetails);
    if (editPhoto) fd.append("photo", editPhoto);

    try {
      await updateTeamMember({ id: editId, data: fd }).unwrap();
      toast.success("Member updated successfully");
      setEditId(null);
      setEditMember({ name: "", shortDetails: "" });
      setEditPhoto(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update member");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    try {
      await deleteTeamMember(id).unwrap();
      toast.success("Member deleted successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete member");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl bg-white shadow rounded-xl p-8 mx-auto">
      <h2 className="text-2xl font-bold mb-2">About Section</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="headingSmall"
          value={form.headingSmall}
          onChange={handleChange}
          placeholder="Small Heading"
          className="w-full border px-4 py-3 rounded"
        />

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border px-4 py-3 rounded"
        />

        <textarea
          name="description1"
          value={form.description1}
          onChange={handleChange}
          placeholder="Description 1"
          className="w-full border px-4 py-3 rounded h-28"
        />

        <textarea
          name="description2"
          value={form.description2}
          onChange={handleChange}
          placeholder="Description 2"
          className="w-full border px-4 py-3 rounded h-28"
        />

        <input
          type="number"
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="Years Experience"
          className="w-full border px-4 py-3 rounded"
        />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Show Section
        </label>

        <button
          type="submit"
          disabled={savingAbout}
          className="bg-red-500 text-white px-8 py-3 rounded"
        >
          {savingAbout ? "Saving..." : "Save About"}
        </button>
      </form>

      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4">Add Team Member</h3>

        <form onSubmit={handleAddMember} className="space-y-4">
          <input
            value={newMember.name}
            onChange={(e) =>
              setNewMember((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Name"
            className="w-full border px-4 py-3 rounded"
          />

          <input
            value={newMember.shortDetails}
            onChange={(e) =>
              setNewMember((prev) => ({
                ...prev,
                shortDetails: e.target.value,
              }))
            }
            placeholder="Short Details"
            className="w-full border px-4 py-3 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewMemberPhoto(e.target.files[0])}
          />

          <button
            type="submit"
            disabled={addingMember}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            {addingMember ? "Adding..." : "Add Member"}
          </button>
        </form>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4">Team Members</h3>

        {members.length > 0 ? (
          members.map((m) => (
            <div key={m._id} className="border rounded-lg p-4 mb-4 bg-gray-50">
              {editId === m._id ? (
                <form onSubmit={handleUpdateMember} className="space-y-3">
                  <input
                    value={editMember.name}
                    onChange={(e) =>
                      setEditMember((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full border px-4 py-2 rounded"
                    placeholder="Name"
                  />

                  <input
                    value={editMember.shortDetails}
                    onChange={(e) =>
                      setEditMember((prev) => ({
                        ...prev,
                        shortDetails: e.target.value,
                      }))
                    }
                    className="w-full border px-4 py-2 rounded"
                    placeholder="Short Details"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditPhoto(e.target.files[0])}
                  />

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={updatingMember}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      {updatingMember ? "Updating..." : "Update"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditId(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="h-24 w-24 rounded object-cover mb-3"
                  />
                  <h4 className="font-semibold">{m.name}</h4>
                  <p className="text-gray-600">{m.shortDetails}</p>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => startEdit(m)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(m._id)}
                      disabled={deletingMember}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No team members found.</p>
        )}
      </div>
    </div>
  );
}
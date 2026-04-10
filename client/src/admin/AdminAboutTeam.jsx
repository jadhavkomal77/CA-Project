
// import { useState } from "react";
// import {
//   useAddAboutTeamMutation,
//   useDeleteAboutTeamMutation,
//   useGetAboutTeamQuery,
//   useUpdateAboutTeamMutation,
// } from "../redux/apis/aboutTeamApi";

// const AdminAboutTeam = () => {
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");

//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [editRole, setEditRole] = useState("");
//   const [editImage, setEditImage] = useState(null);
//   const [editPreview, setEditPreview] = useState("");

//   const [addAboutTeam, { isLoading: addLoading }] = useAddAboutTeamMutation();
//   const [updateAboutTeam, { isLoading: updateLoading }] = useUpdateAboutTeamMutation();
//   const [deleteAboutTeam] = useDeleteAboutTeamMutation();
//   const { data, isLoading: listLoading, refetch } = useGetAboutTeamQuery();

//   const members = data?.data || [];

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     if (file) setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !image) return;

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("role", role);
//     formData.append("img", image);

//     try {
//       await addAboutTeam(formData).unwrap();
//       setName("");
//       setRole("");
//       setImage(null);
//       setPreview("");
//       e.target.reset();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteAboutTeam(id).unwrap();
//       refetch();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const openEditModal = (item) => {
//     setSelectedMember(item);
//     setEditName(item.name || "");
//     setEditRole(item.role || "");
//     setEditImage(null);
//     setEditPreview("");
//     setIsEditOpen(true);
//   };

//   const handleEditImageChange = (e) => {
//     const file = e.target.files[0];
//     setEditImage(file);
//     if (file) setEditPreview(URL.createObjectURL(file));
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedMember) return;

//     const formData = new FormData();
//     formData.append("name", editName);
//     formData.append("role", editRole);

//     if (editImage) formData.append("img", editImage);

//     try {
//       await updateAboutTeam({
//         id: selectedMember._id,
//         data: formData,
//       }).unwrap();

//       setIsEditOpen(false);
//       setSelectedMember(null);
//       setEditName("");
//       setEditRole("");
//       setEditImage(null);
//       setEditPreview("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-slate-800">About Team</h1>
//           <p className="mt-1 text-slate-500">
//             Add, update and manage about team members from admin panel.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//           <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-1">
//             <h2 className="mb-5 text-xl font-semibold text-slate-800">
//               Add Member
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter name"
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-slate-700">
//                   Role <span className="text-slate-400">(optional)</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                   placeholder="Manager / Director / CEO"
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-slate-700">Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-700"
//                 />
//               </div>

//               {preview && (
//                 <div className="rounded-xl border border-dashed border-slate-300 p-3">
//                   <p className="mb-2 text-sm text-slate-500">Preview</p>
//                   <img src={preview} alt="preview" className="h-40 w-full rounded-xl object-cover" />
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={addLoading}
//                 className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
//               >
//                 {addLoading ? "Saving..." : "Add Member"}
//               </button>
//             </form>
//           </div>

//           <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-2">
//             <div className="mb-5 flex items-center justify-between">
//               <h2 className="text-xl font-semibold text-slate-800">All Members</h2>
//               <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
//                 {members.length} Members
//               </span>
//             </div>

//             {listLoading ? (
//               <div className="py-12 text-center text-slate-500">Loading...</div>
//             ) : members.length === 0 ? (
//               <div className="py-12 text-center text-slate-500">No members added yet.</div>
//             ) : (
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
//                 {members.map((item) => (
//                   <div
//                     key={item._id}
//                     className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:shadow-md"
//                   >
//                     <img
//                       src={item.img?.url}
//                       alt={item.name}
//                       className="h-56 w-full object-cover"
//                     />
//                     <div className="p-4">
//                       <h3 className="text-lg font-semibold text-slate-800">{item.name}</h3>
//                       <p className="mt-1 text-sm text-slate-500">
//                         {item.role || "No role added"}
//                       </p>

//                       <div className="mt-4 grid grid-cols-2 gap-3">
//                         <button
//                           onClick={() => openEditModal(item)}
//                           className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item._id)}
//                           className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//      {isEditOpen && selectedMember && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
//     <div className="w-full max-w-sm sm:max-w-md rounded-2xl bg-white p-4 sm:p-5 shadow-2xl md:max-w-lg">
//       <div className="mb-4 flex items-center justify-between">
//         <h2 className="text-lg font-semibold text-slate-800 sm:text-xl">
//           Update Member
//         </h2>
//         <button
//           onClick={() => setIsEditOpen(false)}
//           className="rounded-lg bg-slate-100 px-3 py-1 text-slate-600"
//         >
//           ✕
//         </button>
//       </div>

//       <form onSubmit={handleUpdateSubmit} className="space-y-4">
//         <div>
//           <label className="mb-2 block text-sm font-medium text-slate-700">
//             Name
//           </label>
//           <input
//             type="text"
//             value={editName}
//             onChange={(e) => setEditName(e.target.value)}
//             className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 sm:text-base"
//           />
//         </div>

//         <div>
//           <label className="mb-2 block text-sm font-medium text-slate-700">
//             Role <span className="text-slate-400">(optional)</span>
//           </label>
//           <input
//             type="text"
//             value={editRole}
//             onChange={(e) => setEditRole(e.target.value)}
//             className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 sm:text-base"
//           />
//         </div>

//         <div>
//           <label className="mb-2 block text-sm font-medium text-slate-700">
//             New Image
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleEditImageChange}
//             className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-white hover:file:bg-indigo-700 sm:px-4 sm:py-3"
//           />
//         </div>

//         {(editPreview || selectedMember?.img?.url) && (
//           <img
//             src={editPreview || selectedMember?.img?.url}
//             alt="preview"
//             className="h-40 w-full rounded-xl object-cover sm:h-44"
//           />
//         )}

//         <div className="flex flex-col gap-3 sm:flex-row">
//           <button
//             type="button"
//             onClick={() => setIsEditOpen(false)}
//             className="w-full rounded-xl bg-slate-200 px-4 py-3 text-sm font-medium text-slate-700 sm:w-1/2"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={updateLoading}
//             className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white disabled:opacity-70 sm:w-1/2"
//           >
//             {updateLoading ? "Updating..." : "Update"}
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}
//     </div>
//   );
// };

// export default AdminAboutTeam;




import { useState } from "react";
import { toast } from "react-toastify";
import {
  useAddAboutTeamMutation,
  useDeleteAboutTeamMutation,
  useGetAboutTeamQuery,
  useUpdateAboutTeamMutation,
} from "../redux/apis/aboutTeamApi";

const AdminAboutTeam = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editPreview, setEditPreview] = useState("");

  const [addAboutTeam, { isLoading: addLoading }] = useAddAboutTeamMutation();
  const [updateAboutTeam, { isLoading: updateLoading }] = useUpdateAboutTeamMutation();
  const [deleteAboutTeam] = useDeleteAboutTeamMutation();
  const { data, isLoading: listLoading, refetch } = useGetAboutTeamQuery();

  const members = data?.data || [];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) {
      toast.error("Name and image are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("img", image);

    try {
      await addAboutTeam(formData).unwrap();
      toast.success("Member added successfully");
      setName("");
      setRole("");
      setImage(null);
      setPreview("");
      e.target.reset();
    } catch (error) {
      toast.error(error?.data?.message || "Add failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAboutTeam(id).unwrap();
      toast.success("Member deleted successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Delete failed");
    }
  };

  const openEditModal = (item) => {
    setSelectedMember(item);
    setEditName(item.name || "");
    setEditRole(item.role || "");
    setEditImage(null);
    setEditPreview("");
    setIsEditOpen(true);
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setEditImage(file);
    if (file) setEditPreview(URL.createObjectURL(file));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember) return;

    const formData = new FormData();
    formData.append("name", editName);
    formData.append("role", editRole);
    if (editImage) formData.append("img", editImage);

    try {
      await updateAboutTeam({
        id: selectedMember._id,
        data: formData,
      }).unwrap();

      toast.success("Member updated successfully");
      setIsEditOpen(false);
      setSelectedMember(null);
      setEditName("");
      setEditRole("");
      setEditImage(null);
      setEditPreview("");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">About Team</h1>
          <p className="mt-1 text-slate-500">
            Add, update and manage about team members from admin panel.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-1">
            <h2 className="mb-5 text-xl font-semibold text-slate-800">Add Member</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Role <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Manager / Director / CEO"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-700"
                />
              </div>

              {preview && (
                <div className="rounded-xl border border-dashed border-slate-300 p-3">
                  <p className="mb-2 text-sm text-slate-500">Preview</p>
                  <img
                    src={preview}
                    alt="preview"
                    className="h-40 w-full rounded-xl object-cover"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={addLoading}
                className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {addLoading ? "Saving..." : "Add Member"}
              </button>
            </form>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">All Members</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                {members.length} Members
              </span>
            </div>

            {listLoading ? (
              <div className="py-12 text-center text-slate-500">Loading...</div>
            ) : members.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                No members added yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {members.map((item) => (
                  <div
                    key={item._id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:shadow-md"
                  >
                    <img
                      src={item.img?.url}
                      alt={item.name}
                      className="h-56 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.role || "No role added"}
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <button
                          onClick={() => openEditModal(item)}
                          className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditOpen && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-2xl sm:p-5 sm:max-w-md md:max-w-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800 sm:text-xl">
                Update Member
              </h2>
              <button
                onClick={() => setIsEditOpen(false)}
                className="rounded-lg bg-slate-100 px-3 py-1 text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 sm:text-base"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Role <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 sm:text-base"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  New Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageChange}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-white hover:file:bg-indigo-700 sm:px-4 sm:py-3"
                />
              </div>

              {(editPreview || selectedMember?.img?.url) && (
                <img
                  src={editPreview || selectedMember?.img?.url}
                  alt="preview"
                  className="h-40 w-full rounded-xl object-cover sm:h-44"
                />
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="w-full rounded-xl bg-slate-200 px-4 py-3 text-sm font-medium text-slate-700 sm:w-1/2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white disabled:opacity-70 sm:w-1/2"
                >
                  {updateLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAboutTeam;
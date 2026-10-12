
// import { useState } from "react";
// import { toast } from "react-toastify";

// import {

// useAddAboutTeamMutation,
// useDeleteAboutTeamMutation,
// useGetAboutTeamQuery,
// useUpdateAboutTeamMutation,

// } from "../redux/apis/aboutTeamApi";



// export default function AdminAboutTeam() {


// const [name,setName] = useState("");

// const [editId,setEditId] = useState(null);
// const [editName,setEditName] = useState("");


// const { data, refetch } = useGetAboutTeamQuery();

// const members = data?.data || [];


// const [addAboutTeam,{isLoading:addLoading}] =
// useAddAboutTeamMutation();

// const [updateAboutTeam] = useUpdateAboutTeamMutation();

// const [deleteAboutTeam] =
// useDeleteAboutTeamMutation();



// /* ADD */
// const handleSubmit = async (e) => {

// e.preventDefault();

// if(!name){

// toast.error("Name required");

// return;

// }

// await addAboutTeam({

// name

// });

// toast.success("Added");

// setName("");

// refetch();

// };



// /* DELETE */
// const handleDelete = async (id) => {

// if(!window.confirm("Delete name?")) return;

// await deleteAboutTeam(id);

// toast.success("Deleted");

// refetch();

// };



// /* EDIT OPEN */
// const openEdit = (item) => {

// setEditId(item._id);

// setEditName(item.name);

// };



// /* UPDATE */
// const handleUpdate = async (e) => {

// e.preventDefault();

// await updateAboutTeam({

// id: editId,

// data: {

// name: editName

// }

// });

// toast.success("Updated");

// setEditId(null);

// refetch();

// };



// return(

// <div className="min-h-screen bg-gray-50 py-10">


// <div className="max-w-4xl mx-auto px-4">

// <h1 className="text-2xl font-bold mb-6">

// Our Team Names

// </h1>


// <form
// onSubmit={handleSubmit}
// className="flex gap-3 mb-8"
// >

// <input

// placeholder="Enter Name"

// value={name}

// onChange={(e)=>setName(e.target.value)}

// className="border px-4 py-2 rounded w-full"

// />


// <button

// disabled={addLoading}

// className="bg-blue-600 text-white px-6 py-2 rounded"

// >

// Add

// </button>

// </form>


// <div className="bg-white rounded-xl shadow divide-y">

// {members.map((item)=>(

// <div
// key={item._id}
// className="flex justify-between items-center px-4 py-3"
// >

// {/* NAME */}
// {editId === item._id ? (

// <form
// onSubmit={handleUpdate}
// className="flex gap-2 w-full"
// >

// <input

// value={editName}

// onChange={(e)=>setEditName(e.target.value)}

// className="border px-3 py-1 rounded w-full"

// />


// <button className="text-green-600">

// Save

// </button>


// <button
// type="button"
// onClick={()=>setEditId(null)}
// className="text-gray-500"
// >

// Cancel

// </button>

// </form>

// ) : (

// <p className="font-medium">

// {item.name}

// </p>

// )}



// {/* ACTION */}
// {editId !== item._id && (

// <div className="flex gap-3">


// <button

// onClick={()=>openEdit(item)}

// className="text-blue-600 text-sm"

// >

// Edit

// </button>


// <button

// onClick={()=>handleDelete(item._id)}

// className="text-red-600 text-sm"

// >

// Delete

// </button>


// </div>

// )}


// </div>

// ))}


// </div>



// </div>

// </div>

// );

// }







import React, { useState } from "react";
import { useAddAboutTeamMutation, useDeleteAboutTeamMutation, useGetAboutTeamQuery, useUpdateAboutTeamMutation } from "../redux/apis/aboutTeamApi";


const AdminAboutTeam = () => {
  const { data: response, isLoading, isError } = useGetAboutTeamQuery();
  const [addAboutTeam, { isLoading: isAdding }] = useAddAboutTeamMutation();
  const [updateAboutTeam, { isLoading: isUpdating }] = useUpdateAboutTeamMutation();
  const [deleteAboutTeam] = useDeleteAboutTeamMutation();

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    columnIndex: 0,
    order: 0,
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  const members = response?.data || [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "columnIndex" || name === "order" ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ name: "", designation: "", columnIndex: 0, order: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      if (isEditing) {
        await updateAboutTeam({ id: currentId, ...formData }).unwrap();
        setMessage({ text: "Team member updated successfully!", type: "success" });
      } else {
        await addAboutTeam(formData).unwrap();
        setMessage({ text: "Team member added successfully!", type: "success" });
      }
      resetForm();
    } catch (err) {
      setMessage({
        text: err?.data?.message || "Something went wrong. Please try again.",
        type: "error",
      });
    }
  };

  const handleEditClick = (member) => {
    setIsEditing(true);
    setCurrentId(member._id);
    setFormData({
      name: member.name,
      designation: member.designation || "",
      columnIndex: member.columnIndex,
      order: member.order || 0,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        await deleteAboutTeam(id).unwrap();
        setMessage({ text: "Team member deleted successfully!", type: "success" });
      } catch (err) {
        setMessage({ text: "Failed to delete team member.", type: "error" });
      }
    }
  };

  if (isLoading) return <div className="p-8 text-center text-xl">Loading Admin Panel...</div>;
  if (isError) return <div className="p-8 text-center text-red-500">Error loading team management panel.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="border-t-4 border-[#2F80ED] pt-6 mb-8 bg-white shadow-md p-6 rounded-lg">
          <h1 className="text-3xl font-bold text-[#1D4ED8] mb-2">Manage Team Members</h1>
          <p className="text-gray-600">Add, update, or remove team members displayed on the About page.</p>
        </div>

        {/* Feedback Message */}
        {message.text && (
          <div
            className={`p-4 mb-6 rounded-md text-white font-medium ${
              message.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Add / Edit Form Card */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {isEditing ? "Edit Team Member" : "Add New Team Member"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name / Title</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="e.g. ADV. RAMESH BHUME SIR"
                className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-[#2F80ED] outline-none uppercase"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation / Subtitle</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="e.g. ADDITIONAL COMMISSIONER OF GST (Retd.)"
                className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-[#2F80ED] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Column Index (0, 1, or 2)</label>
              <select
                name="columnIndex"
                value={formData.columnIndex}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-[#2F80ED] outline-none bg-white"
              >
                <option value={0}>Column 1 (Left)</option>
                <option value={1}>Column 2 (Center)</option>
                <option value={2}>Column 3 (Right)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order (Sort Index)</label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-[#2F80ED] outline-none"
              />
            </div>

            <div className="md:col-span-2 flex items-center space-x-4">
              <button
                type="submit"
                disabled={isAdding || isUpdating}
                className="bg-[#2F80ED] text-white font-semibold px-6 py-2.5 rounded-md hover:bg-[#1d64c2] transition shadow"
              >
                {isEditing ? "Update Member" : "Add Member"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-400 text-white font-semibold px-6 py-2.5 rounded-md hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Existing Team List Table */}
        <div className="bg-white shadow-md rounded-lg p-6 overflow-hidden border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Current Team Roster</h2>
          {members.length === 0 ? (
            <p className="text-gray-500 py-4">No team members found. Add some above!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                    <th className="p-3">Column</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Designation</th>
                    <th className="p-3">Order</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {members.map((member) => (
                    <tr key={member._id} className="hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-600">Column {member.columnIndex + 1}</td>
                      <td className="p-3 font-bold text-[#1D4ED8] uppercase">{member.name}</td>
                      <td className="p-3 text-gray-600">{member.designation || "—"}</td>
                      <td className="p-3 text-gray-500">{member.order}</td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleEditClick(member)}
                          className="bg-amber-500 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-amber-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="bg-red-500 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAboutTeam;
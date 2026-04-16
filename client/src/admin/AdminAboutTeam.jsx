
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import {
//   useAddAboutTeamMutation,
//   useDeleteAboutTeamMutation,
//   useGetAboutTeamQuery,
//   useUpdateAboutTeamMutation,
// } from "../redux/apis/aboutTeamApi";

// export default function AdminAboutTeam(){

// const [name,setName] = useState("");
// const [role,setRole] = useState("");
// const [image,setImage] = useState(null);
// const [preview,setPreview] = useState("");

// const [isEditOpen,setIsEditOpen] = useState(false);
// const [selectedMember,setSelectedMember] = useState(null);

// const [editName,setEditName] = useState("");
// const [editRole,setEditRole] = useState("");
// const [editImage,setEditImage] = useState(null);
// const [editPreview,setEditPreview] = useState("");

// const {data,refetch} = useGetAboutTeamQuery();

// const members = data?.data || [];



// useEffect(()=>{

// return ()=>{

// if(preview) URL.revokeObjectURL(preview);

// if(editPreview) URL.revokeObjectURL(editPreview);

// };

// },[preview,editPreview]);



// const handleImageChange = e=>{

// const file = e.target.files[0];

// setImage(file);

// if(file){

// setPreview(URL.createObjectURL(file));

// }

// };



// const handleSubmit = async e=>{

// e.preventDefault();

// if(!name || !image){

// toast.error("Name and image required");

// return;

// }

// const fd = new FormData();

// fd.append("name",name);
// fd.append("role",role);
// fd.append("img",image);

// await addAboutTeam(fd);

// toast.success("Member added");

// setName("");
// setRole("");
// setImage(null);
// setPreview("");

// refetch();

// };



// const handleDelete = async id=>{

// if(!window.confirm("Delete member?")) return;

// await deleteAboutTeam(id);

// toast.success("Deleted");

// refetch();

// };



// const openEditModal = item=>{

// setSelectedMember(item);

// setEditName(item.name);
// setEditRole(item.role);

// setEditPreview(item.img?.url);

// setIsEditOpen(true);

// };



// const handleEditImageChange = e=>{

// const file = e.target.files[0];

// setEditImage(file);

// if(file){

// setEditPreview(URL.createObjectURL(file));

// }

// };



// const handleUpdateSubmit = async e=>{

// e.preventDefault();

// const fd = new FormData();

// fd.append("name",editName);
// fd.append("role",editRole);

// if(editImage){

// fd.append("img",editImage);

// }

// await updateAboutTeam({

// id:selectedMember._id,
// data:fd

// });

// toast.success("Updated");

// setIsEditOpen(false);

// refetch();

// };



// return(

// <div className="min-h-screen bg-gray-50 py-8">

// <div className="max-w-7xl mx-auto px-4 sm:px-6">

// {/* HEADER */}
// <div className="mb-8 text-center sm:text-left">

// <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
// Team Members
// </h1>

// <p className="text-gray-500 text-sm sm:text-base">
// Manage about page team members
// </p>

// </div>



// {/* ADD FORM */}
// <div className="bg-white rounded-2xl shadow p-4 sm:p-6 mb-10">

// <h2 className="text-lg font-semibold mb-4">
// Add Member
// </h2>

// <form
// onSubmit={handleSubmit}
// className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
// >

// <input
// placeholder="Name"
// value={name}
// onChange={e=>setName(e.target.value)}
// className="border rounded-lg px-4 py-3 w-full"
// />

// <input
// placeholder="Role"
// value={role}
// onChange={e=>setRole(e.target.value)}
// className="border rounded-lg px-4 py-3 w-full"
// />

// <input
// type="file"
// onChange={handleImageChange}
// className="border rounded-lg px-3 py-2 w-full"
// />

// <button
// disabled={addLoading}
// className="bg-blue-600 text-white rounded-lg py-3 font-semibold w-full"
// >

// {addLoading ? "Saving..." : "Add"}

// </button>

// </form>



// {preview && (

// <img
// src={preview}
// className="mt-4 h-40 w-full sm:w-60 object-cover rounded-xl"
// />

// )}

// </div>



// {/* CARDS */}
// <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

// {members.map(item=>(

// <div
// key={item._id}
// className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
// >

// <img
// src={item.img?.url}
// className="h-48 sm:h-56 w-full object-cover"
// />

// <div className="p-4 text-center">

// <h3 className="font-semibold text-base sm:text-lg">
// {item.name}
// </h3>

// <p className="text-gray-500 text-sm">
// {item.role}
// </p>



// <div className="flex gap-2 mt-4">

// <button
// onClick={()=>openEditModal(item)}
// className="flex-1 bg-yellow-500 text-white py-2 rounded-lg text-sm"
// >
// Edit
// </button>

// <button
// onClick={()=>handleDelete(item._id)}
// className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm"
// >
// Delete
// </button>

// </div>

// </div>

// </div>

// ))}

// </div>

// </div>



// {/* MODAL */}
// {isEditOpen && (

// <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">

// <div className="bg-white rounded-2xl p-5 w-full max-w-md">

// <h2 className="font-semibold mb-4 text-lg">
// Edit Member
// </h2>

// <form
// onSubmit={handleUpdateSubmit}
// className="space-y-4"
// >

// <input
// value={editName}
// onChange={e=>setEditName(e.target.value)}
// className="border rounded-lg px-4 py-3 w-full"
// />

// <input
// value={editRole}
// onChange={e=>setEditRole(e.target.value)}
// className="border rounded-lg px-4 py-3 w-full"
// />

// <input
// type="file"
// onChange={handleEditImageChange}
// />



// {editPreview && (

// <img
// src={editPreview}
// className="h-40 w-full object-cover rounded"
// />

// )}



// <div className="flex gap-3">

// <button
// type="button"
// onClick={()=>setIsEditOpen(false)}
// className="flex-1 bg-gray-300 py-3 rounded-lg"
// >
// Cancel
// </button>

// <button
// className="flex-1 bg-blue-600 text-white py-3 rounded-lg"
// >
// Update
// </button>

// </div>

// </form>

// </div>

// </div>

// )}

// </div>

// );

// }




import { useState } from "react";
import { toast } from "react-toastify";

import {

useAddAboutTeamMutation,
useDeleteAboutTeamMutation,
useGetAboutTeamQuery,
useUpdateAboutTeamMutation,

} from "../redux/apis/aboutTeamApi";



export default function AdminAboutTeam() {


const [name,setName] = useState("");

const [editId,setEditId] = useState(null);
const [editName,setEditName] = useState("");


const { data, refetch } = useGetAboutTeamQuery();

const members = data?.data || [];


const [addAboutTeam,{isLoading:addLoading}] =
useAddAboutTeamMutation();

const [updateAboutTeam] = useUpdateAboutTeamMutation();

const [deleteAboutTeam] =
useDeleteAboutTeamMutation();



/* ADD */
const handleSubmit = async (e) => {

e.preventDefault();

if(!name){

toast.error("Name required");

return;

}

await addAboutTeam({

name

});

toast.success("Added");

setName("");

refetch();

};



/* DELETE */
const handleDelete = async (id) => {

if(!window.confirm("Delete name?")) return;

await deleteAboutTeam(id);

toast.success("Deleted");

refetch();

};



/* EDIT OPEN */
const openEdit = (item) => {

setEditId(item._id);

setEditName(item.name);

};



/* UPDATE */
const handleUpdate = async (e) => {

e.preventDefault();

await updateAboutTeam({

id: editId,

data: {

name: editName

}

});

toast.success("Updated");

setEditId(null);

refetch();

};



return(

<div className="min-h-screen bg-gray-50 py-10">


<div className="max-w-4xl mx-auto px-4">


{/* TITLE */}
<h1 className="text-2xl font-bold mb-6">

Our Team Names

</h1>



{/* ADD FORM */}
<form
onSubmit={handleSubmit}
className="flex gap-3 mb-8"
>

<input

placeholder="Enter Name"

value={name}

onChange={(e)=>setName(e.target.value)}

className="border px-4 py-2 rounded w-full"

/>


<button

disabled={addLoading}

className="bg-blue-600 text-white px-6 py-2 rounded"

>

Add

</button>

</form>



{/* LIST */}
<div className="bg-white rounded-xl shadow divide-y">

{members.map((item)=>(

<div
key={item._id}
className="flex justify-between items-center px-4 py-3"
>


{/* NAME */}
{editId === item._id ? (

<form
onSubmit={handleUpdate}
className="flex gap-2 w-full"
>

<input

value={editName}

onChange={(e)=>setEditName(e.target.value)}

className="border px-3 py-1 rounded w-full"

/>


<button className="text-green-600">

Save

</button>


<button
type="button"
onClick={()=>setEditId(null)}
className="text-gray-500"
>

Cancel

</button>

</form>

) : (

<p className="font-medium">

{item.name}

</p>

)}



{/* ACTION */}
{editId !== item._id && (

<div className="flex gap-3">


<button

onClick={()=>openEdit(item)}

className="text-blue-600 text-sm"

>

Edit

</button>


<button

onClick={()=>handleDelete(item._id)}

className="text-red-600 text-sm"

>

Delete

</button>


</div>

)}


</div>

))}


</div>



</div>

</div>

);

}
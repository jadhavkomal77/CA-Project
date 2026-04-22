
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
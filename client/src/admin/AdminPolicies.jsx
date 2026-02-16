// import { useState } from "react";
// import AdminPolicyEditor from "./AdminPolicyEditor";
// import { useGetPoliciesQuery } from "../redux/apis/policyApi";

// export default function AdminPolicies(){

//   const {data} = useGetPoliciesQuery();
//   const [selected,setSelected] = useState(null);

//   return(
//     <div className="flex">

//       {/* LEFT LIST */}
//       <div className="w-1/3 border-r p-4">
//         {data?.map(item=>(
//           <div
//             key={item._id}
//             onClick={()=>setSelected(item)}
//             className="cursor-pointer p-2 border mb-2"
//           >
//             {item.title}
//           </div>
//         ))}
//       </div>

//       {/* RIGHT EDITOR */}
//       <div className="w-2/3">
//         <AdminPolicyEditor selected={selected}/>
//       </div>

//     </div>
//   )
// }


import React from 'react'

const AdminPolicies = () => {
  return (
    <div>AdminPolicies</div>
  )
}

export default AdminPolicies


// import { Phone, ChevronDown, Menu, X } from "lucide-react";
// import { useGetPublicNavbarQuery } from "../redux/apis/navbarApi";
// import { useGetPublicServicesQuery } from "../redux/apis/serviceApi";
// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// export default function PublicNavbar() {
//   const { data, isLoading } = useGetPublicNavbarQuery();
//   const { data: services, isLoading: servicesLoading } =
//     useGetPublicServicesQuery();

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [open, setOpen] = useState(false);
//   const timeoutRef = useRef(null);
//   const navigate = useNavigate();

//   if (isLoading || servicesLoading || !data) return null;

//   const handleOpen = () => {
//     clearTimeout(timeoutRef.current);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     timeoutRef.current = setTimeout(() => {
//       setOpen(false);
//     }, 150);
//   };

//   const handleNavigate = (link) => {
//     navigate(link);
//     setMobileOpen(false);
//     setOpen(false);
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 md:px-6">
//         <div className="flex items-center justify-between h-[90px] md:h-[85px]">

//           {/* ================= LOGO ================= */}
//           <div
//             className="flex flex-col items-center md:items-start cursor-pointer"
//             onClick={() => navigate("/")}
//           >
//             <div
//               className="flex items-center"
//               style={{
//                 filter:
//                   "drop-shadow(0 3px 8px rgba(0,0,0,0.12)) drop-shadow(0 6px 18px rgba(0,0,0,0.06))",
//               }}
//             >
//               {["C", "A", "D", "M", "A"].map((l, i) => {
//                 const whiteBlock = i < 2;

//                 return (
//                   <div
//                     key={i}
//                     className="relative"
//                     style={{
//                       width: "52px",
//                       height: "52px",
//                       marginLeft: i > 0 ? "-1px" : "0",
//                     }}
//                   >
//                     <div
//                       className="absolute inset-0"
//                       style={{
//                         background: whiteBlock
//                           ? "linear-gradient(160deg, #ffffff 0%, #f7f7f7 40%, #ececec 100%)"
//                           : "linear-gradient(160deg, #1e3a8a 0%, #1e40af 45%, #2563eb 70%, #1e3a8a 100%)",
//                         border: whiteBlock
//                           ? "1px solid rgba(0,0,0,0.06)"
//                           : "1px solid rgba(0,0,0,0.25)",
//                         borderRadius:
//                           i === 0
//                             ? "8px 0 0 8px"
//                             : i === 4
//                             ? "0 8px 8px 0"
//                             : "0",
//                         boxShadow: `
//                           inset 0 2px 4px rgba(255,255,255,0.7),
//                           inset 0 -3px 6px rgba(0,0,0,0.15),
//                           0 4px 8px rgba(0,0,0,0.08)
//                         `,
//                       }}
//                     />

//                     <div
//                       className="absolute inset-0 flex items-center justify-center"
//                       style={{
//                         fontSize: "26px",
//                         fontWeight: "900",
//                         letterSpacing: "-1px",
//                         fontFamily: "Inter, system-ui, sans-serif",
//                         color: whiteBlock ? "#1e40af" : "#ffffff",
//                       }}
//                     >
//                       {l}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Tagline */}
//            <div className="mt-2 w-full flex justify-center md:justify-start">
//   <p className="text-blue-700 text-[11px] md:text-[13px] font-semibold tracking-[1px] leading-tight">
//     PROFESSIONAL | TRUSTED | RELIABLE
//   </p>
// </div>

//           </div>

//           {/* ================= DESKTOP MENU ================= */}
//           <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
//             {data.menu.map((item, index) => {
//               if (item.label === "Services") {
//                 return (
//                   <div
//                     key={index}
//                     className="relative"
//                     onMouseEnter={handleOpen}
//                     onMouseLeave={handleClose}
//                   >
//                     <button className="flex items-center gap-1 hover:text-blue-700 transition">
//                       {item.label} <ChevronDown size={14} />
//                     </button>

//                     {open && services?.length > 0 && (
//                       <div className="absolute left-0 top-full mt-3 bg-white rounded-lg shadow-lg w-60 py-2">
//                         {services.map((service) => (
//                           <button
//                             key={service._id}
//                             onClick={() =>
//                               handleNavigate(`/services/${service.slug}`)
//                             }
//                             className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-blue-700"
//                           >
//                             {service.title}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 );
//               }

//               return (
//                 <button
//                   key={index}
//                   onClick={() => handleNavigate(item.link)}
//                   className="hover:text-blue-700 transition"
//                 >
//                   {item.label}
//                 </button>
//               );
//             })}
//           </nav>

//           {/* ================= RIGHT SIDE ================= */}
//           <div className="hidden md:flex items-center gap-6">
//             <div className="flex items-center gap-2 text-gray-700 text-sm">
//               <div className="bg-blue-100 p-2 rounded-full">
//                 <Phone size={16} className="text-blue-700" />
//               </div>
//               <span>{data.phone}</span>
//             </div>

//             <button
//               onClick={() => handleNavigate("/contact")}
//               className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:opacity-90 transition"
//             >
//               Get Consultation
//             </button>
//           </div>

//           {/* ================= MOBILE BUTTON ================= */}
//           <button
//             className="md:hidden"
//             onClick={() => setMobileOpen(!mobileOpen)}
//           >
//             {mobileOpen ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </div>
//       </div>

//       {/* ================= MOBILE MENU ================= */}
//       {mobileOpen && (
//         <div className="md:hidden bg-white px-6 py-5 space-y-4 shadow-md">
//           {data.menu.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => handleNavigate(item.link)}
//               className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm"
//             >
//               {item.label}
//             </button>
//           ))}

//           <div className="flex items-center gap-2 pt-3 text-blue-700 text-sm">
//             <Phone size={16} />
//             <span>{data.phone}</span>
//           </div>

//           <button
//             onClick={() => handleNavigate("/contact")}
//             className="w-full mt-4 bg-blue-700 text-white py-3 rounded-full text-sm font-semibold"
//           >
//             Get Consultation
//           </button>
//         </div>
//       )}
//     </header>
//   );
// }





import { Phone, ChevronDown, Menu, X } from "lucide-react";
import { useGetPublicNavbarQuery } from "../redux/apis/navbarApi";
import { useGetPublicServicesQuery } from "../redux/apis/serviceApi";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PublicNavbar() {
  const { data, isLoading } = useGetPublicNavbarQuery();
  const { data: services, isLoading: servicesLoading } =
    useGetPublicServicesQuery();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openResources, setOpenResources] = useState(false);

  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  if (isLoading || servicesLoading) return null;

  /* ---------- FALLBACK MENU ---------- */
  const defaultMenu = [
    { label: "About", link: "/about" },
    { label: "Services", link: "#" },
    { label: "Case Studies", link: "/casestudies" },
    { label: "Resources", link: "#" },
    { label: "Contact", link: "/contact" },
  ];

  const menu = data?.menu?.length ? data.menu : defaultMenu;

  /* ---------- HELPERS ---------- */

  const openMenu = (setter) => {
    clearTimeout(timeoutRef.current);
    setter(true);
  };

  const closeMenu = (setter) => {
    timeoutRef.current = setTimeout(() => setter(false), 150);
  };

  const handleNavigate = (link) => {
    if (link !== "#") navigate(link);
    setMobileOpen(false);
    setOpenServices(false);
    setOpenResources(false);
  };

  /* ---------- RESOURCES LINKS ---------- */

  const resourcesLinks = [
    { label: "FAQ", link: "/faq" },
    { label: "Calculators", link: "/calculators" },
  ];

  /* ================================================= */

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-[90px] md:h-[85px]">

          {/* LOGO */}
          <div
            className="flex flex-col items-center md:items-start cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex">
              {["C","A","D","M","A"].map((l,i)=>{
                const white = i<2;
                return(
                  <div
                    key={i}
                    className="relative"
                    style={{width:"52px",height:"52px",marginLeft:i?"-1px":"0"}}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background:white
                          ?"linear-gradient(160deg,#fff,#ececec)"
                          :"linear-gradient(160deg,#1e3a8a,#2563eb,#1e3a8a)",
                        border:white
                          ?"1px solid rgba(0,0,0,0.06)"
                          :"1px solid rgba(0,0,0,0.25)",
                        borderRadius:
                          i===0?"8px 0 0 8px":
                          i===4?"0 8px 8px 0":"0"
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center font-black text-[26px]"
                      style={{color:white?"#1e40af":"#fff"}}
                    >
                      {l}
                    </div>
                  </div>
                )
              })}
            </div>

            <p className="text-blue-700 text-[11px] md:text-[13px] font-semibold mt-2">
              PROFESSIONAL | TRUSTED | RELIABLE
            </p>
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">

            {menu.map((item,index)=>{

              /* ---------- SERVICES ---------- */
              if(item.label==="Services"){
                return(
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={()=>openMenu(setOpenServices)}
                    onMouseLeave={()=>closeMenu(setOpenServices)}
                  >
                    <button className="flex items-center gap-1 hover:text-blue-700">
                      Services <ChevronDown size={14}/>
                    </button>

                    {openServices && services?.length>0 && (
                      <div className="absolute left-0 top-full mt-3 bg-white rounded-xl shadow-xl w-64 py-2">
                        {services.map(s=>(
                          <button
                            key={s._id}
                            onClick={()=>handleNavigate(`/services/${s.slug}`)}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-blue-700"
                          >
                            {s.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              /* ---------- RESOURCES ---------- */
              if(item.label==="Resources"){
                return(
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={()=>openMenu(setOpenResources)}
                    onMouseLeave={()=>closeMenu(setOpenResources)}
                  >
                    <button className="flex items-center gap-1 hover:text-blue-700">
                      Resources <ChevronDown size={14}/>
                    </button>

                    {openResources && (
                      <div className="absolute left-0 top-full mt-3 bg-white rounded-xl shadow-xl w-56 py-2">
                        {resourcesLinks.map((r,i)=>(
                          <button
                            key={i}
                            onClick={()=>handleNavigate(r.link)}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-blue-700"
                          >
                            {r.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              /* ---------- NORMAL LINK ---------- */
              return(
                <button
                  key={index}
                  onClick={()=>handleNavigate(item.link)}
                  className="hover:text-blue-700"
                >
                  {item.label}
                </button>
              )

            })}

          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <div className="bg-blue-100 p-2 rounded-full">
                <Phone size={16} className="text-blue-700"/>
              </div>
              {data?.phone}
            </div>

            <button
              onClick={()=>handleNavigate("/contact")}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:opacity-90"
            >
              Get Consultation
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button className="md:hidden" onClick={()=>setMobileOpen(!mobileOpen)}>
            {mobileOpen?<X size={26}/>:<Menu size={26}/>}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white px-6 py-5 space-y-3 shadow-md">

          {menu.map((item,index)=>(
            <button
              key={index}
              onClick={()=>handleNavigate(item.link)}
              className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm"
            >
              {item.label}
            </button>
          ))}

          <div className="border-t pt-3 space-y-2">
            {resourcesLinks.map((r,i)=>(
              <button
                key={i}
                onClick={()=>handleNavigate(r.link)}
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm"
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-3 text-blue-700 text-sm">
            <Phone size={16}/>
            {data?.phone}
          </div>
        </div>
      )}
    </header>
  );
}

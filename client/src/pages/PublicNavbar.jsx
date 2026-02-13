// import { Phone, ChevronDown, Menu, X } from "lucide-react";
// import { useGetPublicNavbarQuery } from "../redux/apis/navbarApi";
// import { useGetPublicServicesQuery } from "../redux/apis/serviceApi";
// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// export default function PublicNavbar() {
//   const { data, isLoading } = useGetPublicNavbarQuery();
//   const { data: services, isLoading: servicesLoading } =
//     useGetPublicServicesQuery();

//   const [open, setOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
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
//     <header className="sticky top-0 z-50 bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between h-20">

//           {/* ================= LOGO ================= */}
//           <div
//             className="flex items-center gap-4 cursor-pointer"
//             onClick={() => navigate("/")}
//           >
//             {data.logoImage && (
//               <img
//                 src={data.logoImage}
//                 alt="CADMA Logo"
//                 className="h-16 md:h-20 w-auto object-contain"
//               />
//             )}

//             <div className="flex flex-col leading-tight">
//               <span className="text-base md:text-lg font-bold text-gray-900 tracking-wide">
//                 CHARTERED
//               </span>
//               <span className="text-[11px] md:text-xs text-yellow-600 tracking-[2px] uppercase font-medium">
//                 ACCOUNTANT SERVICES
//               </span>
//             </div>
//           </div>

//           {/* ================= DESKTOP NAV ================= */}
//           <nav className="hidden md:flex items-center gap-8 relative">
//             {data.menu.map((item, index) => {
//               if (item.label === "Services") {
//                 return (
//                   <div
//                     key={index}
//                     className="relative"
//                     onMouseEnter={handleOpen}
//                     onMouseLeave={handleClose}
//                   >
//                     <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-yellow-600 transition">
//                       Services <ChevronDown size={14} />
//                     </button>

//                     {open && services?.length > 0 && (
//                       <div className="absolute left-0 top-full mt-3 bg-white rounded-xl shadow-xl w-64 py-3">
//                         {services.map((service) => (
//                           <button
//                             key={service._id}
//                             onClick={() =>
//                               handleNavigate(`/services/${service.slug}`)
//                             }
//                             className="block w-full text-left px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600 transition"
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
//                   className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition"
//                 >
//                   {item.label}
//                 </button>
//               );
//             })}
//           </nav>

//           {/* ================= RIGHT SIDE ================= */}
//           <div className="hidden md:flex items-center gap-6">
//             <div className="flex items-center gap-2 text-gray-700 text-sm">
//               <Phone size={16} className="text-yellow-600" />
//               <span>{data.phone}</span>
//             </div>

//             <button
//               onClick={() => navigate("/contact")}
//               className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition shadow-sm"
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
//           {data.menu.map((item, index) => {
//             if (item.label === "Services") {
//               return (
//                 <div key={index}>
//                   <p className="font-semibold mb-2 text-gray-800 text-sm">
//                     Services
//                   </p>
//                   {services?.map((service) => (
//                     <button
//                       key={service._id}
//                       onClick={() =>
//                         handleNavigate(`/services/${service.slug}`)
//                       }
//                       className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm"
//                     >
//                       {service.title}
//                     </button>
//                   ))}
//                 </div>
//               );
//             }

//             return (
//               <button
//                 key={index}
//                 onClick={() => handleNavigate(item.link)}
//                 className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm"
//               >
//                 {item.label}
//               </button>
//             );
//           })}

//           <div className="flex items-center gap-2 pt-3 text-yellow-600 text-sm">
//             <Phone size={16} />
//             <span>{data.phone}</span>
//           </div>

//           <button
//             onClick={() => handleNavigate("/contact")}
//             className="w-full mt-4 bg-yellow-600 text-white py-3 rounded-full text-sm font-semibold"
//           >
//             Get Consultation
//           </button>
//         </div>
//       )}
//     </header>
//   );
// }



// import { Phone, ChevronDown, Menu, X } from "lucide-react";
// import { useGetPublicNavbarQuery } from "../redux/apis/navbarApi";
// import { useGetPublicServicesQuery } from "../redux/apis/serviceApi";
// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// export default function PublicNavbar() {
//   const { data, isLoading } = useGetPublicNavbarQuery();
//   const { data: services, isLoading: servicesLoading } =
//     useGetPublicServicesQuery();

//   const [open, setOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
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
//     <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between h-20">

//           {/* ================= PERFECT CADMA LOGO ================= */}
//           <div
//             className="flex flex-col justify-center cursor-pointer"
//             onClick={() => navigate("/")}
//           >
//             {/* Block Logo */}
//             <div className="flex rounded overflow-hidden shadow-md">

//               {["C","A","D","M","A"].map((l, i) => (
//                 <div
//                   key={i}
//                   className={`
//                     w-12 h-12 md:w-14 md:h-14
//                     flex items-center justify-center
//                     text-xl md:text-2xl font-extrabold
//                     border border-gray-300
//                     ${i < 2
//                       ? "bg-gradient-to-b from-white to-gray-200 text-blue-700"
//                       : "bg-gradient-to-b from-blue-600 to-blue-900 text-white"}
//                   `}
//                   style={{
//                     boxShadow: "inset 0 1px 4px rgba(0,0,0,0.15)"
//                   }}
//                 >
//                   {l}
//                 </div>
//               ))}

//             </div>

//             {/* Tagline */}
//             <div className="mt-1 tracking-[2px] text-blue-700 text-[11px] md:text-xs font-medium">
//               PROFESSIONAL | TRUSTED | RELIABLE
//             </div>
//           </div>

//           {/* ================= DESKTOP NAV ================= */}
//           <nav className="hidden md:flex items-center gap-8 relative">
//             {data.menu.map((item, index) => {
//               if (item.label === "Services") {
//                 return (
//                   <div
//                     key={index}
//                     className="relative"
//                     onMouseEnter={handleOpen}
//                     onMouseLeave={handleClose}
//                   >
//                     <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-700 transition">
//                       Services <ChevronDown size={14} />
//                     </button>

//                     {open && services?.length > 0 && (
//                       <div className="absolute left-0 top-full mt-3 bg-white rounded-lg shadow-lg w-60 py-2">
//                         {services.map((service) => (
//                           <button
//                             key={service._id}
//                             onClick={() =>
//                               handleNavigate(`/services/${service.slug}`)
//                             }
//                             className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition"
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
//                   className="text-sm font-medium text-gray-700 hover:text-blue-700 transition"
//                 >
//                   {item.label}
//                 </button>
//               );
//             })}
//           </nav>

//           {/* ================= RIGHT SIDE ================= */}
//           <div className="hidden md:flex items-center gap-6">
//             <div className="flex items-center gap-2 text-gray-700 text-sm">
//               <Phone size={16} className="text-blue-700" />
//               <span>{data.phone}</span>
//             </div>

//             <button
//               onClick={() => navigate("/contact")}
//               className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-full text-sm font-semibold transition"
//             >
//               Get Consultation
//             </button>
//           </div>

//           {/* ================= MOBILE BUTTON ================= */}
//           <button
//             className="md:hidden"
//             onClick={() => setMobileOpen(!mobileOpen)}
//           >
//             {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  if (isLoading || servicesLoading || !data) return null;

  const handleOpen = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleClose = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  const handleNavigate = (link) => {
    navigate(link);
    setMobileOpen(false);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-[90px] md:h-[85px]">

          {/* ================= LOGO ================= */}
          <div
            className="flex flex-col items-center md:items-start cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div
              className="flex items-center"
              style={{
                filter:
                  "drop-shadow(0 3px 8px rgba(0,0,0,0.12)) drop-shadow(0 6px 18px rgba(0,0,0,0.06))",
              }}
            >
              {["C", "A", "D", "M", "A"].map((l, i) => {
                const whiteBlock = i < 2;

                return (
                  <div
                    key={i}
                    className="relative"
                    style={{
                      width: "52px",
                      height: "52px",
                      marginLeft: i > 0 ? "-1px" : "0",
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: whiteBlock
                          ? "linear-gradient(160deg, #ffffff 0%, #f7f7f7 40%, #ececec 100%)"
                          : "linear-gradient(160deg, #1e3a8a 0%, #1e40af 45%, #2563eb 70%, #1e3a8a 100%)",
                        border: whiteBlock
                          ? "1px solid rgba(0,0,0,0.06)"
                          : "1px solid rgba(0,0,0,0.25)",
                        borderRadius:
                          i === 0
                            ? "8px 0 0 8px"
                            : i === 4
                            ? "0 8px 8px 0"
                            : "0",
                        boxShadow: `
                          inset 0 2px 4px rgba(255,255,255,0.7),
                          inset 0 -3px 6px rgba(0,0,0,0.15),
                          0 4px 8px rgba(0,0,0,0.08)
                        `,
                      }}
                    />

                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        fontSize: "26px",
                        fontWeight: "900",
                        letterSpacing: "-1px",
                        fontFamily: "Inter, system-ui, sans-serif",
                        color: whiteBlock ? "#1e40af" : "#ffffff",
                      }}
                    >
                      {l}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tagline */}
           <div className="mt-2 w-full flex justify-center md:justify-start">
  <p className="text-blue-700 text-[11px] md:text-[13px] font-semibold tracking-[1px] leading-tight">
    PROFESSIONAL | TRUSTED | RELIABLE
  </p>
</div>

          </div>

          {/* ================= DESKTOP MENU ================= */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            {data.menu.map((item, index) => {
              if (item.label === "Services") {
                return (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={handleOpen}
                    onMouseLeave={handleClose}
                  >
                    <button className="flex items-center gap-1 hover:text-blue-700 transition">
                      {item.label} <ChevronDown size={14} />
                    </button>

                    {open && services?.length > 0 && (
                      <div className="absolute left-0 top-full mt-3 bg-white rounded-lg shadow-lg w-60 py-2">
                        {services.map((service) => (
                          <button
                            key={service._id}
                            onClick={() =>
                              handleNavigate(`/services/${service.slug}`)
                            }
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-blue-700"
                          >
                            {service.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={index}
                  onClick={() => handleNavigate(item.link)}
                  className="hover:text-blue-700 transition"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* ================= RIGHT SIDE ================= */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <div className="bg-blue-100 p-2 rounded-full">
                <Phone size={16} className="text-blue-700" />
              </div>
              <span>{data.phone}</span>
            </div>

            <button
              onClick={() => handleNavigate("/contact")}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:opacity-90 transition"
            >
              Get Consultation
            </button>
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="md:hidden bg-white px-6 py-5 space-y-4 shadow-md">
          {data.menu.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigate(item.link)}
              className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm"
            >
              {item.label}
            </button>
          ))}

          <div className="flex items-center gap-2 pt-3 text-blue-700 text-sm">
            <Phone size={16} />
            <span>{data.phone}</span>
          </div>

          <button
            onClick={() => handleNavigate("/contact")}
            className="w-full mt-4 bg-blue-700 text-white py-3 rounded-full text-sm font-semibold"
          >
            Get Consultation
          </button>
        </div>
      )}
    </header>
  );
}

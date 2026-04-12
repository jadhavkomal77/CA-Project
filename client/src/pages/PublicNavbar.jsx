
// import { Phone, ChevronDown, Menu, X } from "lucide-react";
// import { useGetPublicNavbarQuery } from "../redux/apis/navbarApi";
// import { useGetPublicServicesQuery } from "../redux/apis/serviceApi";
// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function PublicNavbar() {
//   const { data, isLoading } = useGetPublicNavbarQuery();
//   const { data: services, isLoading: servicesLoading } =
//     useGetPublicServicesQuery();

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [openServices, setOpenServices] = useState(false);

//   const timeoutRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     return () => clearTimeout(timeoutRef.current);
//   }, []);

//   if (isLoading || servicesLoading) return null;

//   const defaultMenu = [
//     { label: "About", link: "/about" },
//     { label: "Services", link: "#" },
//     { label: "Case Studies", link: "/casestudies" },
//     { label: "FAQ", link: "/faq" },
//     { label: "Contact", link: "/contact" },
//   ];

//   const menu = data?.menu?.length ? data.menu : defaultMenu;

//   const openMenu = (setter) => {
//     clearTimeout(timeoutRef.current);
//     setter(true);
//   };

//   const closeMenu = (setter) => {
//     timeoutRef.current = setTimeout(() => setter(false), 150);
//   };

//   const handleNavigate = (link) => {
//     if (link !== "#") navigate(link);
//     setMobileOpen(false);
//     setOpenServices(false);
//   };

//   const renderLogoBlocks = (size, fontSize) =>
//     ["C", "A", "D", "M", "A"].map((l, i) => {
//       const whiteBlock = i < 2;
//       return (
//         <div
//           key={i}
//           className="relative"
//           style={{
//             width: size,
//             height: size,
//             flexShrink: 0,  
//             marginLeft: i > 0 ? "-1px" : "0",
//           }}
//         >
//           <div
//             className="absolute inset-0"
//             style={{
//               background: whiteBlock
//                 ? "linear-gradient(160deg,#fff,#ececec)"
//                 : "linear-gradient(160deg,#1e3a8a,#2563eb,#1e3a8a)",
//               border: whiteBlock
//                 ? "1px solid rgba(0,0,0,0.06)"
//                 : "1px solid rgba(0,0,0,0.25)",
//               borderRadius:
//                 i === 0
//                   ? "8px 0 0 8px"
//                   : i === 4
//                   ? "0 8px 8px 0"
//                   : "0",
//             }}
//           />
//           <div
//             className="absolute inset-0 flex items-center justify-center"
//             style={{
//               fontSize: fontSize,
//               fontWeight: "900",
//               letterSpacing: "-1px",
//               color: whiteBlock ? "#1e40af" : "#fff",
//             }}
//           >
//             {l}
//           </div>
//         </div>
//       );
//     });

//   return (
//     <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 md:px-6">
//         <div className="flex items-center justify-between h-[72px] md:h-[85px]">

//           {/* ================= LOGO ================= */}
//          {/* ================= LOGO ================= */}
// <div
//   onClick={() => navigate("/")}
//   className="cursor-pointer select-none flex flex-col"
// >

//   {/* Logo Row */}
//   <div className="flex items-center justify-center md:justify-start">
//     {renderLogoBlocks("48px", "24px")}
//   </div>

//   {/* Tagline */}
//   <div className="w-full flex justify-center md:justify-start">
//     <p
//       className="
//         mt-1
//         text-blue-700
//         font-semibold
//         tracking-[1.4px]
//         text-[11px]
//         whitespace-nowrap
//       "
//     >
//       PROFESSIONAL | TRUSTED | RELIABLE
//     </p>
//   </div>
// </div>

//           {/* ================= DESKTOP MENU ================= */}
//           <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-black">
//             {menu.map((item, index) => {
//               if (item.label === "Services") {
//                 return (
//                   <div
//                     key={index}
//                     className="relative"
//                     onMouseEnter={() => openMenu(setOpenServices)}
//                     onMouseLeave={() => closeMenu(setOpenServices)}
//                   >
//                     <button className="flex items-center gap-1 hover:text-blue-700 transition">
//                       Services <ChevronDown size={14} />
//                     </button>

//                     {openServices && services?.length > 0 && (
//                       <div className="absolute left-0 top-full mt-3 bg-white rounded-xl shadow-xl w-64 py-2">
//                         {services.map((s) => (
//                           <button
//                             key={s._id}
//                             onClick={() => handleNavigate(`/services/${s.slug}`)}
//                             className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-blue-700"
//                           >
//                             {s.title}
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
//           <div className="hidden xl:flex items-center gap-6">
//             <div className="flex items-center gap-2 font-bold">
//               <div className="bg-blue-100 p-2 rounded-full">
//                 <Phone size={16} className="text-blue-700" />
//               </div>
//               {data?.phone}
//             </div>

//             <button
//               onClick={() => handleNavigate("/contact")}
//               className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow hover:shadow-lg transition"
//             >
//               Contact
//             </button>
//           </div>

//           {/* ================= MOBILE BUTTON ================= */}
//           <button
//             className="lg:hidden"
//             onClick={() => setMobileOpen(!mobileOpen)}
//           >
//             {mobileOpen ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </div>
//       </div>

//       {/* ================= MOBILE MENU ================= */}
//       {mobileOpen && (
//         <div className="lg:hidden bg-white px-6 py-5 space-y-3 shadow-md">
//           {menu.map((item, index) => (
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
//             {data?.phone}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }





import { Phone, ChevronDown, Menu, X } from "lucide-react";
import { useGetPublicNavbarQuery } from "../redux/apis/navbarApi";
import { useGetPublicServicesQuery } from "../redux/apis/serviceApi";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PublicNavbar() {
  const { data, isLoading } = useGetPublicNavbarQuery();
  const { data: services, isLoading: servicesLoading } =
    useGetPublicServicesQuery();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  if (isLoading || servicesLoading) return null;

  const defaultMenu = [
    { label: "About", link: "/about" },
    { label: "Services", link: "#" },
    { label: "Case Studies", link: "/casestudies" },
    { label: "FAQ", link: "/faq" },
    { label: "Contact", link: "/contact" },
  ];

  const menu = data?.menu?.length ? data.menu : defaultMenu;

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
  };

  // const renderLogoBlocks = (size, fontSize) =>
  //   ["C", "A", "D", "M", "A"].map((l, i) => {
  //     const whiteBlock = i < 2;
  //     return (
  //       <div
  //         key={i}
  //         className="relative"
  //         style={{
  //           width: size,
  //           height: size,
  //           flexShrink: 0,  
  //           marginLeft: i > 0 ? "-1px" : "0",
  //         }}
  //       >
  //         <div
  //           className="absolute inset-0"
  //           style={{
  //             background: whiteBlock
  //               ? "linear-gradient(160deg,#fff,#ececec)"
  //               : "linear-gradient(160deg,#1e3a8a,#2563eb,#1e3a8a)",
  //             border: whiteBlock
  //               ? "1px solid rgba(0,0,0,0.06)"
  //               : "1px solid rgba(0,0,0,0.25)",
  //             borderRadius:
  //               i === 0
  //                 ? "8px 0 0 8px"
  //                 : i === 4
  //                 ? "0 8px 8px 0"
  //                 : "0",
  //           }}
  //         />
  //         <div
  //           className="absolute inset-0 flex items-center justify-center"
  //           style={{
  //             fontSize: fontSize,
  //             fontWeight: "900",
  //             letterSpacing: "-1px",
  //             color: whiteBlock ? "#1e40af" : "#fff",
  //           }}
  //         >
  //           {l}
  //         </div>
  //       </div>
  //     );
  //   });

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-[72px] md:h-[85px]">

          {/* ================= LOGO ================= */}
         {/* ================= LOGO ================= */}
<div
  onClick={() => navigate("/")}
  className="cursor-pointer select-none flex flex-col"
>

{/* logo */}
{/* <div
  onClick={() => navigate("/")}
  className="flex items-center flex-shrink-0 cursor-pointer"
>
  <img
    src="/Calogo.png"
    alt="CADMA Associates"
    className="
      h-9
      sm:h-11
      md:h-12
      lg:h-14
      xl:h-16
      w-auto
      object-contain
    "
  />
</div> */}

<div
  onClick={() => navigate("/")}
  className="flex items-center flex-shrink-0 cursor-pointer"
>
  <img
    src="/Calogo.png"
    alt="CADMA Associates"
    className="
      h-11
      sm:h-12
      md:h-14
      lg:h-16
      xl:h-18
      w-auto
      object-contain
    "
  />
</div>

</div>

          {/* ================= DESKTOP MENU ================= */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-black">
            {menu.map((item, index) => {
              if (item.label === "Services") {
                return (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => openMenu(setOpenServices)}
                    onMouseLeave={() => closeMenu(setOpenServices)}
                  >
                    <button className="flex items-center gap-1 hover:text-blue-700 transition">
                      Services <ChevronDown size={14} />
                    </button>

                    {openServices && services?.length > 0 && (
                      <div className="absolute left-0 top-full mt-3 bg-white rounded-xl shadow-xl w-64 py-2">
                        {services.map((s) => (
                          <button
                            key={s._id}
                            onClick={() => handleNavigate(`/services/${s.slug}`)}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-blue-700"
                          >
                            {s.title}
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
          <div className="hidden xl:flex items-center gap-6">
            <div className="flex items-center gap-2 font-bold">
              <div className="bg-blue-100 p-2 rounded-full">
                <Phone size={16} className="text-blue-700" />
              </div>
              {data?.phone}
            </div>

            <button
              onClick={() => handleNavigate("/contact")}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow hover:shadow-lg transition"
            >
              Contact
            </button>
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="lg:hidden bg-white px-6 py-5 space-y-3 shadow-md">
          {menu.map((item, index) => (
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
            {data?.phone}
          </div>
        </div>
      )}
    </header>
  );
}


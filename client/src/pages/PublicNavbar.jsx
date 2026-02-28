
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

//   /* cleanup timeout */
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

//   return (
//     <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 md:px-6">
//         <div className="flex items-center justify-between h-[72px] md:h-[85px]">

//           {/* LOGO */}
//           {/* <div
//             className="flex flex-col items-center md:items-start cursor-pointer select-none"
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
//                           ? "linear-gradient(160deg,#fff,#ececec)"
//                           : "linear-gradient(160deg,#1e3a8a,#2563eb,#1e3a8a)",
//                         border: whiteBlock
//                           ? "1px solid rgba(0,0,0,0.06)"
//                           : "1px solid rgba(0,0,0,0.25)",
//                         borderRadius:
//                           i === 0
//                             ? "8px 0 0 8px"
//                             : i === 4
//                             ? "0 8px 8px 0"
//                             : "0",
//                       }}
//                     />

//                     <div
//                       className="absolute inset-0 flex items-center justify-center"
//                       style={{
//                         fontSize: "26px",
//                         fontWeight: "900",
//                         letterSpacing: "-1px",
//                         color: whiteBlock ? "#1e40af" : "#fff",
//                       }}
//                     >
//                       {l}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="mt-1 w-full flex justify-center md:justify-start">
//               <p className="text-blue-700 text-[10px] md:text-[13px] font-semibold tracking-[1px] leading-tight">
//                 PROFESSIONAL | TRUSTED | RELIABLE
//               </p>
//             </div>
//           </div> */}
//   <div
//             className="flex flex-col items-center md:items-start cursor-pointer select-none"
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

//             <div className="mt-1 w-full flex justify-center md:justify-start">
//               <p className="text-blue-700 text-[10px] md:text-[13px] font-semibold tracking-[1px] leading-tight">
//                 PROFESSIONAL | TRUSTED | RELIABLE
//               </p>
//             </div>
//           </div>
//           {/* DESKTOP MENU */}
//           <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-sm font-medium text-black">
//             {menu.map((item, index) => {

//               if (item.label === "Services") {
//                 return (
//                   <div
//                     key={index}
//                     className="relative"
//                     onMouseEnter={() => openMenu(setOpenServices)}
//                     onMouseLeave={() => closeMenu(setOpenServices)}
//                   >
//                     <button
//                       type="button"
//                       className="flex items-center gap-1 hover:text-blue-700 transition-colors duration-200"
//                     >
//                       Services <ChevronDown size={14} />
//                     </button>

//                     {openServices && services?.length > 0 && (
//                       <div className="absolute left-0 top-full mt-3 bg-white rounded-xl shadow-xl w-64 py-2">
//                         {services.map((s) => (
//                           <button
//                             key={s._id}
//                             type="button"
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
//                   type="button"
//                   onClick={() => handleNavigate(item.link)}
//                   className="hover:text-blue-700 transition-colors duration-200"
//                 >
//                   {item.label}
//                 </button>
//               );
//             })}
//           </nav>

//           {/* RIGHT SIDE */}
//           <div className="hidden xl:flex items-center gap-6">

//             <div className="flex items-center gap-2 text-black font-bold">
//               <div className="bg-blue-100 p-2 rounded-full">
//                 <Phone size={16} className="text-blue-700" />
//               </div>
//               {data?.phone}
//             </div>

//             <button
//               type="button"
//               onClick={() => handleNavigate("/contact")}
//               className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow hover:shadow-lg hover:opacity-90 transition"
//             >
//               Contact
//             </button>
//           </div>

//           {/* MOBILE BUTTON */}
//           <button type="button" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
//             {mobileOpen ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {mobileOpen && (
//         <div className="lg:hidden bg-white px-6 py-5 space-y-3 shadow-md animate-[fadeIn_.25s_ease]">
//           {menu.map((item, index) => (
//             <button
//               key={index}
//               type="button"
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
//           <div onClick={() => navigate("/")} className="cursor-pointer select-none">

//             {/* Desktop Logo */}
//             <div className="hidden md:flex flex-col items-start">
//               <div className="flex items-center">
//                 {renderLogoBlocks("52px", "26px")}
//               </div>
//               <p className="mt-1 text-blue-700 text-[12px] font-semibold tracking-[1.5px]">
//                 PROFESSIONAL | TRUSTED | RELIABLE
//               </p>
//             </div>

//             {/* Mobile Logo */}
//             <div className="flex md:hidden flex-col items-center">
//               <div className="flex items-center">
//                 {renderLogoBlocks("44px", "20px")}
//               </div>
//               <p className="mt-1 text-blue-700 text-[10px] font-semibold tracking-[1.4px] text-center">
//                 PROFESSIONAL | TRUSTED | RELIABLE
//               </p>
//             </div>

//           </div>

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

  const renderLogoBlocks = (size, fontSize) =>
    ["C", "A", "D", "M", "A"].map((l, i) => {
      const whiteBlock = i < 2;
      return (
        <div
          key={i}
          className="relative"
          style={{
            width: size,
            height: size,
            flexShrink: 0,  
            marginLeft: i > 0 ? "-1px" : "0",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: whiteBlock
                ? "linear-gradient(160deg,#fff,#ececec)"
                : "linear-gradient(160deg,#1e3a8a,#2563eb,#1e3a8a)",
              border: whiteBlock
                ? "1px solid rgba(0,0,0,0.06)"
                : "1px solid rgba(0,0,0,0.25)",
              borderRadius:
                i === 0
                  ? "8px 0 0 8px"
                  : i === 4
                  ? "0 8px 8px 0"
                  : "0",
            }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              fontSize: fontSize,
              fontWeight: "900",
              letterSpacing: "-1px",
              color: whiteBlock ? "#1e40af" : "#fff",
            }}
          >
            {l}
          </div>
        </div>
      );
    });

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

  {/* Logo Row */}
  <div className="flex items-center justify-center md:justify-start">
    {renderLogoBlocks("48px", "24px")}
  </div>

  {/* Tagline */}
  <div className="w-full flex justify-center md:justify-start">
    <p
      className="
        mt-1
        text-blue-700
        font-semibold
        tracking-[1.4px]
        text-[11px]
        whitespace-nowrap
      "
    >
      PROFESSIONAL | TRUSTED | RELIABLE
    </p>
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


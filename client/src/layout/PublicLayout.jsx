// import { Outlet } from "react-router-dom";
// import PublicNavbar from "../pages/PublicNavbar";
// import PublicFooter from "../pages/PublicFooter";
// import WhatsappButton from "./WhatsappButton";


// export default function PublicLayout() {
//   return (
//     <>
//       <PublicNavbar />
//       <Outlet />   
//       <PublicFooter />
//         <WhatsappButton />
//     </>
//   );
// }




import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PublicNavbar from "../pages/PublicNavbar";
import PublicFooter from "../pages/PublicFooter";
import WhatsappButton from "./WhatsappButton";
function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    let attempts = 0;

    const scroll = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts < 20) {
        attempts++;
        setTimeout(scroll, 100);
      }
    };

    scroll();
  }, [hash]);

  return null;
}


export default function PublicLayout() {
  return (
    <>
      <PublicNavbar />

      {/* 👇 this enables /#about /#contact scrolling */}
      <ScrollToHash />

      <Outlet />

      <PublicFooter />
      <WhatsappButton />
    </>
  );
}

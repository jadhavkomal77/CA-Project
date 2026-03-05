

// import {
//   Facebook,
//   Instagram,
//   Linkedin,
//   Phone,
//   Mail,
//   MapPin,
// } from "lucide-react";
// import { FaXTwitter } from "react-icons/fa6";
// import { useGetPublicNavbarQuery } from "../redux/apis/navbarApi";
// import { useGetPublicFooterQuery } from "../redux/apis/footerApi";
// import { Link } from "react-router-dom";

// export default function PublicFooter() {
//   const { data: footer } = useGetPublicFooterQuery();
//   const { data: navbar } = useGetPublicNavbarQuery();

//   if (!footer || !navbar) return null;

//   const routeMap = {
//     Home: "/",
//     About: "/about",
//     Services: "/services",
//     "Latest Updates": "/tax-updates",
//     // "Case Studies": "/casestudies",
//     Pricing: "/pricing",
//     Contact: "/contact",
//     "Privacy Policy": "/privacy",
//     "Terms & Conditions": "/terms",
//     "Refund Policy": "/refund-policy",
//     Disclaimer: "/disclaimer",
//   };

//   return (
//     <footer className="bg-[#0f172a] text-gray-300">

//       {/* ================= MAIN ================= */}
//       <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

//         {/* COMPANY */}
//         <div className="space-y-5 text-center sm:text-left">

//           {/* LOGO */}
//           <div className="flex flex-col items-center sm:items-start">

//             <div className="flex items-center">
//               {["C", "A", "D", "M", "A"].map((l, i) => {
//                 const white = i < 2;

//                 return (
//                   <div
//                     key={i}
//                     className="flex items-center justify-center
//                                w-[42px] h-[42px]
//                                border text-[19px] font-black"
//                     style={{
//                       background: white
//                         ? "linear-gradient(160deg,#fff,#ececec)"
//                         : "linear-gradient(160deg,#1e3a8a,#2563eb,#1e3a8a)",
//                       color: white ? "#1e40af" : "#fff",
//                       borderColor: white
//                         ? "rgba(0,0,0,0.08)"
//                         : "rgba(0,0,0,0.25)",
//                       borderRadius:
//                         i === 0
//                           ? "8px 0 0 8px"
//                           : i === 4
//                           ? "0 8px 8px 0"
//                           : "0",
//                     }}
//                   >
//                     {l}
//                   </div>
//                 );
//               })}
//             </div>

//             {/* TAGLINE */}
//             <p className="mt-2 text-yellow-500 text-[11px] font-semibold tracking-wide text-center sm:text-left max-w-[220px] leading-tight">
//                 PROFESSIONAL | TRUSTED | RELIABLE
//             </p>
//           </div>

//           {/* DESC */}
//           <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto sm:mx-0">
//             {footer.description}
//           </p>

//           {/* SOCIAL */}
//           <div className="flex justify-center sm:justify-start gap-3 flex-wrap">
//             {footer.facebook && <SocialIcon Icon={Facebook} link={footer.facebook} />}
//             {footer.twitter && <SocialIcon Icon={FaXTwitter} link={footer.twitter} />}
//             {footer.instagram && <SocialIcon Icon={Instagram} link={footer.instagram} />}
//             {footer.linkedin && <SocialIcon Icon={Linkedin} link={footer.linkedin} />}
//           </div>
//         </div>

//         {/* QUICK LINKS */}
//         <FooterLinks title="Quick Links" links={footer.quickLinks} routeMap={routeMap} />

//         {/* IMPORTANT LINKS */}
//         <FooterLinks title="Important Links" links={footer.importantLinks} routeMap={routeMap} />

//         {/* CONTACT */}
//         <div className="text-center sm:text-left">
//           <h3 className="text-white font-semibold mb-5 text-lg">
//             Contact Info
//           </h3>

//           <ul className="space-y-4 text-sm text-gray-400">

//             <li className="flex items-center justify-center sm:justify-start gap-3">
//               <Phone size={16} className="text-yellow-500" />
//               {footer.phone}
//             </li>

//             <li className="flex items-center justify-center sm:justify-start gap-3">
//               <Mail size={16} className="text-yellow-500" />
//               {footer.email}
//             </li>

//             <li className="flex items-start justify-center sm:justify-start gap-2">
//               <MapPin size={17} className="text-yellow-500 shrink-0 mt-[3px]" />
//               <span className="leading-relaxed">{footer.address}</span>
//             </li>

//           </ul>

//           {/* REVIEW BUTTON */}
//           <div className="mt-6 flex justify-center sm:justify-start">
//             <a
//               href={
//                 footer.reviewLink ||
//                 `https://www.google.com/search?q=${encodeURIComponent(
//                   footer.companyName
//                 )}`
//               }
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2
//                          w-full sm:w-auto justify-center
//                          bg-white text-blue-700 font-semibold
//                          px-5 py-2 rounded-full shadow-md
//                          hover:scale-105 hover:bg-yellow-400 hover:text-black
//                          transition-all duration-300"
//             >
//               ⭐ Review Us
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* ================= BOTTOM ================= */}
//       <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400 px-4">

//         <p className="flex flex-col sm:flex-row items-center justify-center gap-1">
//           <span>
//             © {new Date().getFullYear()}{" "}
//             <span className="text-yellow-400 font-medium">
//               {footer.companyName}
//             </span>
//           </span>

//           <span className="hidden sm:inline">•</span>
//           <span>All Rights Reserved</span>
//         </p>

//         <button
//           onClick={() => (window.location.href = "/adminlogin")}
//           className="mt-3 text-xs text-yellow-500 hover:underline"
//         >
//           Admin Login
//         </button>
//       </div>
//     </footer>
//   );
// }

// /* LINKS */
// function FooterLinks({ title, links, routeMap }) {
//   return (
//     <div className="text-center sm:text-left">
//       <h3 className="text-white font-semibold mb-5 text-lg">{title}</h3>

//       <ul className="space-y-3 text-sm">
//         {links?.map((item) => (
//           <li key={item}>
//             <Link
//               to={routeMap[item] || "/"}
//               className="hover:text-yellow-500 transition"
//             >
//               {item}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// /* SOCIAL ICON */
// function SocialIcon({ Icon, link }) {
//   return (
//     <a
//       href={link}
//       target="_blank"
//       rel="noreferrer"
//       className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center
//                  hover:bg-yellow-500 hover:text-black transition-all duration-300"
//     >
//       <Icon size={18} className="text-white" />
//     </a>
//   );
// }







import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { useGetPublicNavbarQuery } from "../redux/apis/navbarApi";
import { useGetPublicFooterQuery } from "../redux/apis/footerApi";
import { Link } from "react-router-dom";

export default function PublicFooter() {
  const { data: footer, isLoading: footerLoading } = useGetPublicFooterQuery();
  const { data: navbar, isLoading: navbarLoading } = useGetPublicNavbarQuery();

  if (footerLoading || navbarLoading) return null;
  if (!footer || !navbar) return null;

  const routeMap = {
    Home: "/",
    About: "/about",
    Services: "/services",
    "Latest Updates": "/tax-updates",
    Pricing: "/pricing",
    Contact: "/contact",
    "Privacy Policy": "/privacy",
    "Terms & Conditions": "/terms",
    "Refund Policy": "/refund-policy",
    Disclaimer: "/disclaimer",
  };

  return (
    <footer className="bg-[#0f172a] text-gray-300">

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* COMPANY */}
        <div className="space-y-5 text-center sm:text-left">

          {/* LOGO */}
        {/* LOGO */}
<div className="flex flex-col items-center sm:items-start">

  <div className="flex items-center">
    {["C", "A", "D", "M", "A"].map((l, i) => {
      const white = i < 2;

      return (
        <div
          key={i}
          className="flex items-center justify-center
          w-[42px] h-[42px]
          border text-[19px] font-black"
          style={{
            background: white
              ? "linear-gradient(160deg,#fff,#ececec)"
              : "linear-gradient(160deg,#1e3a8a,#2563eb,#1e3a8a)",
            color: white ? "#1e40af" : "#fff",
            borderColor: white
              ? "rgba(0,0,0,0.08)"
              : "rgba(0,0,0,0.25)",
            borderRadius:
              i === 0
                ? "8px 0 0 8px"
                : i === 4
                ? "0 8px 8px 0"
                : "0",
          }}
        >
          {l}
        </div>
      );
    })}
  </div>

  {/* TAGLINE */}
  <p className="mt-2 text-yellow-500 text-[12px] font-semibold tracking-[0px] whitespace-nowrap">
    PROFESSIONAL | TRUSTED | RELIABLE
  </p>

</div>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto sm:mx-0">
            {footer.description}
          </p>

          {/* SOCIAL */}
          <div className="flex justify-center sm:justify-start gap-3 flex-wrap">
            {footer.facebook && <SocialIcon Icon={Facebook} link={footer.facebook} />}
            {footer.twitter && <SocialIcon Icon={FaXTwitter} link={footer.twitter} />}
            {footer.instagram && <SocialIcon Icon={Instagram} link={footer.instagram} />}
            {footer.linkedin && <SocialIcon Icon={Linkedin} link={footer.linkedin} />}
          </div>
        </div>

        {/* QUICK LINKS */}
        <FooterLinks title="Quick Links" links={footer.quickLinks} routeMap={routeMap} />

        {/* IMPORTANT LINKS */}
        <FooterLinks title="Important Links" links={footer.importantLinks} routeMap={routeMap} />

        {/* CONTACT */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-5 text-lg">
            Contact Info
          </h3>

          <ul className="space-y-4 text-sm text-gray-400">

            <li className="flex items-center justify-center sm:justify-start gap-3">
              <Phone size={16} className="text-yellow-500 shrink-0" />
              <span>Call us at {footer.phone}</span>
            </li>

            <li className="flex items-center justify-center sm:justify-start gap-3">
              <Mail size={16} className="text-yellow-500 shrink-0" />
              <span className="break-all">{footer.email}</span>
            </li>

            <li className="flex items-start justify-center sm:justify-start gap-3">
              <MapPin size={17} className="text-yellow-500 shrink-0 mt-[3px]" />
              <span className="leading-relaxed break-words">
                {footer.address}
              </span>
            </li>

          </ul>

          {/* REVIEW BUTTON */}
          <div className="mt-6 flex justify-center sm:justify-start">
            <a
              href={
                footer.reviewLink ||
                `https://www.google.com/search?q=${encodeURIComponent(
                  footer.companyName
                )}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2
              w-full sm:w-auto justify-center
              bg-white text-blue-700 font-semibold
              px-5 py-2 rounded-full shadow-md
              hover:scale-105 hover:bg-yellow-400 hover:text-black
              transition-all duration-300"
            >
              ⭐ Review Us
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400 px-4">

        <p className="flex flex-col sm:flex-row items-center justify-center gap-1">
          <span>
            © {new Date().getFullYear()}{" "}
            <span className="text-yellow-400 font-medium">
              {footer.companyName}
            </span>
          </span>

          <span className="hidden sm:inline">•</span>

          <span>All Rights Reserved</span>
        </p>

        <button
          onClick={() => (window.location.href = "/adminlogin")}
          className="mt-3 text-xs text-yellow-500 hover:underline"
        >
          Admin Login
        </button>
      </div>
    </footer>
  );
}

/* LINKS */
function FooterLinks({ title, links = [], routeMap }) {
  return (
    <div className="text-center sm:text-left">
      <h3 className="text-white font-semibold mb-5 text-lg">{title}</h3>

      <ul className="space-y-3 text-sm">
        {links.map((item) => (
          <li key={item}>
            <Link
              to={routeMap[item] || "/"}
              className="hover:text-yellow-500 transition"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* SOCIAL ICON */
function SocialIcon({ Icon, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center
      hover:bg-yellow-500 transition-all duration-300 group"
    >
      <Icon size={18} className="text-white group-hover:text-black" />
    </a>
  );
}
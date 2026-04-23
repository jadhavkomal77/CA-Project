

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
//   const { data: footer, isLoading: footerLoading } = useGetPublicFooterQuery();
//   const { data: navbar, isLoading: navbarLoading } = useGetPublicNavbarQuery();

//   if (footerLoading || navbarLoading) return null;
//   if (!footer || !navbar) return null;

//   const routeMap = {
//     Home: "/",
//     About: "/about",
//     Services: "/services",
//     "Latest Updates": "/tax-updates",
//     Pricing: "/pricing",
//     Contact: "/contact",
//     "Privacy Policy": "/privacy",
//     "Terms & Conditions": "/terms",
//     "Refund Policy": "/refund-policy",
//     Disclaimer: "/disclaimer",
//   };

//   return (
//     <footer className="bg-[#0f172a] text-gray-300">

//       {/* MAIN */}
//       <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 
//       grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

//         {/* COMPANY */}
//         <div className="space-y-5 text-center sm:text-left">

// <div className="flex justify-center sm:justify-start">

//   <img
//     src="/Calogo.png"
//     alt="CADMA Associates"
//     className="
//       h-10
//       sm:h-11
//       md:h-12
//       lg:h-14
//       xl:h-16
//       w-auto
//       object-contain
//     "
//     loading="lazy"
//   />

// </div>
//           {/* DESCRIPTION */}
//           <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto sm:mx-0">
//             {footer.description}
//           </p>

//           {/* SOCIAL */}
//           {/* <div className="flex justify-center sm:justify-start gap-3 flex-wrap">
//             {footer.facebook && <SocialIcon Icon={Facebook} link={footer.facebook} />}
//             {footer.twitter && <SocialIcon Icon={FaXTwitter} link={footer.twitter} />}
//             {footer.instagram && <SocialIcon Icon={Instagram} link={footer.instagram} />}
//           </div> */}
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
//               <Phone size={16} className="text-yellow-500 shrink-0" />
//               <span>Call us at {footer.phone}</span>
//             </li>

//             <li className="flex items-center justify-center sm:justify-start gap-3">
//               <Mail size={16} className="text-yellow-500 shrink-0" />
//               <span className="break-all">{footer.email}</span>
//             </li>

//             <li className="flex items-start justify-center sm:justify-start gap-3">
//               <MapPin size={17} className="text-yellow-500 shrink-0 mt-[3px]" />
//               <span className="leading-relaxed break-words">
//                 {footer.address}
//               </span>
//             </li>

//           </ul>

      
//         </div>
//       </div>


// {/* ICONS | CITIES | REVIEW */}
// <div
// className="
// mt-4 mb-8 mx-8
// grid
// grid-cols-1
// sm:grid-cols-3
// items-center
// gap-6
// text-center
// "
// >

//   {/* ICONS */}
//   <div className="flex justify-center sm:justify-start gap-3">

//     {footer.facebook && <SocialIcon Icon={Facebook} link={footer.facebook}/>}

//     {footer.twitter && <SocialIcon Icon={FaXTwitter} link={footer.twitter}/>}

//     {footer.instagram && <SocialIcon Icon={Instagram} link={footer.instagram}/>}

//   </div>


//  {/* OUR CITIES */}
// <div className="text-gray-400 text-sm leading-relaxed">
//   <h3 className="mb-3 text-center text-white font-semibold text-sm sm:text-base">
//     Our Cities
//   </h3>

//   <div className="hidden sm:block text-center">
//     Mumbai<span className="mx-2 text-gray-600">|</span>
//     Pune<span className="mx-2 text-gray-600">|</span>
//     Bangalore<span className="mx-2 text-gray-600">|</span>
//     Chh. Sambhaji Nagar<span className="mx-2 text-gray-600">|</span>
//     Satara<span className="mx-2 text-gray-600">|</span>
//     Hingoli<span className="mx-2 text-gray-600">|</span>
//     Parbhani<span className="mx-2 text-gray-600">|</span>
//     Beed
//   </div>

//   <div className="sm:hidden space-y-1 text-center">
//     <div>Mumbai | Pune | Bangalore</div>
//     <div>Chh. Sambhaji Nagar | Satara</div>
//     <div>Hingoli | Parbhani | Beed</div>
//   </div>
// </div>

// <div className="flex justify-center sm:justify-end">

//   <a
//     href={
//       footer.reviewLink ||
//       `https://www.google.com/search?q=${encodeURIComponent(
//         footer.companyName
//       )}`
//     }
//     target="_blank"
//     rel="noopener noreferrer"
//     className="
//       inline-flex
//       items-center
//       gap-2
//       px-5
//       py-2
//       text-sm
//       sm:text-base
//       bg-white
//       text-blue-700
//       rounded-full
//       font-semibold
//       hover:bg-yellow-400
//       hover:text-black
//       transition
//       whitespace-nowrap
//     "
//   >
//     ⭐ Review Us
//   </a>

// </div>

// </div>

//       {/* BOTTOM */}
//       <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400 px-4">

//         <p className="flex flex-col sm:flex-row items-center justify-center gap-1">
//           <span>
//             © {new Date().getFullYear()}{" "}
//             <span className="text-black font-medium">
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
// function FooterLinks({ title, links = [], routeMap }) {
//   return (
//     <div className="text-center sm:text-left">
//       <h3 className="text-white font-semibold mb-5 text-lg">{title}</h3>

//       <ul className="space-y-3 text-sm">
//         {links.map((item) => (
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
//       hover:bg-yellow-500 transition-all duration-300 group"
//     >
//       <Icon size={18} className="text-white group-hover:text-black" />
//     </a>
//   );
// }





import {
  Facebook,
  Instagram,
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

  const cities = [
    "Chh. Sambhaji Nagar",
    "Mumbai",
    "Pune",
    "Bengaluru",
    "Satara",
    "Hingoli",
    "Parbhani",
    "Beed",
  ];

  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6 md:p-8 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-10">
            <div className="xl:col-span-4">
              <img
                src="/LogoCA.jpeg"
                alt={footer.companyName || "CADMA Associates"}
                className="h-14 md:h-16 w-auto rounded-md object-contain bg-white p-1"
                loading="lazy"
              />

              <p className="mt-5 text-sm leading-6 text-slate-300 max-w-sm">
                {footer.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {footer.facebook && (
                  <SocialIcon Icon={Facebook} link={footer.facebook} />
                )}
                {footer.twitter && (
                  <SocialIcon Icon={FaXTwitter} link={footer.twitter} />
                )}
                {footer.instagram && (
                  <SocialIcon Icon={Instagram} link={footer.instagram} />
                )}
              </div>

              <a
                href={
                  footer.reviewLink ||
                  `https://www.google.com/search?q=${encodeURIComponent(
                    footer.companyName
                  )}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                ⭐ Review Us
              </a>
            </div>

            <div className="xl:col-span-2">
              <FooterLinks
                title="Quick Links"
                links={footer.quickLinks}
                routeMap={routeMap}
              />
            </div>

            <div className="xl:col-span-2">
              <FooterLinks
                title="Important Links"
                links={footer.importantLinks}
                routeMap={routeMap}
              />
            </div>

            <div className="xl:col-span-4">
              <h3 className="text-white font-semibold text-lg">Contact Info</h3>

              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone size={17} className="text-cyan-400 shrink-0 mt-[2px]" />
                  <a
                    href={`tel:${footer.phone}`}
                    className="text-slate-100 hover:text-cyan-300 transition"
                  >
                    {footer.phone}
                  </a>
                </li>

                <li className="flex items-start gap-3">
                  <Mail size={17} className="text-cyan-400 shrink-0 mt-[2px]" />
                  <a
                    href={`mailto:${footer.email}`}
                    className="break-all text-slate-100 hover:text-cyan-300 transition"
                  >
                    {footer.email}
                  </a>
                </li>

                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-cyan-400 shrink-0 mt-[2px]" />
                  <span className="leading-6 text-slate-200">{footer.address}</span>
                </li>
              </ul>

              <h4 className="mt-7 text-white font-medium">Our Cities</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {cities.map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-slate-200"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-300">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {footer.companyName} · All Rights Reserved
          </p>

          <button
            onClick={() => (window.location.href = "/adminlogin")}
            className="text-xs text-cyan-300 hover:text-cyan-200 hover:underline"
          >
            Admin Login
          </button>
        </div>
      </div>
    </footer>
  );
}


function FooterLinks({ title, links = [], routeMap }) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-5 text-lg">{title}</h3>

      <ul className="space-y-3 text-sm">
        {links.map((item) => (
          <li key={item}>
            <Link
              to={routeMap[item] || "/"}
              className="text-slate-300 hover:text-cyan-300 transition"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ Icon, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="h-10 w-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-cyan-400 hover:border-cyan-400 transition-all duration-300 group"
    >
      <Icon size={18} className="text-white group-hover:text-slate-950" />
    </a>
  );
}







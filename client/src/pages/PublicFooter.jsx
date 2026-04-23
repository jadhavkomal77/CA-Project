

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
  Mail,
  MapPin,
  Phone,
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
    "Cookie Policy": "/cookie-policy",
    "Refund Policy": "/refund-policy",
    Disclaimer: "/disclaimer",
  };

  const serviceRouteMap = {
    "Wealth Management": "/services/wealth-management",
    "Income Tax Return Preparation & Filing": "/services/income-tax-return-preparation-filing",
    "GST Services": "/services/gst-services",
    "Company Incorporation Services": "/services/company-incorporation-services",
    "Audit & Assurance Services": "/services/audit-assurance-services",
    "Startup & MSME Registration": "/services/startup-msme-registration",
    "Project Financing & Government Subsidies": "/services/project-financing-government-subsidies",
    "Financial Planning & Business Advisory": "/services/financial-planning-business-advisory",
  };

  const cities = [
    "Mumbai",
    "Pune",
    "Bengaluru",
    "Chh. Sambhaji Nagar",
    "Satara",
    "Hingoli",
    "Parbhani",
    "Beed",
  ];

  const quickLinks = ["Home", "About", "Services", "Latest Updates", "Contact"];
  const serviceLinks = [
    "Wealth Management",
    "Income Tax Return Preparation & Filing",
    "GST Services",
    "Company Incorporation Services",
    "Audit & Assurance Services",
    "Startup & MSME Registration",
    "Project Financing & Government Subsidies",
    "Financial Planning & Business Advisory",
  ];
  const importantLinks = [
    "Privacy Policy",
    "Terms & Conditions",
    "Disclaimer",
    "Refund Policy",
  ];

  const contactItems = [
    {
      label: "Call",
      value: footer.phone || "+91 9921055588",
      href: `tel:${(footer.phone || "+91 9921055588").replace(/\s/g, "")}`,
      Icon: Phone,
    },
    {
      label: "Email",
      value: footer.email || "support@cadmaassociatespvtltd.com",
      href: `mailto:${footer.email || "support@cadmaassociatespvtltd.com"}`,
      Icon: Mail,
    },
  ];

  const locations = [
    {
      name: "Chh. Sambhajinagar",
      address: "2, Anuvihar Complex, Opp. Yadav Tyres, Behind Vivekanand College, Chh. Sambhajinagar - 431001",
    },
    {
      name: "Navi Mumbai",
      address: "Office no. 40, Second Floor, Crystal Plaza, Hiranandani, Sector - 07, Kharghar, Navi Mumbai - 410210",
    },
    {
      name: "Pune",
      address: "Fergusson College Rd, Mantri House, Shivajinagar, Pune, Maharashtra 411004",
    },
  ];

  return (
    <footer className="bg-[#2563EB] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1.15fr_1.45fr] gap-x-12 gap-y-12">
          <div className="space-y-6">
            <img
              src="/LogoCA.png"
              alt="CADMA Logo"
              className="h-24 md:h-32 lg:h-40 w-auto object-contain"
              loading="lazy"
            />
            <div>
              <p className="mt-3 max-w-xs text-sm leading-6 text-blue-100">
              Cadma Associates is a premier professional services firm dedicated to providing exceptional audit, tax, and advisory solutions for businesses across the globe. We empower organizations 
              </p>
            </div>
          </div>

          <div>
            <FooterLinks title="Quick Links" links={quickLinks} routeMap={routeMap} />
          </div>

          <div>
            <FooterLinks title="Important Links" links={importantLinks} routeMap={routeMap} />
          </div>

          <div className="space-y-10">
            <div>
              <FooterLinks title="Our Services" links={serviceLinks} routeMap={serviceRouteMap} />
            </div>

            <div>
              <p className="uppercase text-sm tracking-[0.2em] font-semibold">Our Cities</p>
              <ul className="mt-6 space-y-3 text-sm text-blue-50">
                {cities.map((city) => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-3 lg:row-start-2">
            <div className="border-t border-white/20 pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.6fr] gap-8 lg:gap-10">
                <div>
                  <p className="uppercase text-sm tracking-[0.2em] font-semibold">Contact Us</p>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-blue-100">
                    Speak directly with our advisory team for audit, tax, GST, incorporation, and finance support.
                  </p>

                  <div className="mt-6 grid gap-3">
                    {contactItems.map(({ label, value, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        className="group flex items-center gap-3 rounded-md border border-white/20 bg-white/[0.07] px-4 py-3 text-left transition-colors hover:bg-white hover:text-[#2563EB]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-[#2563EB] transition-colors group-hover:bg-[#2563EB] group-hover:text-white">
                          <Icon size={18} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[11px] uppercase tracking-[0.18em] text-blue-100 transition-colors group-hover:text-blue-700">
                            {label}
                          </span>
                          <span className="block break-words text-sm font-semibold">{value}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="uppercase text-sm tracking-[0.2em] font-semibold">Our Locations</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {locations.map((location) => (
                      <div
                        key={location.name}
                        className="rounded-md border border-white/18 bg-white/[0.06] p-4 shadow-sm shadow-blue-950/10"
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-[#2563EB]">
                            <MapPin size={16} />
                          </span>
                          <p className="text-sm font-semibold">{location.name}</p>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-blue-50">{location.address}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-14 border-t border-white/20 pt-8 grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          <p className="text-xs text-blue-100 text-center md:text-left">
            © 2026 CADMA ASSOCIATES PVT LTD
          </p>

          <div className="flex items-center justify-center gap-4">
            {footer.facebook && <SocialIcon Icon={Facebook} link={footer.facebook} />}
            {footer.twitter && <SocialIcon Icon={FaXTwitter} link={footer.twitter} />}
            {footer.instagram && <SocialIcon Icon={Instagram} link={footer.instagram} />}
          </div>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-5 text-xs text-blue-100">
            <button
              onClick={() => (window.location.href = "/adminlogin")}
              className="hover:text-white transition-colors"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}


function FooterLinks({ title, links = [], routeMap }) {
  return (
    <div>
      <p className="uppercase text-sm tracking-[0.2em] font-semibold">{title}</p>

      <ul className="mt-6 space-y-3 text-sm">
        {links.map((item) => (
          <li key={item}>
            <Link
              to={routeMap[item] || "/"}
              className="text-blue-50 hover:text-white transition-colors"
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
      className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#2563EB] transition-all duration-200"
    >
      <Icon size={18} className="text-current" />
    </a>
  );
}






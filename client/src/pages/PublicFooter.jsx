import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import { useGetPublicNavbarQuery } from "../redux/apis/navbarApi";
import { useGetPublicFooterQuery } from "../redux/apis/footerApi";
import { Link } from "react-router-dom";

export default function PublicFooter() {
  const { data: footer } = useGetPublicFooterQuery();
  const { data: navbar } = useGetPublicNavbarQuery();

  if (!footer || !navbar) return null;

  const routeMap = {
    Home: "/",
    About: "/about",
    Services: "/services",
    Projects: "/projects",
    Pricing: "/pricing",
    Contact: "/contact",
    "Privacy Policy": "/privacy",
    "Terms & Conditions": "/terms",
    Disclaimer: "/disclaimer",
  };

  return (
    <footer className="bg-[#0f172a] text-gray-300">

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* COMPANY INFO */}
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            {navbar.logoImage && (
              <img
                src={navbar.logoImage}
                alt="Company Logo"
                className="h-10 w-10 object-contain"
              />
            )}

            <div>
              <h2 className="text-white font-bold text-xl">
                {footer.companyName}
              </h2>
              <p className="text-yellow-500 text-sm font-medium">
                {footer.tagline}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            {footer.description}
          </p>

          <div className="flex gap-3 pt-2">
            {footer.facebook && <SocialIcon Icon={Facebook} link={footer.facebook} />}
            {footer.twitter && <SocialIcon Icon={Twitter} link={footer.twitter} />}
            {footer.instagram && <SocialIcon Icon={Instagram} link={footer.instagram} />}
            {footer.linkedin && <SocialIcon Icon={Linkedin} link={footer.linkedin} />}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-lg">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            {footer.quickLinks?.map((item) => (
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

        {/* IMPORTANT LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-lg">
            Important Links
          </h3>
          <ul className="space-y-3 text-sm">
            {footer.importantLinks?.map((item) => (
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

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-lg">
            Contact Info
          </h3>

          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-yellow-500" />
              <span>{footer.phone}</span>
            </li>

            <li className="flex items-center gap-3">
              <Mail size={16} className="text-yellow-500" />
              <span>{footer.email}</span>
            </li>

            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-yellow-500 mt-1" />
              <span>{footer.address}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">
            {footer.companyName}
          </span>. All Rights Reserved.
        </p>

        <p className="mt-2 text-yellow-400">
          Designed & Developed by MVAD Eventful Endeavors Pvt Ltd
        </p>

        <button
          onClick={() => window.location.href = "/adminlogin"}
          className="mt-4 text-xs text-yellow-500 hover:underline"
        >
          Admin Login
        </button>
      </div>
    </footer>
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
                 hover:bg-yellow-500 hover:text-black transition-all duration-300"
    >
      <Icon size={18} className="text-white" />
    </a>
  );
}

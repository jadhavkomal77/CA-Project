
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
    Projects: "/casestudies",
    Pricing: "/pricing",
    Contact: "/contact",
    "Privacy Policy": "/privacy",
    "Terms & Conditions": "/terms",
    Disclaimer: "/disclaimer",
  };

  return (
    <footer className="bg-[#0f172a] text-gray-300">
      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* COMPANY */}
        <div className="space-y-5 text-center sm:text-left">

          {/* LOGO */}
          <div className="flex flex-col items-center sm:items-start cursor-pointer">

  {/* LOGO */}
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
            width: "40px",
            height: "40px",
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
              fontSize: "19px",
              fontWeight: "900",
              letterSpacing: "-1px",
              fontFamily: "Inter, system-ui",
              color: whiteBlock ? "#1e40af" : "#fff",
            }}
          >
            {l}
          </div>
        </div>
      );
    })}
  </div>

  {/* TAGLINE — EXACT SAME WIDTH AS LOGO */}
  <div className="mt-2 inline-block">
    <p className="text-yellow-500 text-[11px] font-semibold tracking-wide whitespace-nowrap">
      PROFESSIONAL | TRUSTED | RELIABLE
    </p>
  </div>
</div>


          {/* DESC */}
          <p className="text-sm text-gray-400 leading-relaxed">
            {footer.description}
          </p>

          {/* SOCIAL */}
          <div className="flex justify-center sm:justify-start gap-3 pt-2 flex-wrap">
            {footer.facebook && <SocialIcon Icon={Facebook} link={footer.facebook} />}
            {footer.twitter && <SocialIcon Icon={Twitter} link={footer.twitter} />}
            {footer.instagram && <SocialIcon Icon={Instagram} link={footer.instagram} />}
            {footer.linkedin && <SocialIcon Icon={Linkedin} link={footer.linkedin} />}
          </div>
        </div>

        {/* QUICK */}
        <FooterLinks title="Quick Links" links={footer.quickLinks} routeMap={routeMap} />

        {/* IMPORTANT */}
        <FooterLinks title="Important Links" links={footer.importantLinks} routeMap={routeMap} />

        {/* CONTACT */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-5 text-lg">
            Contact Info
          </h3>

          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center justify-center sm:justify-start gap-3">
              <Phone size={16} className="text-yellow-500" />
              {footer.phone}
            </li>

            <li className="flex items-center justify-center sm:justify-start gap-3">
              <Mail size={16} className="text-yellow-500" />
              {footer.email}
            </li>

            <li className="flex items-start justify-center sm:justify-start gap-3">
              <MapPin size={16} className="text-yellow-500 mt-1" />
              {footer.address}
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400 px-4">
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
          onClick={() => (window.location.href = "/adminlogin")}
          className="mt-4 text-xs text-yellow-500 hover:underline"
        >
          Admin Login
        </button>
      </div>
    </footer>
  );
}

/* LINKS COMPONENT */
function FooterLinks({ title, links, routeMap }) {
  return (
    <div className="text-center sm:text-left">
      <h3 className="text-white font-semibold mb-5 text-lg">{title}</h3>
      <ul className="space-y-3 text-sm">
        {links?.map((item) => (
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
                 hover:bg-yellow-500 hover:text-black transition-all duration-300"
    >
      <Icon size={18} className="text-white" />
    </a>
  );
}


import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetPublicNavbarQuery } from "../redux/apis/navbarApi";
import { useGetPublicFooterQuery } from "../redux/apis/footerApi";
import { useNavigate } from "react-router-dom";

const socialIcons = [
  { Icon: Facebook, link: "https://facebook.com" },
  { Icon: FaXTwitter, link: "https://x.com" },
  { Icon: Instagram, link: "https://instagram.com" },
];

const ourCities = [
"MUMBAI",
"PUNE",
"BENGALURU",
"CHH . SAMBHAJI NAGAR",
"SATARA",
"HINGOLI",
"PARBHANI",
"BEED",
];

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

function InfoCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#2563EB]">
          <MapPin size={18} />
        </span>
        <p className="font-semibold text-white">{title}</p>
      </div>
      <p className="mt-4 text-sm leading-6 text-blue-50 whitespace-pre-line break-words">
        {text}
      </p>
    </div>
  );
}

export default function PublicFooter() {
  const { data: navbar } = useGetPublicNavbarQuery();
  const { data: footer } = useGetPublicFooterQuery();

  const navigate = useNavigate();
  const logo = navbar?.logo;
  const siteName = "Cadma Associates Pvt Ltd";

  return (
    <footer className="bg-gradient-to-br bg-blue-500 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
          
<div className="flex items-center gap-4">
  <img
    src="/CAFooterLogo.jpeg"
    alt="CADMA"
    className="h-20 sm:h-24 md:h-28 w-auto object-contain"
  />
</div>

<p className="mt-5 max-w-md text-sm leading-7 text-blue-50 uppercase">
{footer?.description || (
<>
CADMA ASSOCIATES PVT LTD IS A PROFESSIONAL COMPANY <br />
PROVIDING PROFESSIONAL SERVICES LIKE INCOME TAX, GST, COMPANY
INCORPORATION, AUDIT, ACCOUNTING, AND ADVISORY SERVICES ACROSS INDIA.
</>
)}
</p>

            <div className="mt-6 flex gap-3">
              {socialIcons.map(({ Icon, link }, index) => (
                <SocialIcon key={index} Icon={Icon} link={link} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold">QUICK LINKS</h3>
            <ul className="mt-5 space-y-3 text-sm text-blue-50">
              <li><Link to="/" className="hover:text-white">HOME</Link></li>
              <li><Link to="/about" className="hover:text-white">ABOUT</Link></li>
              <li><Link to="/services" className="hover:text-white">SERVICES</Link></li>
              <li><Link to="/tax-updates" className="hover:text-white">LATEST UPDATE</Link></li>
              <li><Link to="/contact" className="hover:text-white">CONTACT</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold">IMPORTANT LINKS</h3>
            <ul className="mt-5 space-y-3 text-sm text-blue-50">
              <li><Link to="/privacy" className="hover:text-white">PRIVACY POLICY</Link></li>
              <li><Link to="/terms" className="hover:text-white">TERMS & CONDITIONS</Link></li>
              <li><Link to="/disclaimer" className="hover:text-white">DISCLAIMER</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white">REFUND POLICY</Link></li>
            </ul>
          </div>


<div className="lg:col-span-4">
  <h3 className="text-lg font-semibold">CONTACT US</h3>

  <div className="mt-5 space-y-4">

    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 w-full">
      <Phone size={18} className="shrink-0 text-white" />
      <p className="text-md text-blue-50 break-all">
        {footer?.phone || "+91 9921055588"}
      </p>
    </div>

    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 w-full">
      <Mail size={18} className="shrink-0 text-white" />
      <p className="text-md text-blue-50 break-all">
        {footer?.email || "support@cadmaassociatespvtltd.com"}
      </p>
    </div>

  </div>
</div>
        </div>

       <div className="mt-12">
  <h3 className="mb-4 text-center text-2xl font-bold text-white">
    OUR CITIES
  </h3>

  <div className="flex flex-nowrap justify-center gap-4 overflow-x-auto whitespace-nowrap text-sm sm:text-base text-blue-50">
    <span>MUMBAI</span>
    <span>PUNE</span>
    <span>BENGALURU</span>
    <span>CHH . SAMBHAJI NAGAR</span>
    <span>SATARA</span>
    <span>HINGOLI</span>
    <span>PARBHANI</span>
    <span>BEED</span>
 
  </div>
</div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">

          <InfoCard
          title="CHH . SAMBHAJINAGAR"
text={`FIRST FLOOR , 265 , ANUVIHAR COMPLEX , OPP YADAV TYRE , SAMARTH NAGAR`}
          />

          <InfoCard
           title="NAVI MUMBAI"
text={`OFFICE NO. 40 , SECOND FLOOR ,
CRYSTAL PLAZA , HIRANANDANI , SECTOR - 07 , KHARGHAR , NAVI MUMBAI - 410210`}
          />

          <InfoCard
          title="PUNE"
text={`FERGUSSON COLLEGE RD , MANTRI HOUSE , SHIVAJINAGAR , PUNE , MAHARASHTRA 411004`}
          />
       
        </div>
     

        <div className="mt-12 border-t border-white/15 pt-6 text-center">
  
  <p className="text-md text-white">
    © {new Date().getFullYear()} CADMA ASSOCIATES PVT LTD . ALL RIGHTS RESERVED.
  </p>

  {/* Small Admin Button */}
  <button
    onClick={() => navigate("/admin")}
    className="mt-3 text-xs px-4 py-1 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
  >
   ADMIN PANEL
  </button>

</div>
      </div>
    </footer>
  );
}
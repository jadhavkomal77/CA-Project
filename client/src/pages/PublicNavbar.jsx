import { Phone, ChevronDown, Menu, X } from "lucide-react";
import { useGetPublicNavbarQuery } from "../redux/apis/navbarApi";
import { useGetPublicServicesQuery } from "../redux/apis/serviceApi";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PublicNavbar() {
  const { data, isLoading } = useGetPublicNavbarQuery();
  const { data: services, isLoading: servicesLoading } =
    useGetPublicServicesQuery();

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* ================= LOGO ================= */}
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => navigate("/")}
          >
            {data.logoImage && (
              <img
                src={data.logoImage}
                alt="CADMA Logo"
                className="h-16 md:h-20 w-auto object-contain"
              />
            )}

            <div className="flex flex-col leading-tight">
              <span className="text-base md:text-lg font-bold text-gray-900 tracking-wide">
                CHARTERED
              </span>
              <span className="text-[11px] md:text-xs text-yellow-600 tracking-[2px] uppercase font-medium">
                ACCOUNTANT SERVICES
              </span>
            </div>
          </div>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden md:flex items-center gap-8 relative">
            {data.menu.map((item, index) => {
              if (item.label === "Services") {
                return (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={handleOpen}
                    onMouseLeave={handleClose}
                  >
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-yellow-600 transition">
                      Services <ChevronDown size={14} />
                    </button>

                    {open && services?.length > 0 && (
                      <div className="absolute left-0 top-full mt-3 bg-white rounded-xl shadow-xl w-64 py-3">
                        {services.map((service) => (
                          <button
                            key={service._id}
                            onClick={() =>
                              handleNavigate(`/services/${service.slug}`)
                            }
                            className="block w-full text-left px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600 transition"
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
                  className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* ================= RIGHT SIDE ================= */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <Phone size={16} className="text-yellow-600" />
              <span>{data.phone}</span>
            </div>

            <button
              onClick={() => navigate("/contact")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition shadow-sm"
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
          {data.menu.map((item, index) => {
            if (item.label === "Services") {
              return (
                <div key={index}>
                  <p className="font-semibold mb-2 text-gray-800 text-sm">
                    Services
                  </p>
                  {services?.map((service) => (
                    <button
                      key={service._id}
                      onClick={() =>
                        handleNavigate(`/services/${service.slug}`)
                      }
                      className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm"
                    >
                      {service.title}
                    </button>
                  ))}
                </div>
              );
            }

            return (
              <button
                key={index}
                onClick={() => handleNavigate(item.link)}
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm"
              >
                {item.label}
              </button>
            );
          })}

          <div className="flex items-center gap-2 pt-3 text-yellow-600 text-sm">
            <Phone size={16} />
            <span>{data.phone}</span>
          </div>

          <button
            onClick={() => handleNavigate("/contact")}
            className="w-full mt-4 bg-yellow-600 text-white py-3 rounded-full text-sm font-semibold"
          >
            Get Consultation
          </button>
        </div>
      )}
    </header>
  );
}

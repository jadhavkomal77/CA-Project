import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  ClipboardList,
  IndianRupee,
  Sparkles,
} from "lucide-react";

import { useGetAllContactsQuery } from "../redux/apis/contactApi";
import { useGetPublicProjectsQuery } from "../redux/apis/projectApi";
import { useGetAdminProjectsQuery } from "../redux/apis/projectApi";

export default function AdminHome() {
  const navigate = useNavigate();

  const { data: clients = [] } = useGetPublicProjectsQuery();
  const { data: enquiries = [] } = useGetAllContactsQuery();
  const { data: filings = [] } = useGetAdminProjectsQuery();

  const stats = [
    { title: "Clients", value: clients.length, icon: Users },
    { title: "Returns", value: filings.length, icon: FileText },
    { title: "Enquiries", value: enquiries.length, icon: ClipboardList },
    { title: "Revenue", value: "₹ 0", icon: IndianRupee },
  ];

  return (
    <div className="min-h-screen px-8 py-12 space-y-12 bg-gradient-to-br from-slate-50 via-white to-indigo-50">

      {/* HEADER */}
      <motion.div
        initial={{opacity:0,y:-20}}
        animate={{opacity:1,y:0}}
        className="
        bg-white rounded-3xl border border-gray-200
        p-8 shadow-sm flex justify-between items-center
        "
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-indigo-600"/>
            <span className="text-xs font-semibold tracking-wider text-indigo-600">
              ADMIN DASHBOARD
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Here’s what’s happening with your business today.
          </p>
        </div>

        <div className="hidden md:block text-right">
          <p className="text-xs text-gray-400">System Status</p>
          <p className="text-green-600 font-semibold text-sm">
            ● Running Smoothly
          </p>
        </div>
      </motion.div>


      {/* STATS */}
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item,i)=>{
          const Icon=item.icon;
          return(
            <motion.div
              key={i}
              whileHover={{y:-8,scale:1.02}}
              transition={{duration:0.25}}
              className="
              relative bg-white border border-gray-200
              rounded-2xl p-6 shadow-sm
              hover:shadow-xl transition
              "
            >

              {/* glow line */}
              <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-indigo-500 to-purple-500"/>

              <div className="flex justify-between mb-5 mt-2">
                <p className="text-sm font-medium text-gray-500">
                  {item.title}
                </p>

                <div className="p-2 rounded-lg bg-indigo-50">
                  <Icon size={18} className="text-indigo-600"/>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                {item.value}
              </h2>
            </motion.div>
          )
        })}
      </div>


      {/* QUICK ACTIONS */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-6">
          Quick Actions
        </h3>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">

          <ActionCard
            title="View Enquiries"
            desc="Check customer messages"
            onClick={()=>navigate("/admin/contacts")}
          />

          <ActionCard
            title="Profile Settings"
            desc="Update account details"
            onClick={()=>navigate("/admin/profile")}
          />

        </div>
      </div>

    </div>
  );
}


/* ACTION CARD */
const ActionCard = ({title,desc,onClick}) => (
  <motion.div
    whileHover={{scale:1.05}}
    whileTap={{scale:0.97}}
    onClick={onClick}
    className="
      cursor-pointer bg-white border border-gray-200 rounded-xl
      p-6 shadow-sm hover:shadow-xl transition
    "
  >
    <p className="font-semibold text-gray-800">{title}</p>
    <p className="text-sm text-gray-500 mt-1">{desc}</p>
  </motion.div>
);



import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";

import { useGetAllContactsQuery } from "../redux/apis/contactApi";
import {
  useGetAdminProjectsQuery,
  useGetPublicProjectsQuery,
} from "../redux/apis/projectApi";

export default function AdminHome() {
  const navigate = useNavigate();

  const { data: products = [] } = useGetPublicProjectsQuery();
  const { data: contacts = [] } = useGetAllContactsQuery();
  const { data: projects = [] } = useGetAdminProjectsQuery();

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      gradient: "from-indigo-500 to-indigo-700",
      desc: "All active products",
    },
    {
      title: "Total Projects",
      value: projects.length,
      gradient: "from-green-500 to-green-700",
      desc: "All completed projects",
    },
    {
      title: "Pending Enquiries",
      value: contacts.length,
      gradient: "from-yellow-500 to-yellow-600",
      desc: "Customer contact requests",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 p-4 md:p-6 space-y-10 min-h-screen">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Manage Products • Projects • Enquiries
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -6, scale: 1.03 }}
            transition={{ duration: 0.25 }}
            className={`p-6 rounded-2xl shadow-xl text-white bg-gradient-to-r ${item.gradient}`}
          >
            <p className="text-sm">{item.title}</p>
            <h2 className="text-4xl font-bold mt-2">{item.value}</h2>
            <p className="mt-2 text-sm opacity-90">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <ActionBtn label="All Services" onClick={() => navigate("/admin/serviceslist")} />
          <ActionBtn label="Manage Projects" onClick={() => navigate("/admin/projects")} />
          <ActionBtn label="View Enquiries" onClick={() => navigate("/admin/contacts")} />
          <ActionBtn label="Profile Settings" onClick={() => navigate("/admin/profile")} />
        </div>
      </div>
    </div>
  );
}

/* ================= ACTION BUTTON ================= */
const ActionBtn = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="
      bg-gray-100 hover:bg-indigo-600 hover:text-white
      transition rounded-xl py-3 px-4 text-sm font-semibold shadow
    "
  >
    {label}
  </button>
);

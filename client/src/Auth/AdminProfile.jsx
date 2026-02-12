// import React, { useEffect, useState } from "react";
// import {
//   useAdminProfileQuery,
//   useUpdateAdminProfileMutation,
//   useChangePasswordMutation,
// } from "../redux/apis/adminApi";
// import { toast } from "react-toastify";
// import { Eye, EyeOff } from "lucide-react";

// const AdminProfile = () => {
//   /* ================= API ================= */
//   const { data, isLoading, refetch } = useAdminProfileQuery();
//   const [updateProfile, { isLoading: updating }] =
//     useUpdateAdminProfileMutation();
//   const [changePassword, { isLoading: changing }] =
//     useChangePasswordMutation();

//   /* ================= STATE ================= */
//   const [profileData, setProfileData] = useState({
//     name: "",
//       email: "",
//     phone: "",
//   });

//   const [passwordData, setPasswordData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState({
//     old: false,
//     new: false,
//     confirm: false,
//   });

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");

//   /* ================= LOAD PROFILE ================= */
//   useEffect(() => {
//     if (data?.admin) {
//       setProfileData({
//         name: data.admin.name || "",
//         phone: data.admin.phone || "",
//       });
//       setPreview(data.admin.profile?.url || "");
//     }
//   }, [data]);

//   /* ================= HANDLERS ================= */
//   const handleProfileChange = (e) => {
//     setProfileData({ ...profileData, [e.target.name]: e.target.value });
//   };

//   const handlePasswordChange = (e) => {
//     setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   /* ================= UPDATE PROFILE ================= */
//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();

//     const payload = new FormData();
//     payload.append("name", profileData.name);
//     payload.append("phone", profileData.phone);
//     if (image) payload.append("profileImage", image);

//     try {
//       await updateProfile(payload).unwrap();
//       toast.success("Profile updated successfully");
//       refetch();
//     } catch (err) {
//       toast.error(err?.data?.message || "Profile update failed");
//     }
//   };

//   /* ================= CHANGE PASSWORD ================= */
//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();

//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       return toast.error("New password & confirm password mismatch");
//     }

//     try {
//       await changePassword({
//         oldPassword: passwordData.oldPassword,
//         newPassword: passwordData.newPassword,
//       }).unwrap();

//       toast.success("Password changed successfully");

//       setPasswordData({
//         oldPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       toast.error(err?.data?.message || "Password change failed");
//     }
//   };

//   if (isLoading) {
//     return <div className="p-10 text-center">Loading profile...</div>;
//   }

//   const admin = data?.admin;

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-8">
//       <h1 className="text-2xl font-bold">Admin Profile</h1>

//       {/* ================= PROFILE CARD ================= */}
//       <div className="bg-white shadow rounded-lg p-6 flex items-center gap-6">
//         <img
//           src={
//             preview ||
//             "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//           }
//           alt="Admin"
//           className="w-24 h-24 rounded-full object-cover border"
//         />
//         <div>
//           <h2 className="text-xl font-semibold">{admin?.name}</h2>
//           <p className="text-gray-600">{admin?.email}</p>
//           <p className="text-gray-500 text-sm">Role: Admin</p>
//         </div>
//       </div>

//       {/* ================= UPDATE PROFILE ================= */}
//       <form
//         onSubmit={handleProfileSubmit}
//         className="bg-white shadow rounded-lg p-6 space-y-5"
//       >
//         <h2 className="text-lg font-semibold">Update Profile</h2>

//         <div>
//           <label className="block text-sm font-medium mb-1">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={profileData.name}
//             onChange={handleProfileChange}
//             className="w-full border rounded px-3 py-2"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={profileData.phone}
//             onChange={handleProfileChange}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Profile Image
//           </label>
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//         </div>

//         <button
//           type="submit"
//           disabled={updating}
//           className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
//         >
//           {updating ? "Updating..." : "Save Changes"}
//         </button>
//       </form>

//       {/* ================= CHANGE PASSWORD (WITH EYE ICON) ================= */}
//       <form
//         onSubmit={handlePasswordSubmit}
//         className="bg-white shadow rounded-lg p-6 space-y-5"
//       >
//         <h2 className="text-lg font-semibold">Change Password</h2>

//         {/* OLD PASSWORD */}
//         <PasswordInput
//           label="Old Password"
//           name="oldPassword"
//           value={passwordData.oldPassword}
//           onChange={handlePasswordChange}
//           show={showPassword.old}
//           toggle={() =>
//             setShowPassword({ ...showPassword, old: !showPassword.old })
//           }
//         />

//         {/* NEW PASSWORD */}
//         <PasswordInput
//           label="New Password"
//           name="newPassword"
//           value={passwordData.newPassword}
//           onChange={handlePasswordChange}
//           show={showPassword.new}
//           toggle={() =>
//             setShowPassword({ ...showPassword, new: !showPassword.new })
//           }
//         />

//         {/* CONFIRM PASSWORD */}
//         <PasswordInput
//           label="Confirm New Password"
//           name="confirmPassword"
//           value={passwordData.confirmPassword}
//           onChange={handlePasswordChange}
//           show={showPassword.confirm}
//           toggle={() =>
//             setShowPassword({
//               ...showPassword,
//               confirm: !showPassword.confirm,
//             })
//           }
//         />

//         <button
//           type="submit"
//           disabled={changing}
//           className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
//         >
//           {changing ? "Updating..." : "Change Password"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminProfile;

// /* ================= REUSABLE PASSWORD INPUT ================= */

// const PasswordInput = ({
//   label,
//   name,
//   value,
//   onChange,
//   show,
//   toggle,
// }) => (
//   <div>
//     <label className="block text-sm font-medium mb-1">{label}</label>
//     <div className="relative">
//       <input
//         type={show ? "text" : "password"}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full border rounded px-3 py-2 pr-10"
//         required
//       />
//       <button
//         type="button"
//         onClick={toggle}
//         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//       >
//         {show ? <EyeOff size={18} /> : <Eye size={18} />}
//       </button>
//     </div>
//   </div>
// );






import React, { useEffect, useState } from "react";
import {
  useAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useChangePasswordMutation,
} from "../redux/apis/adminApi";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const AdminProfile = () => {
  /* ================= API ================= */
  const { data, isLoading, refetch } = useAdminProfileQuery();
  const [updateProfile, { isLoading: updating }] =
    useUpdateAdminProfileMutation();
  const [changePassword, { isLoading: changing }] =
    useChangePasswordMutation();

  /* ================= STATE ================= */
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    email: "", // ✅ email added
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    if (data?.admin) {
      setProfileData({
        name: data.admin.name || "",
        phone: data.admin.phone || "",
        email: data.admin.email || "", // ✅
      });
      setPreview(data.admin.profile?.url || "");
    }
  }, [data]);

  /* ================= HANDLERS ================= */
  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /* ================= UPDATE PROFILE ================= */
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", profileData.name);
    payload.append("phone", profileData.phone);
    payload.append("email", profileData.email); // ✅
    if (image) payload.append("profileImage", image);

    try {
      await updateProfile(payload).unwrap();
      toast.success("Profile updated successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Profile update failed");
    }
  };

  /* ================= CHANGE PASSWORD ================= */
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("New password & confirm password mismatch");
    }

    try {
      await changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      }).unwrap();

      toast.success("Password changed successfully");

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err?.data?.message || "Password change failed");
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  const admin = data?.admin;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Admin Profile</h1>

      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white shadow rounded-lg p-6 flex items-center gap-6">
        <img
          src={
            preview ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="Admin"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-xl font-semibold">{admin?.name}</h2>
          <p className="text-gray-600">{admin?.email}</p>
          <p className="text-gray-500 text-sm">Role: Admin</p>
        </div>
      </div>

      {/* ================= UPDATE PROFILE ================= */}
      <form
        onSubmit={handleProfileSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-5"
      >
        <h2 className="text-lg font-semibold">Update Profile</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleProfileChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={profileData.phone}
            onChange={handleProfileChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* ✅ EMAIL FIELD */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Profile Image
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button
          type="submit"
          disabled={updating}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {updating ? "Updating..." : "Save Changes"}
        </button>
      </form>

      {/* ================= CHANGE PASSWORD ================= */}
      <form
        onSubmit={handlePasswordSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-5"
      >
        <h2 className="text-lg font-semibold">Change Password</h2>

        <PasswordInput
          label="Old Password"
          name="oldPassword"
          value={passwordData.oldPassword}
          onChange={handlePasswordChange}
          show={showPassword.old}
          toggle={() =>
            setShowPassword({ ...showPassword, old: !showPassword.old })
          }
        />

        <PasswordInput
          label="New Password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
          show={showPassword.new}
          toggle={() =>
            setShowPassword({ ...showPassword, new: !showPassword.new })
          }
        />

        <PasswordInput
          label="Confirm New Password"
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handlePasswordChange}
          show={showPassword.confirm}
          toggle={() =>
            setShowPassword({
              ...showPassword,
              confirm: !showPassword.confirm,
            })
          }
        />

        <button
          type="submit"
          disabled={changing}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {changing ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;

/* ================= PASSWORD INPUT ================= */

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  show,
  toggle,
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded px-3 py-2 pr-10"
        required
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>
);

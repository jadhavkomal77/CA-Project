import React, { useEffect, useState } from "react";
import {
  useGetAdminProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../redux/apis/projectApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddAdminProject() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: projects = [] } = useGetAdminProjectsQuery();
  const project = projects.find((p) => p._id === id);

  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const [form, setForm] = useState({
    title: "",
    category: "",
    shortDesc: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title,
        category: project.category,
        shortDesc: project.shortDesc,
        description: project.description || "",
      });
    }
  }, [project]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (file) => {
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Only JPG, PNG, WEBP allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    setImage(file);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.category || !form.shortDesc) {
      toast.error("Please fill required fields");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (image) formData.append("image", image);

    try {
      if (id) {
        await updateProject({ id, data: formData }).unwrap();
        toast.success("Project updated");
      } else {
        await createProject(formData).unwrap();
        toast.success("Project created");
      }
      navigate("/admin/projects");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">
        {id ? "Edit Project" : "Add Project"}
      </h1>

      <div className="space-y-4">
        <input
          name="title"
          placeholder="Project Title"
          className="w-full border rounded-lg p-3"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category (eg. Residential, Factory, Solar)"
          className="w-full border rounded-lg p-3"
          value={form.category}
          onChange={handleChange}
        />

        <textarea
          name="shortDesc"
          placeholder="Short Description"
          className="w-full border rounded-lg p-3"
          rows={3}
          value={form.shortDesc}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Full Description"
          className="w-full border rounded-lg p-3"
          rows={5}
          value={form.description}
          onChange={handleChange}
        />

        {/* IMAGE */}
        <div>
          <label className="block font-medium mb-2">Project Image</label>

          <div className="flex items-center gap-4">
            <label className="cursor-pointer inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg">
              Choose Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImage(e.target.files[0])}
              />
            </label>

            <span className="text-sm text-gray-600">
              {image ? image.name : "No file selected"}
            </span>
          </div>

          {(image || project?.image) && (
            <img
              src={image ? URL.createObjectURL(image) : project.image}
              alt="preview"
              className="h-32 mt-3 rounded-lg border object-cover"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-semibold"
        >
          {id ? "Update Project" : "Create Project"}
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProjectBySlugQuery,
  useGetPublicProjectsQuery,
} from "../redux/apis/projectApi";
import { motion } from "framer-motion";

export default function CaseStudyDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: project, isLoading } = useGetProjectBySlugQuery(slug);
  const { data: projects = [] } = useGetPublicProjectsQuery();

  const [activeImg, setActiveImg] = useState(0);

  // ✅ SEO
  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Case Study`;

      let metaDesc = document.querySelector("meta[name='description']");
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content =
        project.shortDesc || "Professional case study details";
    }
  }, [project]);

  if (isLoading)
    return <div className="p-20 text-center">Loading case study...</div>;

  if (!project)
    return <div className="p-20 text-center">Case study not found</div>;

  const images = project.images?.length
    ? project.images
    : [project.image];

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <section className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/casestudies")}
          className="mb-8 text-blue-600 hover:underline font-medium"
        >
          ← Back to Case Studies
        </button>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

          {/* IMAGE */}
          <div>
            <motion.img
              key={images[activeImg]}
              src={images[activeImg]}
              alt={project.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-[420px] object-cover rounded-3xl shadow-lg"
            />

            {images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setActiveImg(i)}
                    className={`h-20 w-24 object-cover rounded-lg cursor-pointer border-2 transition
                      ${
                        i === activeImg
                          ? "border-blue-600"
                          : "border-transparent"
                      }
                    `}
                  />
                ))}
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div>

            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {project.category}
            </span>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {project.title}
            </h1>

            <p className="text-gray-600 text-lg mb-6">
              {project.shortDesc}
            </p>

            <div className="text-gray-700 leading-relaxed space-y-4">
              {project.description}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <button
                onClick={() => navigate("/contact")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition"
              >
                Get Professional Consultation
              </button>
            </div>

          </div>
        </div>

        {/* NEXT / PREVIOUS */}
        <div className="mt-16 flex justify-between items-center border-t pt-6">
          {prevProject ? (
            <button
              onClick={() =>
                navigate(`/casestudies/${prevProject.slug}`)

              }
              className="text-blue-600 hover:underline font-medium"
            >
              ← {prevProject.title}
            </button>
          ) : <span />}

          {nextProject && (
            <button
              onClick={() =>
               navigate(`/casestudies/${nextProject.slug}`)

              }
              className="text-blue-600 hover:underline font-medium"
            >
              {nextProject.title} →
            </button>
          )}
        </div>

      </div>
    </section>
  );
}

import { useGetPublicAboutQuery } from "../redux/apis/aboutApi";
import { useNavigate } from "react-router-dom";

export default function About() {

  const { data: about, isLoading } = useGetPublicAboutQuery();
  const navigate = useNavigate();

  if (isLoading || !about) return null;


 const highlightNames = (text) => {

  if (!text) return "";

  return text

    .replace(
      "CADMA Associates Pvt. Ltd.",
      "<strong>CADMA Associates Pvt. Ltd.</strong>"
    )

    .replace(
      "30 years",
      "<strong>30 years</strong>"
    )

    .replace(
      "Shri Datta Alse",
      "<strong>Shri Datta Alse</strong>"
    )

    .replace(
      "Alse Rajiv & Company",
      "<strong>Alse Rajiv & Company</strong>"
    )

    .replace(
      "Shri Rajiv Alse",
      "<strong>Shri Rajiv Alse</strong>"
    );

};


  return (

    <section className="bg-gray-50 py-16">

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-14 items-center">


        {/* IMAGE */}
        <div className="relative">

          <img
            src={about.image}
            alt="About CA Firm"
            className="w-full h-[420px] object-cover rounded-3xl shadow-xl"
          />


          {/* EXPERIENCE BOX */}
          <div className="absolute bottom-4 right-4 sm:-bottom-6 sm:-right-6 bg-white px-5 py-3 sm:px-6 sm:py-4 rounded-2xl shadow-lg border border-gray-100">

            <div className="relative inline-block">

              <span className="text-3xl sm:text-4xl font-bold text-blue-600">
                {about.experience}
              </span>

              <span className="absolute -top-2 -right-2 sm:-right-3 text-lg sm:text-xl font-bold text-blue-600">
                +
              </span>

            </div>

            <p className="text-xs sm:text-sm text-gray-800 font-medium mt-1">
              Years of Experience
            </p>

          </div>

        </div>



        {/* TEXT */}
        <div>

          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold tracking-wide mb-4">
            About Our Firm
          </span>


          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            {about.title}
          </h2>


          {/* DESCRIPTION 1 */}
          <p
            className="text-black leading-relaxed mb-4"
            dangerouslySetInnerHTML={{
              __html: highlightNames(about.description1)
            }}
          />


          {/* DESCRIPTION 2 */}
          {about.description2 && (

            <p
              className="text-black leading-relaxed mb-8"
              dangerouslySetInnerHTML={{
                __html: highlightNames(about.description2)
              }}
            />

          )}



          <button
            onClick={() => navigate("/about-details")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition"
          >
            Read More
          </button>

        </div>


      </div>

    </section>

  );

}
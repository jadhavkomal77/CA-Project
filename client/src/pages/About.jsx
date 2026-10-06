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

   
    <section className="bg-gray-50 py-10 sm:py-12 md:py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

    {/* IMAGE CARD */}
    <div className="relative bg-white p-3 sm:p-5 md:p-6 rounded-3xl shadow-lg">

      <img
        src={about.image}
        alt="About CA Firm"
        className="w-full h-auto max-h-[260px] sm:max-h-[350px] md:max-h-[450px] object-contain rounded-2xl"
      />

</div>

    {/* TEXT SECTION */}
    <div className="text-center lg:text-left">

      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 sm:px-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wide mb-3 sm:mb-4">
        ABOUT OUR FIRM
      </span>

      <h2 className="
        text-xl sm:text-2xl md:text-3xl lg:text-4xl 
        font-bold uppercase tracking-wide text-blue-600 
        leading-snug mb-4 sm:mb-6
      ">
        A LEGACY OF TRUST AND EXPERTISE FOR OVER 30 YEARS
      </h2>

      {/* DESCRIPTION 1 */}
      <p
        className="text-gray-800 leading-relaxed mb-4 text-xs sm:text-sm md:text-base uppercase tracking-wide"
        dangerouslySetInnerHTML={{
          __html: highlightNames(about.description1)
        }}
      />

      {/* DESCRIPTION 2 */}
      {about.description2 && (
        <p
          className="text-gray-800 leading-relaxed mb-6 text-xs sm:text-sm md:text-base uppercase tracking-wide"
          dangerouslySetInnerHTML={{
            __html: highlightNames(about.description2)
          }}
        />
      )}

      <button
        onClick={() => navigate("/about-details")}
        className="
          bg-blue-600 hover:bg-blue-700 
          text-white 
          px-6 sm:px-7 md:px-8 
          py-2.5 sm:py-3 
          text-xs sm:text-sm md:text-base
          rounded-lg font-semibold 
          shadow-md transition uppercase tracking-wide
        "
      >
        READ MORE
      </button>

    </div>

  </div>
</section>

  );

}
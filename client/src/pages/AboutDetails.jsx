

import { useGetPublicAboutQuery } from "../redux/apis/aboutApi";
import { motion } from "framer-motion";
import AboutStatCard from "../components/AboutStatCard";
import AboutTeamPage from "./AboutTeamPage";
import ClientsSection from "./ClientsSection";

export default function AboutDetails() {

  const { data: about, isLoading } = useGetPublicAboutQuery();

  if (isLoading || !about)
    return <p className="text-center py-20 uppercase tracking-wide text-gray-600">LOADING...</p>;


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

    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50">


      {/* HERO */}
      <section className="py-10 md:py-12 text-center px-4">

        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
        >

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-blue-600 tracking-wide mb-4 md:mb-6">
            ABOUT OUR FIRM
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg uppercase tracking-wide">
            PROFESSIONAL CONSULTING AND FINANCIAL ADVISORY FIRM DELIVERING TRUSTED
            SERVICES WITH EXCELLENCE AND INTEGRITY.
          </p>

        </motion.div>

      </section>



      {/* CONTENT */}
      <section className="pb-12 md:pb-16">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 md:gap-12 items-center">


          {/* IMAGE */}
          <motion.img
            initial={{ opacity:0, scale:.95 }}
            animate={{ opacity:1, scale:1 }}
            src={about.image}
            className="rounded-3xl shadow-2xl w-full object-cover h-[360px] sm:h-[420px] md:h-[520px]"
          />


          {/* TEXT */}
          <motion.div
            initial={{ opacity:0, x:40 }}
            animate={{ opacity:1, x:0 }}
          >

            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-blue-600 tracking-wide mb-4 md:mb-6">
              A LEGACY OF TRUST AND EXPERTISE FOR OVER 30 YEARS
            </h2>


            {/* DESCRIPTION 1 */}
            <p
              className="text-gray-900 leading-relaxed mb-4 text-sm sm:text-base uppercase tracking-wide"
              dangerouslySetInnerHTML={{
                __html: highlightNames(about.description1)
              }}
            />


            {/* DESCRIPTION 2 */}
            {about.description2 && (

              <p
                className="text-gray-900 leading-relaxed mb-4 text-sm sm:text-base uppercase tracking-wide"
                dangerouslySetInnerHTML={{
                  __html: highlightNames(about.description2)
                }}
              />

            )}



            {/* Stats */}
            <div className="mt-6 md:mt-8 grid grid-cols-2 gap-4 md:gap-6">
              <AboutStatCard value={about.experience} label="YEARS EXPERIENCE" />
              <AboutStatCard value="5000" label="CLIENTS SERVED" />
            </div>


          </motion.div>

        </div>

      </section>



      {/* TEAM MEMBERS */}
      {about.teamMembers?.length > 0 && (

        <section className="pb-16">

          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            <h2 className="text-3xl font-bold uppercase text-center mb-12 text-blue-600">
              MEET OUR TEAM
            </h2>


            <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-10">

              {about.teamMembers.map((m, i) => (

                <motion.div
                  key={i}
                  initial={{ opacity:0, y:30 }}
                  whileInView={{ opacity:1, y:0 }}
                  transition={{ delay: i * .1 }}
                  className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition duration-300"
                >


                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-full mx-auto mb-6 border-4 border-blue-200 shadow-lg"
                  />


                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 uppercase tracking-wide">
                    {m.name}
                  </h3>


                  <p className="text-gray-800 text-sm md:text-base mt-3 uppercase tracking-wide">
                    {m.shortDetails}
                  </p>


                </motion.div>

              ))}

            </div>

          </div>

        </section>

      )}

<ClientsSection/>
      <AboutTeamPage/>



      {/* CTA */}
      <section className="py-8 text-center px-4">

        <h2 className="text-2xl md:text-3xl font-bold uppercase text-blue-600 mb-3 md:mb-4">
          NEED PROFESSIONAL FINANCIAL GUIDANCE?
        </h2>

        <p className="opacity-80 mb-6 md:mb-8 text-sm md:text-base">
          Contact our expert team for consultation and tailored financial solutions.
        </p>


        <button
          onClick={() => window.location.href="/contact"}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition text-sm md:text-base uppercase tracking-wide"
        >
          Contact Now
        </button>

      </section>



    </div>

  );

}
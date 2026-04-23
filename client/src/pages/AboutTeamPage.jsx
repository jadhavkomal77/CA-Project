
// import { useGetAboutTeamQuery } from "../redux/apis/aboutTeamApi";

// const AboutTeamPage = () => {

//   const { data, isLoading, isError } = useGetAboutTeamQuery();

//   const members = data?.data || [];

//   return (

// <section className="bg-gradient-to-b from-white to-slate-50 py-24">

// <div className="max-w-6xl mx-auto px-4">

// <h2 className="text-center text-4xl sm:text-5xl font-bold text-slate-800 mb-16 tracking-wider">

// OUR TEAM

// </h2>


// {isLoading ? (

// <p className="text-center text-slate-500 text-lg">Loading...</p>

// ) : isError ? (

// <p className="text-center text-red-500 text-lg">

// Error loading team

// </p>

// ) : (

// <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-14 text-center">

// {members.map((item) => (

// <div key={item._id} className="group">

// <p className="text-[#3b5fa8] font-extrabold text-xl tracking-wide transition duration-200 group-hover:text-[#2f4c8a]">

// {item.name}

// </p>

// <div className="w-14 h-[2px] bg-[#3b5fa8] mx-auto mt-3 rounded-full opacity-60 group-hover:w-20 transition-all"></div>

// </div>

// ))}

// </div>

// )}

// </div>

// </section>

//   );

// };

// export default AboutTeamPage;





const AboutTeamPage = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="bg-[#2f6fd6] py-4 mb-16">
          <h2 className="text-center text-white text-3xl sm:text-4xl font-bold tracking-widest">
            OUR TEAM
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-16 text-center">

          {/* Column 1 */}
          <div className="space-y-6">
            <div className="group">
              <p className="team-text">ADV. RAMESH BHUME SIR</p>
              <p className="text-sm text-slate-500 mt-1">
                ADDITIONAL COMMISSIONER OF GST (Retd.)
              </p>
              <div className="underline-style"></div>
            </div>

            <div className="group"><p className="team-text">ADV. PRERANA BHUME</p><div className="underline-style"></div></div>
            <div className="group"><p className="team-text">CA. PRAGATI KUMBHAR</p><div className="underline-style"></div></div>
            <div className="group"><p className="team-text">CA. ADINATH KADAM</p><div className="underline-style"></div></div>
            <div className="group"><p className="team-text">CA. MANAV KASLIWAL</p><div className="underline-style"></div></div>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <div className="group"><p className="team-text">CA. GANESH GAIKWAD</p><div className="underline-style"></div></div>
            <div className="group"><p className="team-text">CMA NILESH PATIL</p><div className="underline-style"></div></div>
            <div className="group"><p className="team-text">CA. MANOJ JADHAV</p><div className="underline-style"></div></div>
            <div className="group"><p className="team-text">YOGIRAJ AHERKAR</p><div className="underline-style"></div></div>
            <div className="group"><p className="team-text">MOIN PATHAN</p><div className="underline-style"></div></div>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <div className="group"><p className="team-text">CS. ABHIJEET JAWALEKAR</p><div className="underline-style"></div></div>
            <div className="group"><p className="team-text">AMRUTA KALE</p><div className="underline-style"></div></div>
            <div className="group"><p className="team-text">KRISHNA PAWAR</p><div className="underline-style"></div></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutTeamPage;




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



// const AboutTeamPage = () => {
//   return (
//     <section className="bg-white py-20">
//       <div className="max-w-6xl mx-auto px-4">

//         {/* Heading */}
//         <div className="bg-[#2f6fd6] py-4 mb-16">
//           <h2 className="text-center text-white text-3xl sm:text-4xl font-bold tracking-widest">
//             OUR TEAM
//           </h2>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-16 text-center">

//           <div className="space-y-6">
//             <div className="group">
//               <p className="team-text">ADV. RAMESH BHUME SIR</p>
//               <p className="text-sm text-slate-500 mt-1">
//                 ADDITIONAL COMMISSIONER OF GST (Retd.)
//               </p>
//               <div className="underline-style"></div>
//             </div>

//             <div className="group"><p className="team-text">ADV. PRERANA BHUME</p><div className="underline-style"></div></div>
//             <div className="group"><p className="team-text">CA. PRAGATI KUMBHAR</p><div className="underline-style"></div></div>
//             <div className="group"><p className="team-text">CA. ADINATH KADAM</p><div className="underline-style"></div></div>
//             <div className="group"><p className="team-text">CA. MANAV KASLIWAL</p><div className="underline-style"></div></div>
//           </div>

//           {/* Column 2 */}
//           <div className="space-y-6">
//             <div className="group"><p className="team-text">CA. GANESH GAIKWAD</p><div className="underline-style"></div></div>
//             <div className="group"><p className="team-text">CMA NILESH PATIL</p><div className="underline-style"></div></div>
//             <div className="group"><p className="team-text">CA. MANOJ JADHAV</p><div className="underline-style"></div></div>
//             <div className="group"><p className="team-text">YOGIRAJ AHERKAR</p><div className="underline-style"></div></div>
//             <div className="group"><p className="team-text">MOIN PATHAN</p><div className="underline-style"></div></div>
//           </div>

//           {/* Column 3 */}
//           <div className="space-y-6">
//             <div className="group"><p className="team-text">CS. ABHIJEET JAWALEKAR</p><div className="underline-style"></div></div>
//             <div className="group"><p className="team-text">AMRUTA KALE</p><div className="underline-style"></div></div>
//             <div className="group"><p className="team-text">KRISHNA PAWAR</p><div className="underline-style"></div></div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutTeamPage;


const AboutTeamPage = () => {
  const members = [
    [
      ["ADV. RAMESH BHUME SIR","ADDITIONAL COMMISSIONER OF GST (Retd.)"],
      ["ADV. PRERANA BHUME"],
      ["CA. PRAGATI KUMBHAR"],
      ["CA. ADINATH KADAM"],
      ["CA. MANAV KASLIWAL"],
    ],
    [
      ["CA. GANESH GAIKWAD"],
      ["CMA NILESH PATIL"],
      ["CA. MANOJ JADHAV"],
      ["YOGIRAJ AHERKAR"],
      ["MOIN PATHAN"],
    ],
    [
      ["CS. ABHIJEET JAWALEKAR"],
      ["AMRUTA KALE"],
      ["KRISHNA PAWAR"],
    ]
  ];

  return (
    <section className="bg-white pt-8 md:pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-12">

        {/* Heading */}
        <div className="border-t-4 border-[#2F80ED] pt-8 mb-14">
          <div className="bg-[#2F80ED] py-4">
            <h2 className="text-center text-white text-4xl font-bold tracking-[4px]">
              OUR TEAM
            </h2>
          </div>
        </div>

        {/* Columns */}
        <div className="grid md:grid-cols-3 gap-y-10 gap-x-20">

          {members.map((col,i)=>(
            <div key={i} className="space-y-10">

              {col.map((item,idx)=>(
                <div
                  key={idx}
                  className="w-full max-w-[360px] mx-auto"
                >
                  {/* ALL names same line start */}
                  <h3 className="text-[#1D4ED8] text-2xl font-bold uppercase text-left leading-snug">
                    {item[0]}
                  </h3>

                  {item[1] && (
                    <p className="text-[#2563EB] text-base mt-2 text-left">
                      {item[1]}
                    </p>
                  )}

                  {/* underline same starting line */}
                  <div className="w-32 h-[3px] bg-[#2F80ED] mt-4 rounded-full"></div>
                </div>
              ))}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default AboutTeamPage;
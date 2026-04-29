
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

export default function ContactQR() {
  return (
    <section className="w-full bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">

        {/* LEFT SIDE */}
        <div className="text-center md:text-left space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600 leading-tight drop-shadow-sm">
            LET'S WORK <br /> TOGETHER.
          </h2>

          <p className="text-gray-500 text-sm sm:text-base">
            Partner with us for trusted financial growth and expert solutions.
          </p>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="
          bg-gradient-to-br from-blue-600 to-blue-500 
          text-white rounded-2xl p-6 md:p-8 
          shadow-xl space-y-6
          hover:scale-[1.02] transition duration-300
        ">

          {/* EMAIL */}
          <div className="border-b border-white/20 pb-3">
            <p className="text-xs tracking-wider opacity-80">EMAIL ADDRESS</p>
            <p className="text-base sm:text-lg font-semibold break-all">
              cadmaassociatespvtltd@gmail.com
            </p>
          </div>

          {/* PHONE */}
          <div className="border-b border-white/20 pb-3">
            <p className="text-xs tracking-wider opacity-80">PHONE NO.</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide break-all">
              9921055588
            </p>
          </div>

          {/* CITIES */}
          <div>
            <p className="text-xs tracking-wider opacity-80 mb-1">OUR CITIES</p>
            <p className="text-sm md:text-base font-medium leading-relaxed">
              MUMBAI | PUNE | CHH. SAMBHAJINAGAR <br />
              SATARA | HINGOLI | PARBHANI | BEED
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}


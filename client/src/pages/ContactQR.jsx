// export default function ContactQR() {
//   return (
//     <div className="min-h-[calc(100vh-90px)] bg-gray-100 flex items-center justify-center px-4 py-6">

//       <div className="
//         w-full
//         max-w-5xl
//         bg-white
//         shadow-lg
//         rounded-xl
//         overflow-hidden
//         grid
//         grid-cols-1
//         md:grid-cols-2
//       ">

//         {/* LEFT */}
//         <div className="
//           flex
//           flex-col
//           items-center
//           justify-center
//           text-center
//           px-6
//           py-10
//           md:py-12
//         ">

//           <div className="
//             border-[4px]
//             md:border-[6px]
//             border-blue-500
//             p-2
//             md:p-3
//           ">
//             <img
//               src="/QR.jpeg"
//               alt="QR"
//               className="
//                 w-[150px]
//                 h-[150px]
//                 sm:w-[170px]
//                 sm:h-[170px]
//                 md:w-[200px]
//                 md:h-[200px]
//                 object-contain
//               "
//             />
//           </div>

//           <h2 className="
//             mt-6
//             md:mt-8
//             text-xl
//             sm:text-2xl
//             md:text-[28px]
//             font-bold
//             text-blue-600
//             tracking-wide
//             leading-tight
//           ">
//             LET&apos;S WORK <br />
//             TOGETHER.
//           </h2>

//         </div>


//         {/* RIGHT */}
//         <div className="
//           bg-gradient-to-br
//           from-blue-500
//           to-blue-700
//           text-white
//           flex
//           flex-col
//           justify-center
//           px-6
//           py-10
//           md:px-12
//           md:py-12
//         ">

//           <p className="
//             text-sm
//             md:text-md
//             font-semibold
//             mb-1
//           ">
//             EMAIL ADDRESS
//           </p>

//           <p className="
//             text-sm
//             sm:text-base
//             md:text-lg
//             mb-5
//             break-all
//           ">
//             cadmaassociatespvtltd@gmail.com
//           </p>


//           <p className="
//             text-sm
//             md:text-md
//             font-semibold
//             mb-1
//           ">
//             PHONE NO.
//           </p>

//           <p className="
//             text-xl
//             sm:text-2xl
//             md:text-[30px]
//             font-bold
//             mb-6
//           ">
//             9921055588
//           </p>


//           <p className="
//             text-sm
//             md:text-md
//             font-semibold
//             mb-2
//           ">
//             OUR CITIES
//           </p>

//           <p className="
//             text-sm
//             sm:text-base
//             md:text-md
//             leading-6
//             md:leading-7
//           ">
//             MUMBAI | PUNE | CHH.SAMBHAJINAGAR | SATARA |
//             <br className="hidden md:block"/>
//             HINGOLI | PARBHANI | BEED
//           </p>

//         </div>

//       </div>

//     </div>
//   );
// }


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


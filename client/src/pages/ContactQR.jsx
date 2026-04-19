import React from "react";

export default function ContactQR() {
  return (
    <div className="min-h-[calc(100vh-90px)] bg-gray-100 flex items-center justify-center px-4 py-6">

      <div className="
        w-full
        max-w-5xl
        bg-white
        shadow-lg
        rounded-xl
        overflow-hidden
        grid
        grid-cols-1
        md:grid-cols-2
      ">

        {/* LEFT */}
        <div className="
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-6
          py-10
          md:py-12
        ">

          <div className="
            border-[4px]
            md:border-[6px]
            border-blue-500
            p-2
            md:p-3
          ">
            <img
              src="/paymentQR.jpg"
              alt="QR"
              className="
                w-[150px]
                h-[150px]
                sm:w-[170px]
                sm:h-[170px]
                md:w-[200px]
                md:h-[200px]
                object-contain
              "
            />
          </div>

          <h2 className="
            mt-6
            md:mt-8
            text-xl
            sm:text-2xl
            md:text-[28px]
            font-bold
            text-blue-600
            tracking-wide
            leading-tight
          ">
            LET'S WORK <br />
            TOGETHER.
          </h2>

        </div>


        {/* RIGHT */}
        <div className="
          bg-gradient-to-br
          from-blue-500
          to-blue-700
          text-white
          flex
          flex-col
          justify-center
          px-6
          py-10
          md:px-12
          md:py-12
        ">

          <p className="
            text-sm
            md:text-md
            font-semibold
            mb-1
          ">
            EMAIL ADDRESS
          </p>

          <p className="
            text-sm
            sm:text-base
            md:text-lg
            mb-5
            break-all
          ">
            cadmaassociatespvtltd@gmail.com
          </p>


          <p className="
            text-sm
            md:text-md
            font-semibold
            mb-1
          ">
            PHONE NO.
          </p>

          <p className="
            text-xl
            sm:text-2xl
            md:text-[30px]
            font-bold
            mb-6
          ">
            9921055588
          </p>


          <p className="
            text-sm
            md:text-md
            font-semibold
            mb-2
          ">
            OUR CITIES
          </p>

          <p className="
            text-sm
            sm:text-base
            md:text-md
            leading-6
            md:leading-7
          ">
            MUMBAI | PUNE | CHH.SAMBHAJINAGAR | SATARA |
            <br className="hidden md:block"/>
            HINGOLI | PARBHANI | BEED
          </p>

        </div>

      </div>

    </div>
  );
}
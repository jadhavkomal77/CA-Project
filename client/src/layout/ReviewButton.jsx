// export default function ReviewButton({ footer }) {

// const reviewUrl = `https://www.google.com/search?q=${encodeURIComponent(
//   footer?.companyName || "CADMA ASSOCIATES PVT LTD"
// )}`;

//   return (
//     <a
//       href={reviewUrl}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="
//         fixed bottom-20 right-5 z-50

//         inline-flex items-center gap-2
//         px-4 py-2

//         text-sm

//         bg-white text-blue-700
//         rounded-full font-semibold

//         shadow-md

//         hover:text-black
//         transition
//       "
//     >
//       ⭐ Review Us
//     </a>
//   );
// }



export default function ReviewButton({ footer }) {

const reviewUrl = `https://www.google.com/search?q=${encodeURIComponent(
  footer?.companyName || "CADMA ASSOCIATES PVT LTD"
)}`;

  return (
   <a
  href={reviewUrl}
  target="_blank"
  rel="noopener noreferrer"
  style={{ animation: "pulse 3s ease-in-out infinite" }}  
  className="
    fixed bottom-20 right-5 z-50

    inline-flex items-center gap-2
    px-4 py-2

    text-sm

    bg-white text-blue-700
    rounded-full font-semibold

    shadow-md

    hover:text-black
    transition

    hover:scale-105
    hover:shadow-xl

    ring-2 ring-blue-300
  "
>
      ⭐ Review Us
    </a>
  );
}
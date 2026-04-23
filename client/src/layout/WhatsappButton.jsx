// import { useGetSettingsQuery } from "../redux/apis/settingApi";


// export default function WhatsappButton() {
//   const { data } = useGetSettingsQuery();
// console.log(data);

//   if (!data?.whatsappNumber) return null;

//   return (
//     <a
//       href={`https://wa.me/91${data.whatsappNumber}`}
//       target="_blank"
//       rel="noreferrer"
//       className="fixed bottom-5 right-5 z-50"
//     >
//       <img src="/Logowhatapp.png" alt="whatsapp" width="50" />
//     </a>
//   );
// }



import { useGetSettingsQuery } from "../redux/apis/settingApi";

export default function WhatsappButton() {
  const { data } = useGetSettingsQuery();

  if (!data?.whatsappNumber) return null;

  return (
    <a
      href={`https://wa.me/91${data.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      style={{ animation: "tap 1.5s ease-in-out infinite" }}
      className="fixed bottom-5 right-5 z-50"
    >
      <img
        src="/Logowhatapp.png"
        alt="whatsapp"
        width="50"
        className="drop-shadow-lg"
      />
    </a>
  );
}
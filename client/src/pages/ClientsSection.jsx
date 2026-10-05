import { useGetPublicClientsQuery } from "../redux/apis/clientApi";

export default function ClientsSection() {
  const { data: clients = [], isLoading } = useGetPublicClientsQuery();

  // Nothing uploaded yet (or still loading) → render nothing rather than an
  // empty blue band with a heading and no logos under it.
  if (isLoading || clients.length === 0) return null;

  return (
    <section className="w-full bg-blue-600 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide">
            OUR CLIENTS
          </h2>

          <p className="text-white/90 leading-relaxed max-w-md">
            We&apos;ve provided reliable service to our clientele since our early days.
            We&apos;ve had the honor of being the firm of choice of the following corporations:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {clients.map((client) => (
            <div
              key={client._id}
              className="bg-white rounded-xl p-4 h-24 sm:h-28 flex items-center justify-center shadow"
            >
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

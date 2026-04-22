export default function ClientsSection() {
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

        <div className="space-y-8">
          {[
            "Wonder Constructions",
            "Global Agro Industries",
            "Unity Infra"
          ].map((client, index) => (
            <div key={index}>
              <h3 className="text-lg md:text-xl font-semibold">
                {client}
              </h3>
              <div className="h-[2px] bg-white/70 mt-3"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
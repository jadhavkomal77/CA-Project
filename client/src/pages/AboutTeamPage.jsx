// pages/AboutTeamPage.jsx
import { useGetAboutTeamQuery } from "../redux/apis/aboutTeamApi";

const AboutTeamPage = () => {
  const { data, isLoading, isError } = useGetAboutTeamQuery();
  const members = data?.data || [];

  return (
    <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
            About Team
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Meet the people behind our work
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            A simple, clean team showcase section powered by your admin panel.
          </p>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-slate-500">Loading...</div>
        ) : isError ? (
          <div className="py-20 text-center text-red-500">
            Failed to load team members
          </div>
        ) : members.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500 shadow-sm">
            No team members added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.map((item) => (
              <article
                key={item._id}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={item.img?.url}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-indigo-600">
                    {item.role || "Team Member"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutTeamPage;
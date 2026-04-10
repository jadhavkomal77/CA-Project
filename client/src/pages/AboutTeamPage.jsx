// pages/AboutTeamPage.jsx
import { useGetAboutTeamQuery } from "../redux/apis/aboutTeamApi";

const AboutTeamPage = () => {
  const { data, isLoading, isError } = useGetAboutTeamQuery();
  const members = data?.data || [];

  return (
    <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
         
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Meet Our Team
          </h1>
          
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
  className="group rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
>
  <div className="flex justify-center">
    <div className="h-56 w-56 overflow-hidden rounded-full ring-4 ring-white shadow-md bg-slate-100">
      <img
        src={item.img?.url}
        alt={item.name}
        className="h-full w-full object-cover"
      />
    </div>
  </div>

  <div className="mt-5">
    <h1 className="text-xl font-semibold text-slate-900">
      {item.name}
    </h1>

    <h2 className="mt-1 text-sm text-indigo-600">
      {item.role || "Team Member"}
    </h2>
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
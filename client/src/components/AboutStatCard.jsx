export default function AboutStatCard({ value, label, showPlus = true }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 text-center">
      <h3 className="text-3xl md:text-4xl font-bold text-blue-600">
        {value}
        {showPlus ? (
          <sup className="text-lg md:text-xl align-top ml-1">+</sup>
        ) : null}
      </h3>
      <p className="text-gray-700 text-xs md:text-sm mt-1 uppercase tracking-wide font-semibold">
        {label}
      </p>
    </div>
  );
}

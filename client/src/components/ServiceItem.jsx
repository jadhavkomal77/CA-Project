export default function ServiceItem({ title, description, icon: Icon }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="mb-5 flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gray-200"
        aria-hidden
      >
        <Icon
          className="h-11 w-11 text-blue-600"
          strokeWidth={1.75}
          aria-hidden
        />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-blue-600">{title}</h3>
      <p className="mx-auto max-w-xs text-sm leading-relaxed text-gray-500">
        {description}
      </p>
    </div>
  );
}

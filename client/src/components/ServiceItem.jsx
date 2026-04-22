import { useId } from "react";

/**
 * Single service block: circular gray icon ring, blue Lucide icon, title, description.
 * Matches PDF-style OUR SERVICES rows (no card chrome).
 */
export default function ServiceItem({ title, description, icon: Icon }) {
  const titleId = useId();

  return (
    <article
      className="flex flex-col items-center text-center"
      aria-labelledby={titleId}
    >
      <div
        className="mb-4 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gray-200"
        aria-hidden
      >
        <Icon
          className="h-10 w-10 text-[#2563EB]"
          strokeWidth={1.75}
          aria-hidden
        />
      </div>
      <h3
        id={titleId}
        className="mb-2 max-w-xs text-lg font-bold leading-snug text-[#2563EB]"
      >
        {title}
      </h3>
      <p className="mx-auto max-w-xs text-sm leading-relaxed text-gray-500">
        {description}
      </p>
    </article>
  );
}

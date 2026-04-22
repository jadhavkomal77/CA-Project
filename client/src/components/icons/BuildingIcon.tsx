export default function BuildingIcon({
  size = 48,
  ariaLabel = "Office building icon",
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.8" opacity="0.2" />
      <path
        d="M11 36.5V18.5L20.5 13.5V36.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 36.5V21L30.2 16.5V36.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.2 36.5V24.6L37 21V36.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.3 22H17.2M14.3 26H17.2M23.2 24H26.1M23.2 28H26.1M32.6 28H34.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.5 36.5H38.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

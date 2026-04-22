export default function StartupIcon({
  size = 48,
  ariaLabel = "Startup registration icon",
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
      <circle cx="16.5" cy="17.5" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M10.8 29.8C11.8 25.8 14 23.7 16.6 23.7C19.2 23.7 21.4 25.8 22.4 29.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M24.8 35.8V17.8L31.8 14V35.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.8 35.8V23.8L37.2 21V35.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M27.4 22.8H29.6M27.4 27.2H29.6M33.5 27.2H35.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.8 35.8H38.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function ClipboardCheckIcon({
  size = 48,
  ariaLabel = "Clipboard checklist icon",
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
      <rect
        x="13"
        y="10.8"
        width="22"
        height="27"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="19"
        y="8"
        width="10"
        height="5.6"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M18.5 20.2H28.8M18.5 25.2H28.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M18.2 30.5L20.6 32.9L24.8 28.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="31.4" cy="27.2" r="5.8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M29.1 27.3L31 29.2L33.9 26.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

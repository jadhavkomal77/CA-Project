export default function HandMoneyIcon({
  size = 48,
  ariaLabel = "Hand holding money icon",
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
        d="M8 28.5H14.5C15.4 28.5 16.26 28.84 16.92 29.45L18.7 31.1C19.36 31.71 20.22 32.05 21.12 32.05H28.2C30.02 32.05 31.5 30.57 31.5 28.75C31.5 26.93 30.02 25.45 28.2 25.45H23.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 24.1H14.2L18.44 20.47C19.22 19.8 20.22 19.43 21.25 19.43H24.47C25.67 19.43 26.83 19.87 27.73 20.66L30.4 23"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="32.6"
        y="11.8"
        width="7.4"
        height="9.8"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M35.2 14.5H37.2M36.2 13.4V16.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14.5 21.75L16.15 20.35"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

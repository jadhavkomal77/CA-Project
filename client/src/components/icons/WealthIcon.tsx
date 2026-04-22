export default function WealthIcon({
  size = 48,
  ariaLabel = "Wealth management icon",
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
        d="M17.2 20.5C17.2 17.7 20.3 15.5 24 15.5C27.7 15.5 30.8 17.7 30.8 20.5C30.8 23.3 27.7 25.5 24 25.5C20.3 25.5 17.2 23.3 17.2 20.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M30.8 20.5V28.5C30.8 31.3 27.7 33.5 24 33.5C20.3 33.5 17.2 31.3 17.2 28.5V20.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M24 18.2V22.8M22.2 20.5H24.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M34.2 31.8L36.6 29.4M36.6 29.4L39 31.8M36.6 29.4V35.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 35.5H14M14 35.5L12 33.5M14 35.5L12 37.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

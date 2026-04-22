export default function TaxDocumentIcon({
  size = 48,
  ariaLabel = "Tax document icon",
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
        d="M15 10.8H27.8L33 16V37.2H15V10.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M27.8 10.8V16H33" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M19 20.2H28.8M19 24.8H28.8M19 29.4H24.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="30.8" cy="30.2" r="5.6" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M30.8 27.4V33M28.6 29.6H31.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

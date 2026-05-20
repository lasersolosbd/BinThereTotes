export default function BinIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top face */}
      <polygon
        points="50,8 92,30 50,52 8,30"
        fill="white"
        stroke="#f97316"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Left face */}
      <polygon
        points="8,30 8,70 50,92 50,52"
        fill="white"
        stroke="#f97316"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Right face */}
      <polygon
        points="92,30 92,70 50,92 50,52"
        fill="white"
        stroke="#f97316"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Lid line across top face — matches logo detail */}
      <line
        x1="50" y1="8"
        x2="50" y2="52"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeDasharray="0"
      />
      <line
        x1="22" y1="41"
        x2="78" y2="41"
        stroke="#f97316"
        strokeWidth="2.5"
      />
    </svg>
  )
}

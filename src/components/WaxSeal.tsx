type Props = Readonly<{
  initials?: string;
  size?: number;
  className?: string;
}>;

// Gold wax seal with cursive monogram. Pure SVG.
export default function WaxSeal({ initials = "H&R", size = 140, className = "" }: Props) {
  const id = Math.random().toString(36).slice(2, 8);
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Wax seal ${initials}`}
    >
      <defs>
        <radialGradient id={`g-${id}`} cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#F2D38A" />
          <stop offset="35%" stopColor="#D2A24E" />
          <stop offset="70%" stopColor="#9D6E26" />
          <stop offset="100%" stopColor="#5C3D11" />
        </radialGradient>
        <radialGradient id={`hl-${id}`} cx="35%" cy="28%" r="25%">
          <stop offset="0%" stopColor="rgba(255,240,200,0.85)" />
          <stop offset="100%" stopColor="rgba(255,240,200,0)" />
        </radialGradient>
        <filter id={`sh-${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#3a2510" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* irregular wax blob */}
      <g filter={`url(#sh-${id})`}>
        <path
          d="M100 14
             C 138 10, 176 38, 184 74
             C 196 108, 178 150, 150 170
             C 122 190, 78 192, 50 172
             C 18 152, 4 112, 16 78
             C 28 42, 62 18, 100 14 Z"
          fill={`url(#g-${id})`}
          stroke="#5C3D11"
          strokeWidth="1"
        />
        {/* drip notches */}
        <path d="M30 60 q-8 6 -10 16 q10 -2 14 -10 z" fill="#9D6E26" opacity="0.7" />
        <path d="M178 120 q8 4 6 16 q-10 -2 -10 -12 z" fill="#9D6E26" opacity="0.7" />
        <path d="M70 184 q-2 8 6 14 q6 -6 4 -14 z" fill="#9D6E26" opacity="0.6" />
      </g>

      {/* inner stamped ring */}
      <circle cx="100" cy="100" r="64" fill="none" stroke="#3a2510" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="#3a2510" strokeOpacity="0.25" strokeWidth="0.8" />

      {/* highlight */}
      <ellipse cx="78" cy="70" rx="42" ry="28" fill={`url(#hl-${id})`} />

      {/* monogram — sized to fit within the inner ring (r=64) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Great Vibes', 'Allura', cursive"
        fontSize="56"
        fill="#3a2510"
        fillOpacity="0.9"
        textLength="90"
        lengthAdjust="spacingAndGlyphs"
        style={{ paintOrder: "stroke" }}
      >
        {initials}
      </text>
    </svg>
  );
}

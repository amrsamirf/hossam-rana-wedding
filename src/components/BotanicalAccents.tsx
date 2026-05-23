type Props = {
  className?: string;
};

// Decorative gold botanical sprigs anchored to the corners.
// Pure inline SVG so no asset dependencies are required.
export default function BotanicalAccents({ className = "" }: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Top-left sprig */}
      <Sprig className="absolute -left-6 -top-6 w-56 sm:w-72 md:w-80 opacity-70" />
      {/* Top-right sprig (flipped) */}
      <Sprig className="absolute -right-6 -top-10 w-52 sm:w-64 md:w-72 opacity-60 -scale-x-100" />
      {/* Bottom-right sprig (rotated) */}
      <Sprig className="absolute -right-10 -bottom-8 w-56 sm:w-72 md:w-96 opacity-70 rotate-180" />
      {/* Bottom-left sprig */}
      <Sprig className="absolute -left-10 -bottom-10 w-48 sm:w-60 md:w-72 opacity-55 -scale-x-100 rotate-180" />
    </div>
  );
}

function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 220"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      stroke="currentColor"
      style={{ color: "#B8893E" }}
    >
      <g strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* main stem */}
        <path d="M10 210 C 50 170, 70 130, 90 90 S 140 30, 200 10" />
        {/* secondary stems */}
        <path d="M40 180 C 60 160, 70 140, 75 120" />
        <path d="M70 130 C 90 120, 110 110, 130 95" />
        <path d="M110 80 C 130 75, 150 60, 170 45" />
        <path d="M150 55 C 165 45, 180 30, 195 20" />
        {/* leaves clusters */}
        {leafCluster(30, 195, 0)}
        {leafCluster(55, 165, 15)}
        {leafCluster(75, 130, -10)}
        {leafCluster(95, 105, 20)}
        {leafCluster(115, 85, -5)}
        {leafCluster(140, 65, 10)}
        {leafCluster(165, 45, -15)}
        {leafCluster(185, 25, 5)}
      </g>
    </svg>
  );
}

function leafCluster(cx: number, cy: number, rot: number) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
      <path d="M0 0 C 4 -6, 12 -8, 16 -4 C 12 0, 4 2, 0 0 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M0 0 C -4 -7, -12 -9, -16 -5 C -12 -1, -4 1, 0 0 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M0 0 C 5 6, 13 8, 17 4 C 13 0, 5 -2, 0 0 Z" fill="currentColor" fillOpacity="0.14" />
      <circle r="1.1" fill="currentColor" />
    </g>
  );
}

/** Chart-and-team artwork for the About intro, drawn to sit inside UseCasePanel. */
export function AboutIllustration() {
  return (
    <svg
      viewBox="0 0 560 420"
      role="img"
      aria-label="Illustration of three colleagues in front of a growth chart"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Chart frame */}
      <rect x="52" y="52" width="456" height="170" rx="14" fill="#141a2b" stroke="#8d93a8" strokeOpacity="0.55" strokeWidth="3" />
      <rect x="84" y="140" width="25" height="52" rx="3" fill="#e88fb5" />
      <rect x="122" y="105" width="25" height="87" rx="3" fill="#d4006a" />
      <rect x="161" y="122" width="25" height="70" rx="3" fill="#e88fb5" />
      <rect x="199" y="79" width="25" height="113" rx="3" fill="#d4006a" />
      <rect x="238" y="96" width="25" height="96" rx="3" fill="#e88fb5" />
      <rect x="276" y="61" width="25" height="131" rx="3" fill="#d4006a" />
      <path
        d="M84 175C120 170 140 160 170 155S215 140 240 120 270 82 305 80 350 86 400 86 450 76 479 70"
        fill="none"
        stroke="#5ee0b8"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Left person: purple top, hair bun */}
      <circle cx="148" cy="296" r="15" fill="#1b1220" />
      <circle cx="148" cy="344" r="38" fill="#1b1220" />
      <rect x="138" y="388" width="20" height="32" rx="4" fill="#b57952" />
      <circle cx="148" cy="358" r="36" fill="#c68a64" />
      <path d="M118 342Q148 322 178 342Q148 334 118 342Z" fill="#1b1220" />
      <Face x={148} y={358} spread={12} />
      <path d="M96 420C96 414 120 412 148 412S200 414 200 420Z" fill="#7c3aed" />

      {/* Middle person: afro, pink top */}
      <circle cx="280" cy="322" r="58" fill="#140d0d" />
      <rect x="268" y="392" width="24" height="28" rx="4" fill="#774a30" />
      <circle cx="236" cy="354" r="7" fill="#8a5a3c" />
      <circle cx="324" cy="354" r="7" fill="#8a5a3c" />
      <circle cx="280" cy="352" r="44" fill="#8a5a3c" />
      <Face x={280} y={350} spread={16} />
      <path d="M205 420C205 413 245 411 280 411S355 413 355 420Z" fill="#d4006a" />

      {/* Right person: blue top, hairline band */}
      <rect x="401" y="388" width="20" height="32" rx="4" fill="#e0b48e" />
      <circle cx="374" cy="358" r="7" fill="#efc7a2" />
      <circle cx="448" cy="358" r="7" fill="#efc7a2" />
      <circle cx="411" cy="356" r="37" fill="#efc7a2" />
      <path d="M376 346Q411 318 446 346Q411 332 376 346Z" fill="#3b2418" />
      <Face x={411} y={358} spread={12} />
      <path d="M345 420C345 413 380 411 411 411S478 413 478 420Z" fill="#2f6fe0" />
    </svg>
  );
}

function Face({ x, y, spread = 11 }: { x: number; y: number; spread?: number }) {
  return (
    <g>
      <circle cx={x - spread} cy={y} r="5.5" fill="#fff" />
      <circle cx={x + spread} cy={y} r="5.5" fill="#fff" />
      <circle cx={x - spread} cy={y} r="2.6" fill="#1b1220" />
      <circle cx={x + spread} cy={y} r="2.6" fill="#1b1220" />
      <circle cx={x - spread - 9} cy={y + 12} r="6" fill="#e0707a" opacity="0.5" />
      <circle cx={x + spread + 9} cy={y + 12} r="6" fill="#e0707a" opacity="0.5" />
      <path d={`M${x - 9} ${y + 14}q9 8 18 0`} fill="none" stroke="#7a3b2e" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  );
}
import type { ComponentType, ReactNode } from "react";
import { Face } from "@/components/about/AboutIllustration";

/**
 * Inline SVG artwork for each use case, keyed by slug. Drawn on a 568 x 426 canvas
 * (the 4:3 panel) to sit inside UseCasePanel, which supplies the dark glow background.
 */

const PINK = "#e6006e";
const ROSE = "#ff9ccc";
const MINT = "#5eead4";
const INK = "#151b2e";
const CARD = "#1d2540";
const LINE = "#7d8299";
const GREY = "#4a5068";
const DESK = "#1d2640";

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 568 426"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {children}
    </svg>
  );
}

/* 1. Your Royal Docks: web platform */
function RoyalDocks() {
  return (
    <Frame>
      <rect x="293" y="346" width="270" height="12" rx="4" fill={DESK} />
      <rect x="320" y="357" width="10" height="69" fill={DESK} />
      <rect x="522" y="357" width="10" height="69" fill={DESK} />

      <path d="M526 68 494 91l32 23" fill="none" stroke="#ff7ab8" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M557 66 537 114" stroke="#ffb3d6" strokeWidth="9" strokeLinecap="round" />

      <rect x="36" y="49" width="354" height="253" rx="14" fill="#131a2b" stroke={LINE} strokeWidth="3" />
      <circle cx="57" cy="68" r="5" fill="#ff6fae" />
      <circle cx="73" cy="68" r="5" fill={LINE} />
      <circle cx="89" cy="68" r="5" fill={LINE} />
      <rect x="115" y="58" width="222" height="20" rx="10" fill="#232a40" />
      <path d="M38 89H388" stroke="#2b3250" strokeWidth="2" />

      <rect x="55" y="105" width="150" height="106" rx="10" fill={PINK} />
      <rect x="70" y="121" width="87" height="10" rx="5" fill="#fff" />
      <rect x="70" y="140" width="114" height="7" rx="3.5" fill={ROSE} />
      <rect x="70" y="156" width="97" height="7" rx="3.5" fill={ROSE} />
      <rect x="70" y="179" width="56" height="19" rx="9.5" fill="#fff" />

      <rect x="220" y="104" width="151" height="50" rx="10" fill="#1a2036" stroke="#3a4260" strokeWidth="1.5" />
      <text x="233" y="136" fontSize="19" fontWeight="700" fill="#ff8fc4" fontFamily="ui-monospace, Menlo, Consolas, monospace">{"<div>"}</text>
      <rect x="220" y="161" width="151" height="51" rx="10" fill="#1a2036" stroke="#3a4260" strokeWidth="1.5" />
      <text x="233" y="193" fontSize="19" fontWeight="700" fill={MINT} fontFamily="ui-monospace, Menlo, Consolas, monospace">{"{ css }"}</text>

      <rect x="55" y="228" width="133" height="6" rx="3" fill="#a0587d" />
      <rect x="55" y="244" width="97" height="6" rx="3" fill="#8a8fa6" />
      <rect x="55" y="260" width="168" height="6" rx="3" fill="#3d8f78" />
      <rect x="55" y="276" width="80" height="6" rx="3" fill="#8a8fa6" />

      <rect x="329" y="182" width="82" height="145" rx="16" fill="#131a2b" stroke="#8a8fa6" strokeWidth="3" />
      <rect x="339" y="199" width="62" height="34" rx="6" fill={PINK} />
      <rect x="339" y="243" width="62" height="10" rx="5" fill={GREY} />
      <rect x="339" y="263" width="44" height="10" rx="5" fill={GREY} />
      <rect x="339" y="286" width="62" height="24" rx="6" fill="#232a44" />

      <rect x="417" y="265" width="134" height="82" rx="8" fill="#131a2b" stroke="#8a8fa6" strokeWidth="3" />
      <rect x="427" y="275" width="114" height="62" rx="4" fill="#1a2036" />
      <rect x="435" y="287" width="24" height="5" rx="2.5" fill={PINK} />
      <rect x="435" y="299" width="70" height="5" rx="2.5" fill={GREY} />
      <rect x="435" y="311" width="50" height="5" rx="2.5" fill={GREY} />

      <rect x="470" y="242" width="18" height="50" fill="#d9a678" />
      <path d="M423 377C423 322 442 292 479 292S536 322 536 377Z" fill="#3b82f6" />
      <circle cx="479" cy="219" r="25" fill="#f0c294" />
      <path d="M454 214Q479 188 504 214Q479 202 454 214Z" fill="#4a2c1a" />
      <Face x={479} y={221} spread={9} />
    </Frame>
  );
}

/* 2. Metropolitan Police Service Recruitment Portal: web platform / UI kit */
function RecruitmentPortal() {
  const swatches: [number, string][] = [
    [84, PINK],
    [131, ROSE],
    [177, "#ffffff"],
    [224, "#7c3aed"],
    [266, MINT],
  ];
  return (
    <Frame>
      <rect x="266" y="348" width="283" height="12" rx="4" fill={DESK} />
      <rect x="294" y="360" width="10" height="66" fill={DESK} />
      <rect x="516" y="360" width="10" height="66" fill={DESK} />

      <rect x="53" y="56" width="294" height="267" rx="16" fill={INK} stroke="#8a8fa6" strokeWidth="3" />
      <rect x="73" y="78" width="254" height="25" rx="8" fill="#2d3348" />
      <rect x="73" y="118" width="115" height="90" rx="8" fill={PINK} />
      <rect x="201" y="118" width="125" height="40" rx="8" fill="#3a4056" />
      <rect x="201" y="169" width="125" height="40" rx="8" fill="#3a4056" />
      <rect x="73" y="225" width="92" height="34" rx="17" fill={ROSE} />
      <rect x="175" y="225" width="94" height="34" rx="17" fill="none" stroke="#c0c4d8" strokeWidth="2.5" />
      <rect x="73" y="275" width="177" height="9" rx="4.5" fill={GREY} />
      <rect x="73" y="293" width="124" height="9" rx="4.5" fill={GREY} />

      {swatches.map(([cy, fill]) => (
        <circle key={cy} cx="382" cy={cy} r="20" fill={fill} />
      ))}
      <text x="419" y="153" fontSize="64" fontWeight="800" fill="#fff">Aa</text>

      <polygon points="302,221 302,268 315,256 325,281 338,275 328,250 345,248" fill="#fff" stroke={PINK} strokeWidth="4" strokeLinejoin="round" />

      <path d="M442 240C442 200 462 192 480 192S518 200 518 240V330H506V262H454V330H442Z" fill="#1b1220" />
      <rect x="470" y="262" width="20" height="70" fill="#d9a678" />
      <path d="M422 381C422 343 444 328 480 328S536 343 536 381Z" fill={PINK} />
      <circle cx="480" cy="236" r="28" fill="#f0c294" />
      <path d="M452 230Q480 196 508 230Q480 214 452 230Z" fill="#1b1220" />
      <Face x={480} y={238} spread={10} />

      <path d="M461 319 494 264" stroke="#ff6bb0" strokeWidth="7" strokeLinecap="round" />
      <g transform="rotate(-10 396 316)">
        <rect x="336" y="281" width="120" height="70" rx="8" fill="#1a2036" stroke="#9aa0b8" strokeWidth="3" />
        <circle cx="364" cy="318" r="12" fill={PINK} />
        <rect x="386" y="306" width="40" height="7" rx="3.5" fill="#8a8fa6" />
        <rect x="386" y="320" width="30" height="7" rx="3.5" fill={GREY} />
      </g>
    </Frame>
  );
}

/* 3. Digital Transformation for a Retail Giant: AI network */
function AiNetwork() {
  const outerY = [98, 178, 255, 337];
  const innerY = [133, 221, 309];
  const links: [number, number][] = [[0, 0], [0, 1], [1, 0], [1, 1], [1, 2], [2, 1], [2, 2], [3, 1], [3, 2]];
  const sides = [
    { outer: 70, inner: 177, hub: 209 },
    { outer: 498, inner: 391, hub: 359 },
  ];
  return (
    <Frame>
      {sides.map((s) => (
        <g key={s.outer} stroke={ROSE} strokeOpacity="0.5" strokeWidth="2">
          {links.map(([o, i]) => (
            <line key={`${o}-${i}`} x1={s.outer} y1={outerY[o]} x2={s.inner} y2={innerY[i]} />
          ))}
          {innerY.map((y) => (
            <line key={y} x1={s.inner} y1={y} x2={s.hub} y2="221" />
          ))}
        </g>
      ))}
      {sides.map((s) => (
        <g key={`n-${s.outer}`} fill="#1a1228" stroke={ROSE} strokeWidth="3">
          {outerY.map((y) => (
            <circle key={y} cx={s.outer} cy={y} r="10" />
          ))}
          {innerY.map((y) => (
            <circle key={y} cx={s.inner} cy={y} r="10" />
          ))}
        </g>
      ))}

      <line x1="284" y1="72" x2="284" y2="99" stroke="#fff" strokeWidth="3" />
      <circle cx="284" cy="62" r="9" fill={PINK} />
      <rect x="190" y="144" width="19" height="41" rx="8" fill={PINK} />
      <rect x="359" y="144" width="19" height="41" rx="8" fill={PINK} />
      <rect x="209" y="99" width="150" height="133" rx="28" fill={INK} stroke="#fff" strokeWidth="4" />
      <rect x="225" y="120" width="118" height="67" rx="18" fill="#0f1320" />
      <circle cx="257" cy="154" r="14" fill={PINK} />
      <circle cx="311" cy="154" r="14" fill={PINK} />
      <circle cx="252" cy="149" r="4" fill="#fff" />
      <circle cx="306" cy="149" r="4" fill="#fff" />
      <path d="M254 204H313" stroke={ROSE} strokeWidth="3" strokeLinecap="round" />
      <rect x="233" y="234" width="102" height="53" rx="10" fill="#1a2036" stroke="#8a8fa6" strokeWidth="3" />
      <text x="284" y="272" textAnchor="middle" fontSize="30" fontWeight="800" fill="#fff">AI</text>

      <rect x="54" y="365" width="177" height="36" rx="18" fill="#1a2036" stroke="#8a8fa6" strokeWidth="2" />
      <rect x="69" y="379" width="106" height="7" rx="3.5" fill="#8a8fa6" />
      <rect x="338" y="356" width="177" height="45" rx="22.5" fill={PINK} />
      <rect x="357" y="373" width="124" height="8" rx="4" fill="#ffd1e6" />
    </Frame>
  );
}

/* 4. Streamlining Operations with Cloud Solutions for FEEX Group */
function CloudOperations() {
  const rows = [99, 154, 209, 264];
  return (
    <Frame>
      <circle cx="417" cy="115" r="82" fill="none" stroke={ROSE} strokeOpacity="0.3" strokeWidth="2" strokeDasharray="3 5" />
      <path d="M190 132H267V98H371M190 216H294V132H371" fill="none" stroke={ROSE} strokeWidth="3" strokeDasharray="8 6" />

      <rect x="39" y="85" width="151" height="240" rx="14" fill={INK} stroke="#8a8fa6" strokeWidth="3" />
      {rows.map((y) => (
        <g key={y}>
          <rect x="52" y={y} width="125" height="45" rx="8" fill={CARD} stroke="#3a4260" strokeWidth="1.5" />
          <circle cx="67" cy={y + 22} r="5" fill={ROSE} />
          <circle cx="81" cy={y + 22} r="5" fill={MINT} />
          <circle cx="95" cy={y + 22} r="5" fill="#8a8fa6" />
          <rect x="113" y={y + 15} width="52" height="14" rx="7" fill="#3a4260" />
        </g>
      ))}

      <path d="M417 49C432 58 452 62 467 62V112C467 148 445 170 417 182C389 170 367 148 367 112V62C382 62 402 58 417 49Z" fill={PINK} stroke={ROSE} strokeWidth="3" strokeLinejoin="round" />
      <path d="M391 115 410 134 445 96" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="221" y="348" width="321" height="12" rx="4" fill={DESK} />
      <rect x="249" y="360" width="10" height="66" fill={DESK} />
      <rect x="506" y="360" width="10" height="66" fill={DESK} />
      <rect x="292" y="254" width="152" height="94" rx="8" fill="#131a2b" stroke="#8a8fa6" strokeWidth="3" />
      <rect x="311" y="274" width="60" height="6" rx="3" fill={PINK} />
      <rect x="311" y="289" width="73" height="5" rx="2.5" fill={GREY} />
      <rect x="311" y="301" width="55" height="5" rx="2.5" fill={GREY} />

      <path d="M524 360C505 335 508 305 524 285C540 305 543 335 524 360Z" fill="#2fb98a" />
      <path d="M522 360C500 348 495 322 505 306C518 320 526 340 522 360Z" fill="#1f8f6d" />
      <path d="M526 360C548 348 553 322 543 306C530 320 522 340 526 360Z" fill="#1f8f6d" />
      <path d="M512 352H536L532 382H516Z" fill="#2d3a5a" />

      <circle cx="396" cy="200" r="13" fill="#1b1220" />
      <circle cx="397" cy="238" r="33" fill="#1b1220" />
      <rect x="387" y="268" width="20" height="40" fill="#a8693f" />
      <path d="M339 397C339 330 360 308 397 308S452 330 452 397Z" fill="#7c3aed" />
      <circle cx="397" cy="247" r="30" fill="#c68a64" />
      <path d="M368 240Q397 214 426 240Q397 230 368 240Z" fill="#1b1220" />
      <Face x={397} y={248} spread={11} />
    </Frame>
  );
}

/* 5. Emergency Support App (Locate Me) */
function LocateMe() {
  return (
    <Frame>
      <g fill="none" stroke="#fff">
        <circle cx="320" cy="115" r="134" strokeOpacity="0.16" strokeWidth="2" />
        <circle cx="320" cy="115" r="98" strokeOpacity="0.22" strokeWidth="2" />
        <circle cx="320" cy="115" r="63" strokeOpacity="0.3" strokeWidth="2" />
      </g>
      <path d="M289 165 217 241" stroke={ROSE} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8" />
      <circle cx="401" cy="187" r="9" fill={ROSE} />
      <circle cx="443" cy="159" r="6" fill="#c9c3d6" />
      <circle cx="417" cy="239" r="6" fill={MINT} />

      <path d="M320 188C290 150 274 128 274 115C274 90 295 69 320 69C345 69 366 90 366 115C366 128 350 150 320 188Z" fill={PINK} stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="320" cy="115" r="17" fill="#fff" />
      <circle cx="320" cy="115" r="7" fill={PINK} />

      <path d="M98 250C98 192 122 168 156 168C198 168 224 200 224 258C224 318 232 356 244 392L206 386C198 350 192 318 188 292H112C110 316 106 336 98 350Z" fill="#130c10" />
      <rect x="135" y="285" width="30" height="50" fill="#7a4a30" />
      <path d="M84 426C84 366 125 326 190 324C250 324 254 376 254 426Z" fill="#7c3aed" />
      <line x1="232" y1="372" x2="277" y2="322" stroke="#8f5b3d" strokeWidth="22" strokeLinecap="round" />
      <circle cx="150" cy="245" r="48" fill="#8f5b3d" />
      <path d="M104 226C108 192 130 184 152 184C178 184 196 196 198 226C180 208 130 208 104 226Z" fill="#130c10" />
      <circle cx="134" cy="242" r="7" fill="#fff" />
      <circle cx="168" cy="242" r="7" fill="#fff" />
      <circle cx="136" cy="240" r="3.5" fill="#130c10" />
      <circle cx="170" cy="240" r="3.5" fill="#130c10" />
      <circle cx="118" cy="262" r="7" fill="#d9706f" opacity="0.5" />
      <circle cx="182" cy="262" r="7" fill="#d9706f" opacity="0.5" />
      <path d="M138 263q12 10 24 0" fill="none" stroke="#5a2c20" strokeWidth="2.2" strokeLinecap="round" />

      <g transform="translate(292 275) rotate(15)">
        <rect x="-28" y="-48" width="56" height="96" rx="10" fill="#1a2036" stroke="#fff" strokeWidth="3" />
        <circle cx="0" cy="-10" r="8" fill={PINK} />
        <rect x="-14" y="8" width="28" height="5" rx="2.5" fill="#8a8fa6" />
        <rect x="-14" y="19" width="20" height="5" rx="2.5" fill={GREY} />
      </g>
    </Frame>
  );
}

/* 6. Bespoke Business Solution for a Hospitality Industry (Spice Heritage) */
function SpiceHeritage() {
  const notes: [number, number, string, number][] = [
    [56, 63, "#fcd062", -3],
    [140, 63, "#ff8fc4", 2],
    [223, 63, "#5ee0b8", -2],
    [307, 63, "#9ea5f5", 3],
    [391, 63, "#fcd062", -2],
    [56, 149, "#ff8fc4", -3],
    [139, 149, "#9ea5f5", 3],
    [224, 149, "#fcd062", -2],
  ];
  return (
    <Frame>
      <rect x="32" y="42" width="504" height="267" rx="14" fill={INK} stroke={LINE} strokeWidth="3" />
      {notes.map(([x, y, fill, r]) => (
        <g key={`${x}-${y}`} transform={`rotate(${r} ${x + 34} ${y + 34})`}>
          <rect x={x} y={y} width="68" height="68" rx="4" fill={fill} />
          <rect x={x + 12} y={y + 14} width="44" height="5" rx="2.5" fill="#28201a" fillOpacity="0.4" />
          <rect x={x + 12} y={y + 26} width="44" height="5" rx="2.5" fill="#28201a" fillOpacity="0.3" />
          <rect x={x + 12} y={y + 38} width="28" height="5" rx="2.5" fill="#28201a" fillOpacity="0.3" />
        </g>
      ))}

      <circle cx="479" cy="135" r="42" fill={PINK} fillOpacity="0.14" stroke={PINK} strokeOpacity="0.45" strokeWidth="6" />
      <path d="M509 165 538 195" stroke={ROSE} strokeWidth="9" strokeLinecap="round" />

      <path d="M80 285C140 275 170 258 221 256S300 278 372 247 460 232 501 232" fill="none" stroke={ROSE} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 8" />
      {[
        [56, 282, "sad"],
        [221, 256, "flat"],
        [372, 247, "smile"],
        [502, 232, "grin"],
      ].map(([cx, cy, mood]) => (
        <g key={String(cx)} stroke={ROSE} strokeWidth="2.5" strokeLinecap="round" fill="none">
          <circle cx={cx as number} cy={cy as number} r="20" fill={INK} />
          <circle cx={(cx as number) - 7} cy={(cy as number) - 5} r="1.5" fill={ROSE} />
          <circle cx={(cx as number) + 7} cy={(cy as number) - 5} r="1.5" fill={ROSE} />
          {mood === "sad" ? <path d={`M${(cx as number) - 8} ${(cy as number) + 9}q8 -7 16 0`} /> : null}
          {mood === "flat" ? <path d={`M${(cx as number) - 7} ${(cy as number) + 6}h14`} /> : null}
          {mood === "smile" ? <path d={`M${(cx as number) - 8} ${(cy as number) + 4}q8 7 16 0`} /> : null}
          {mood === "grin" ? <path d={`M${(cx as number) - 10} ${(cy as number) + 3}q10 11 20 0Z`} /> : null}
        </g>
      ))}

      <rect x="96" y="383" width="20" height="30" fill="#e6b891" />
      <path d="M60 426C60 410 85 404 106 404S152 410 152 426Z" fill="#3b6fd4" />
      <circle cx="106" cy="357" r="32" fill="#f3c9a5" />
      <path d="M76 350Q106 322 136 350Q106 338 76 350Z" fill="#4a2c1a" />
      <Face x={106} y={358} spread={12} />

      <circle cx="266" cy="347" r="46" fill="#140d0d" />
      <rect x="254" y="388" width="24" height="26" fill="#774a30" />
      <path d="M215 426C215 410 245 402 266 402S320 410 320 426Z" fill="#d4006a" />
      <circle cx="266" cy="360" r="34" fill="#8a5a3c" />
      <Face x={266} y={360} spread={13} />
    </Frame>
  );
}

/* 7. Driving Revenue Growth for a High-Street Retail Business: kanban + timeline */
function RetailGrowth() {
  const columns = [
    { x: 45, tone: ROSE, cards: 3 },
    { x: 211, tone: PINK, cards: 3 },
    { x: 377, tone: MINT, cards: 2 },
  ];
  const cardY = [91, 156, 221];
  return (
    <Frame>
      <rect x="25" y="39" width="517" height="258" rx="14" fill={INK} stroke={LINE} strokeWidth="3" />
      {columns.map((c) => (
        <g key={c.x}>
          <rect x={c.x} y="56" width="152" height="227" rx="10" fill="#1e2640" />
          <rect x={c.x + 11} y="67" width="62" height="10" rx="5" fill={c.tone} />
          {cardY.slice(0, c.cards).map((y) => (
            <g key={y}>
              <rect x={c.x + 11} y={y} width="130" height="55" rx="8" fill="#252d4a" stroke="#3a4260" strokeWidth="1.5" />
              <rect x={c.x + 23} y={y + 12} width="80" height="6" rx="3" fill="#aab0c8" />
              <rect x={c.x + 23} y={y + 25} width="56" height="5" rx="2.5" fill="#6a7090" />
              <circle cx={c.x + 121} cy={y + 40} r="8" fill={c.tone} />
            </g>
          ))}
        </g>
      ))}

      <rect x="53" y="311" width="132" height="10" rx="5" fill={PINK} />
      <rect x="133" y="327" width="151" height="10" rx="5" fill={ROSE} />
      <rect x="239" y="343" width="125" height="10" rx="5" fill={MINT} />

      <circle cx="487" cy="340" r="40" fill="#121827" stroke={ROSE} strokeWidth="5" />
      <path d="M487 340V317M487 340L504 352" stroke="#fff" strokeWidth="4" strokeLinecap="round" />

      <circle cx="423" cy="347" r="11" fill="#1b1220" />
      <rect x="414" y="405" width="18" height="21" fill="#b57952" />
      <circle cx="423" cy="385" r="27" fill="#c68a64" />
      <path d="M397 380Q423 358 449 380Q423 370 397 380Z" fill="#1b1220" />
      <Face x={423} y={387} spread={10} />

      <rect x="505" y="408" width="18" height="18" fill="#e0b48e" />
      <circle cx="514" cy="390" r="27" fill="#f0c7a4" />
      <path d="M488 384Q514 360 540 384Q514 374 488 384Z" fill="#4a2c1a" />
      <Face x={514} y={392} spread={10} />
    </Frame>
  );
}

export const useCaseIllustrations: Record<string, ComponentType> = {
  "your-royal-docks": RoyalDocks,
  "metropolitan-police-service-recruitment-portal": RecruitmentPortal,
  "digital-transformation-for-a-retail-giant": AiNetwork,
  "streamlining-operations-with-cloud-solutions-for-feex-group": CloudOperations,
  "emergency-support-app-to-combat-gender-based-violence": LocateMe,
  "bespoke-business-solution-for-a-hospitality-industry": SpiceHeritage,
  "driving-revenue-growth-for-a-high-street-retail-business": RetailGrowth,
};

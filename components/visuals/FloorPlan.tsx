import { cn } from "@/lib/cn";

type Room = { id: string; label: string; x: number; y: number; w: number; h: number };

const rooms: Room[] = [
  { id: "fitness", label: "FITNESS", x: 20, y: 20, w: 220, h: 180 },
  { id: "golf", label: "GOLF", x: 240, y: 20, w: 200, h: 120 },
  { id: "gx", label: "GX", x: 440, y: 20, w: 140, h: 180 },
  { id: "lobby", label: "LOBBY", x: 240, y: 140, w: 200, h: 120 },
  { id: "lounge", label: "LOUNGE", x: 20, y: 200, w: 220, h: 120 },
  { id: "study", label: "STUDY", x: 440, y: 200, w: 140, h: 120 },
  { id: "pool", label: "SWIMMING", x: 20, y: 320, w: 260, h: 140 },
  { id: "sauna", label: "SAUNA", x: 280, y: 320, w: 100, h: 140 },
  { id: "kids", label: "GUEST · KIDS", x: 380, y: 320, w: 200, h: 140 },
];

const HUB = { x: 340, y: 205 };

/** 접근 지점(출입 단말) — HILINK 허브로 연결 */
const nodes = [
  { x: 240, y: 110 },
  { x: 340, y: 140 },
  { x: 440, y: 110 },
  { x: 240, y: 240 },
  { x: 440, y: 240 },
  { x: 180, y: 320 },
  { x: 330, y: 320 },
  { x: 480, y: 320 },
];

/**
 * 커뮤니티센터 평면도 — "공간을 운영한다" 는 브랜드 모티프.
 * 각 시설 출입 지점이 HILINK 허브로 연결되어 현장 운영과 디지털 운영의 결합을 표현합니다.
 */
export function FloorPlan({ className, showHub = true }: { className?: string; showHub?: boolean }) {
  return (
    <svg
      viewBox="0 0 600 480"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="커뮤니티센터 평면도: 피트니스, 골프, GX, 라운지, 독서실, 수영장, 사우나, 게스트하우스의 출입 지점이 HILINK 플랫폼으로 연결된 구조"
    >
      <defs>
        <pattern id="fp-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
        <radialGradient id="fp-hub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--color-signal)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* rooms */}
      <g fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2">
        {rooms.map((r) => (
          <rect key={r.id} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.id === "lobby" ? "url(#fp-hatch)" : "none"} />
        ))}
        <rect x="16" y="16" width="568" height="448" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
      </g>

      {/* furniture / equipment hints */}
      <g fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1">
        {/* treadmills */}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={`tm${i}`} x={40 + i * 38} y={48} width={22} height={44} rx={2} />
        ))}
        {/* strength */}
        {[0, 1, 2].map((i) => (
          <rect key={`st${i}`} x={44 + i * 62} y={128} width={40} height={40} />
        ))}
        {/* golf bays */}
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={`gb${i}`} d={`M${250 + i * 38} 30 v70 h32 v-70`} />
        ))}
        {/* gx mirror + mats */}
        <line x1="452" y1="32" x2="568" y2="32" strokeWidth="2" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => <rect key={`gx${r}${c}`} x={460 + c * 38} y={70 + r * 40} width={24} height={14} />),
        )}
        {/* lounge sofas */}
        <rect x="44" y="232" width="80" height="24" />
        <rect x="44" y="270" width="80" height="24" />
        <circle cx="180" cy="262" r="22" />
        {/* study desks */}
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => <rect key={`sd${r}${c}`} x={456 + c * 40} y={228 + r * 28} width={30} height={16} />),
        )}
        {/* pool lanes */}
        {[0, 1, 2, 3].map((i) => (
          <line key={`ln${i}`} x1="44" x2="256" y1={356 + i * 24} y2={356 + i * 24} strokeDasharray="4 5" />
        ))}
        <rect x="36" y="336" width="228" height="112" />
        {/* sauna benches */}
        <path d="M292 340 h76 M292 360 h76" />
        {/* guest rooms */}
        <path d="M480 320 v140 M380 390 h100" />
        <rect x="498" y="340" width="60" height="40" />
        <rect x="498" y="400" width="60" height="40" />
      </g>

      {/* labels */}
      <g
        fill="rgba(255,255,255,0.55)"
        fontSize="10"
        letterSpacing="2"
        fontFamily="var(--font-display)"
        fontWeight="600"
      >
        {rooms.map((r) => (
          <text key={r.id} x={r.x + 12} y={r.y + r.h - 12}>
            {r.label}
          </text>
        ))}
      </g>

      {showHub && (
        <g>
          {/* connections */}
          <g stroke="var(--color-signal-light)" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="3 4" fill="none" className="fp-flow">
            {nodes.map((n, i) => (
              <path key={i} d={`M${n.x} ${n.y} L${HUB.x} ${HUB.y}`} />
            ))}
          </g>
          {/* access nodes */}
          {nodes.map((n, i) => (
            <g key={`n${i}`}>
              <circle cx={n.x} cy={n.y} r="7" fill="var(--color-navy-950)" stroke="var(--color-signal-light)" strokeWidth="1.2" />
              <circle
                cx={n.x}
                cy={n.y}
                r="2.5"
                fill="var(--color-signal-light)"
                className="animate-pulse-dot"
                style={{ animationDelay: `${i * 250}ms` }}
              />
            </g>
          ))}
          {/* hub */}
          <circle cx={HUB.x} cy={HUB.y} r="44" fill="url(#fp-hub)" />
          <circle cx={HUB.x} cy={HUB.y} r="22" fill="var(--color-navy-950)" stroke="var(--color-signal)" strokeWidth="1.5" />
          <text
            x={HUB.x}
            y={HUB.y + 3.5}
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            letterSpacing="1.2"
            fill="#fff"
            fontFamily="var(--font-display)"
          >
            HILINK
          </text>
        </g>
      )}
    </svg>
  );
}

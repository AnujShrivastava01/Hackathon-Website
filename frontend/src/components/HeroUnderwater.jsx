import React, { useId } from 'react';

const ink = '#1A1A1A';
const sw = 2.5;

/** Streamlined tropical fish — fuselage, fins, eye, stripes (neo-brutalist stroke) */
function FishTropical({ className }) {
  return (
    <svg viewBox="0 0 180 72" className={className} aria-hidden>
      <path
        d="M 28 36 C 28 14 52 8 88 10 C 118 12 148 20 158 36 C 148 54 118 62 88 64 C 52 66 28 58 28 36 Z"
        fill="#FF914D"
        stroke={ink}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M 58 12 L 62 8 L 68 14 L 64 18 Z"
        fill="#FF914D"
        stroke={ink}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path d="M 28 36 L 6 22 L 10 36 L 6 50 Z" fill="#E85D2C" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
      <path
        d="M 72 38 Q 55 48 58 62"
        fill="none"
        stroke={ink}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M 65 22 Q 78 10 92 18"
        fill="#FFDE59"
        stroke={ink}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M 78 14 L 78 58" fill="none" stroke={ink} strokeWidth={2.2} strokeLinecap="round" opacity="0.9" />
      <path d="M 98 16 L 98 56" fill="none" stroke={ink} strokeWidth={2.2} strokeLinecap="round" opacity="0.9" />
      <path d="M 118 18 L 118 54" fill="none" stroke={ink} strokeWidth={2.2} strokeLinecap="round" opacity="0.9" />
      <ellipse cx="138" cy="34" rx="14" ry="11" fill="#fff" stroke={ink} strokeWidth={sw} />
      <ellipse cx="142" cy="34" rx="6" ry="7" fill="#1A1A1A" stroke="none" />
      <circle cx="144" cy="31" r="2.5" fill="#fff" />
      <path d="M 95 34 L 132 32" fill="none" stroke={ink} strokeWidth={1.8} strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

/** Silver baitfish — two-tone body, forked tail, subtle scale lines */
function FishSilver({ className }) {
  const gid = useId().replace(/:/g, '');
  const gradId = `hw-silver-${gid}`;
  return (
    <svg viewBox="0 0 200 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a7d8c" />
          <stop offset="45%" stopColor="#8eb4c4" />
          <stop offset="100%" stopColor="#dcecf4" />
        </linearGradient>
      </defs>
      <path
        d="M 32 32 C 32 12 58 6 102 8 C 142 10 176 18 186 32 C 176 46 142 54 102 56 C 58 58 32 52 32 32 Z"
        fill={`url(#${gradId})`}
        stroke={ink}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path d="M 32 32 L 8 18 L 14 32 L 8 46 Z" fill="#6b8fa3" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M 10 32 L 4 28 M 10 32 L 4 36" stroke={ink} strokeWidth={2} strokeLinecap="round" />
      <path
        d="M 88 14 L 92 8 L 98 16"
        fill="#6b8fa3"
        stroke={ink}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M 78 40 Q 62 52 64 60"
        fill="none"
        stroke={ink}
        strokeWidth={2}
        strokeLinecap="round"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M ${62 + i * 22} 22 Q ${68 + i * 22} 28 ${62 + i * 22} 34`}
          fill="none"
          stroke={ink}
          strokeWidth={1.2}
          strokeLinecap="round"
          opacity="0.35"
        />
      ))}
      <ellipse cx="158" cy="30" rx="12" ry="9" fill="#f0f7fa" stroke={ink} strokeWidth={sw} />
      <ellipse cx="161" cy="30" rx="4.5" ry="5.5" fill={ink} />
      <circle cx="163" cy="27.5" r="1.8" fill="#fff" />
    </svg>
  );
}

/** Deep reef fish — compact body, spiny dorsal hint */
function FishReef({ className }) {
  return (
    <svg viewBox="0 0 170 68" className={className} aria-hidden>
      <path
        d="M 30 34 C 30 14 55 10 95 12 C 130 14 152 22 158 34 C 152 48 128 56 95 58 C 55 60 30 54 30 34 Z"
        fill="#4a90c2"
        stroke={ink}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M 30 34 C 30 14 55 10 95 12 C 120 14 138 20 148 30 L 148 38 C 138 48 120 54 95 58 C 55 60 30 54 30 34 Z"
        fill="#87ceeb"
        stroke="none"
        opacity="0.5"
      />
      <path d="M 30 34 L 10 20 L 16 34 L 10 48 Z" fill="#2d6a8f" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
      <path
        d="M 72 12 L 76 4 L 84 6 L 88 14 L 80 16 Z"
        fill="#5aa9d8"
        stroke={ink}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M 88 18 L 88 50" fill="none" stroke={ink} strokeWidth={2} strokeLinecap="round" opacity="0.7" />
      <path d="M 108 20 L 108 48" fill="none" stroke={ink} strokeWidth={2} strokeLinecap="round" opacity="0.7" />
      <ellipse cx="132" cy="32" rx="13" ry="10" fill="#fff" stroke={ink} strokeWidth={sw} />
      <ellipse cx="135" cy="32" rx="5" ry="6" fill={ink} />
      <circle cx="137" cy="29" r="2" fill="#fff" />
      <path
        d="M 70 36 Q 95 33 120 36"
        fill="none"
        stroke={ink}
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

function SeaweedCluster({ className, delay, variant = 'a' }) {
  const paths = {
    a: (
      <>
        <path d="M 30 120 Q 22 90 30 60 Q 38 30 28 8" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
        <path d="M 30 120 Q 40 88 32 55 Q 24 25 36 12" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M 30 120 Q 18 95 26 70 Q 34 40 22 20"
          fill="#98FB98"
          fillOpacity="0.85"
          stroke={ink}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </>
    ),
    b: (
      <>
        <path d="M 24 120 Q 30 75 18 35 Q 26 15 20 6" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 36 120 Q 28 80 40 50 Q 32 22 44 10" fill="#7ed9a8" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
    c: (
      <>
        <path d="M 40 120 Q 52 70 34 40 Q 48 20 38 4" fill="#86efac" stroke={ink} strokeWidth="2.8" strokeLinecap="round" />
        <path d="M 22 120 Q 8 85 28 55 Q 12 30 24 12" fill="none" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 60 120"
      className={`hero-seaweed ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      {paths[variant] || paths.a}
    </svg>
  );
}

function KelpBlade({ className, delay }) {
  return (
    <svg
      viewBox="0 0 36 140"
      className={`hero-seaweed ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      <path
        d="M 18 140 Q 6 100 18 70 Q 30 35 14 8 Q 22 4 26 12"
        fill="#5cb87a"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M 18 140 Q 28 95 16 60 Q 24 28 20 10" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FanPlant({ className, delay }) {
  return (
    <svg
      viewBox="0 0 80 70"
      className={`hero-seaweed ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      <path d="M 40 70 L 40 48" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <path
        d="M 40 48 Q 8 38 6 18 Q 22 28 40 32 Q 58 28 74 18 Q 72 38 40 48"
        fill="#b8e6d5"
        stroke={ink}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CoralSticker({ className }) {
  return (
    <svg viewBox="0 0 70 80" className={className} aria-hidden>
      <path
        d="M 35 80 L 35 52 M 20 72 Q 18 50 28 38 M 35 52 Q 30 35 22 28 M 35 52 Q 42 32 52 26 M 50 70 Q 54 48 44 36"
        fill="none"
        stroke={ink}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <circle cx="22" cy="26" r="6" fill="#FF914D" stroke={ink} strokeWidth={sw} />
      <circle cx="44" cy="22" r="7" fill="#F5B7B1" stroke={ink} strokeWidth={sw} />
      <circle cx="34" cy="18" r="5" fill="#FFDE59" stroke={ink} strokeWidth={sw} />
    </svg>
  );
}

function TubePlant({ className, delay }) {
  return (
    <svg
      viewBox="0 0 40 100"
      className={`hero-tube ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      <rect x="14" y="20" width="12" height="80" rx="2" fill="#D2B4DE" stroke={ink} strokeWidth={sw} />
      <ellipse cx="20" cy="18" rx="10" ry="6" fill="#E8D4F0" stroke={ink} strokeWidth={sw} />
    </svg>
  );
}

function RockPile({ className }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden>
      <path d="M0 60 L20 35 L45 42 L70 28 L95 38 L120 32 L120 60 Z" fill="#B8B8B8" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M15 60 L35 48 L55 52 L75 45 L100 55 L120 50 L120 60 Z" fill="#9E9E9E" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
    </svg>
  );
}

function Starfish({ className, fill = '#FF914D' }) {
  return (
    <svg viewBox="0 0 50 50" className={className} aria-hidden>
      <path
        d="M25 4 L30 18 L45 18 L33 27 L38 42 L25 33 L12 42 L17 27 L5 18 L20 18 Z"
        fill={fill}
        stroke={ink}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AnchorSticker({ className }) {
  return (
    <svg viewBox="0 0 44 56" className={className} aria-hidden>
      <path
        d="M22 4 L22 36 M10 20 L34 20 M22 36 Q8 44 8 52 L36 52 Q36 44 22 36"
        fill="none"
        stroke={ink}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <circle cx="22" cy="10" r="6" fill="#C0B6F2" stroke={ink} strokeWidth={sw} />
    </svg>
  );
}

function OctopusSticker({ className }) {
  return (
    <svg viewBox="0 0 110 100" className={className} aria-hidden>
      <path
        d="M 55 8 C 78 8 92 22 92 40 C 92 48 88 54 82 58 C 88 72 95 88 102 96 C 88 90 78 78 72 64 C 68 78 62 92 52 98 C 56 84 58 70 55 58 C 52 70 50 84 48 96 C 42 88 38 72 38 58 C 32 74 22 88 8 94 C 18 82 26 68 32 54 C 22 58 12 68 4 82 C 10 66 20 52 34 46 C 28 40 24 32 24 22 C 24 10 38 8 55 8 Z"
        fill="#C4A8E8"
        stroke={ink}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <ellipse cx="44" cy="32" rx="10" ry="12" fill="#fff" stroke={ink} strokeWidth={2} />
      <ellipse cx="66" cy="32" rx="10" ry="12" fill="#fff" stroke={ink} strokeWidth={2} />
      <ellipse cx="46" cy="34" rx="4" ry="5" fill={ink} />
      <ellipse cx="68" cy="34" rx="4" ry="5" fill={ink} />
      <circle cx="47" cy="32" r="1.8" fill="#fff" />
      <circle cx="69" cy="32" r="1.8" fill="#fff" />
      <path d="M 48 48 Q 55 52 62 48" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function OceanWaveTop() {
  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-[18] h-[min(12vw,72px)] min-h-[52px] overflow-hidden">
      <svg
        className="absolute bottom-0 left-[-5%] w-[110%] h-full min-h-[52px] text-ink"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        aria-hidden
      >
        <g className="hero-wave-swell-group">
          <path
            d="M0,38 C180,12 360,48 540,28 C720,8 900,42 1080,24 C1260,6 1440,34 1440,34 L1440,56 L0,56 Z"
            fill="#d4f2fc"
          />
          <path
            d="M0,40 C220,22 440,50 660,34 C880,18 1100,46 1320,30 L1440,36 L1440,56 L0,56 Z"
            fill="rgba(255,255,255,0.35)"
          />
        </g>
      </svg>
      <svg
        className="hero-wave-drift absolute bottom-0 left-[-15%] w-[130%] h-full min-h-[48px] opacity-80"
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        aria-hidden
      >
        <g className="hero-wave-drift-inner">
          <path
            d="M0,30 C240,6 480,42 720,22 C960,4 1200,38 1440,20 L1440,48 L0,48 Z"
            fill="#b8e8f5"
          />
        </g>
      </svg>
    </div>
  );
}

const BUBBLES = [
  { l: '4%', s: 8, d: 7, del: 0 },
  { l: '9%', s: 5, d: 9, del: 1.2 },
  { l: '14%', s: 11, d: 10, del: 0.3 },
  { l: '19%', s: 7, d: 8, del: 2.1 },
  { l: '25%', s: 13, d: 11, del: 0.6 },
  { l: '31%', s: 6, d: 12, del: 3 },
  { l: '37%', s: 9, d: 9, del: 1.4 },
  { l: '43%', s: 4, d: 7, del: 2.9 },
  { l: '49%', s: 10, d: 10, del: 0.9 },
  { l: '55%', s: 7, d: 8, del: 4 },
  { l: '61%', s: 12, d: 11, del: 0.15 },
  { l: '67%', s: 6, d: 9, del: 1.8 },
  { l: '73%', s: 8, d: 10, del: 2.5 },
  { l: '79%', s: 5, d: 7, del: 3.2 },
  { l: '85%', s: 11, d: 12, del: 2.2 },
  { l: '91%', s: 7, d: 8, del: 5 },
  { l: '96%', s: 9, d: 9, del: 1.1 },
  { l: '12%', s: 6, d: 11, del: 4.5 },
  { l: '58%', s: 5, d: 8, del: 6 },
  { l: '76%', s: 8, d: 9, del: 0.5 },
];

const PLANTS = [
  { key: 's1', left: '-3%', bottom: '27%', width: '4.5rem', v: 'a', d: 0 },
  { key: 's2', left: '2%', bottom: '25%', width: '4rem', v: 'b', d: 0.4 },
  { key: 's3', left: '8%', bottom: '22%', width: '3.5rem', v: 'c', d: 0.9 },
  { key: 'k1', left: '11%', bottom: '20%', width: '2.5rem', d: 0.2 },
  { key: 's4', left: '28%', bottom: '19%', width: '3rem', v: 'a', d: 1.2 },
  { key: 'f1', left: '34%', bottom: '17%', width: '4rem', d: 0.6 },
  { key: 's5', left: '72%', bottom: '26%', width: '5rem', v: 'b', d: 0.1 },
  { key: 's6', left: '80%', bottom: '23%', width: '3.5rem', v: 'a', d: 1.4 },
  { key: 'k2', left: '88%', bottom: '21%', width: '2.75rem', d: 0.8 },
  { key: 's7', left: '94%', bottom: '24%', width: '3rem', v: 'c', d: 0.5 },
  { key: 'f2', left: '62%', bottom: '18%', width: '3.5rem', d: 1.0 },
  { key: 's8', left: '48%', bottom: '16%', width: '2.75rem', v: 'b', d: 1.6 },
];

export default function HeroUnderwater() {
  return (
    <div
      className="hero-underwater relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 mt-10 sm:mt-14 lg:mt-16 h-[min(46vh,440px)] min-h-[260px] max-h-[460px] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
      aria-hidden
    >
      <OceanWaveTop />

      <div className="absolute inset-0 top-[min(10vw,52px)] bg-gradient-to-b from-[#c8eefc] via-[#7ecae8] to-[#3d94c9]" />

      <div
        className="absolute inset-0 top-[min(10vw,52px)] opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '22px 22px',
        }}
      />

      <div className="absolute inset-0 top-[min(10vw,52px)] bg-gradient-to-b from-white/35 via-transparent to-[#1a6a94]/12 pointer-events-none mix-blend-soft-light" />

      <div className="hero-underwater-rays absolute inset-0 top-[min(10vw,52px)] pointer-events-none overflow-hidden">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="hero-ray absolute top-0 left-1/2 h-[88%] w-[8%] -translate-x-1/2 origin-top mix-blend-overlay"
            style={{
              transform: `translateX(-50%) rotate(${-32 + i * 10.5}deg)`,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
              marginLeft: `${(i - 3) * 16}px`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="hero-bubble absolute bottom-[20%] rounded-full border-2 border-ink bg-white/75 shadow-neo-sm"
          style={{
            left: b.l,
            width: b.s,
            height: b.s,
            animationDuration: `${b.d}s`,
            animationDelay: `${b.del}s`,
          }}
        />
      ))}

      {PLANTS.map((p) => {
        const pos = { left: p.left, bottom: p.bottom, width: p.width };
        return p.key.startsWith('k') ? (
          <div key={p.key} className="absolute z-[1]" style={pos}>
            <KelpBlade delay={p.d} />
          </div>
        ) : p.key.startsWith('f') ? (
          <div key={p.key} className="absolute z-[1]" style={pos}>
            <FanPlant delay={p.d} />
          </div>
        ) : (
          <div key={p.key} className="absolute z-[1] opacity-95" style={pos}>
            <SeaweedCluster variant={p.v} delay={p.d} />
          </div>
        );
      })}

      <div className="absolute left-[14%] bottom-[19%] w-[4.5rem] z-[2]">
        <CoralSticker className="w-full h-auto drop-shadow-[3px_3px_0_#1A1A1A]" />
      </div>
      <div className="absolute right-[16%] bottom-[17%] w-14 z-[2] hidden sm:block">
        <CoralSticker className="w-full h-auto drop-shadow-[3px_3px_0_#1A1A1A]" />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-[17%] flex gap-2 sm:gap-3 z-[2]">
        <TubePlant className="w-7 sm:w-8" delay={0} />
        <TubePlant className="w-9 sm:w-10" delay={0.35} />
        <TubePlant className="w-8 sm:w-9" delay={0.7} />
        <TubePlant className="w-6 sm:w-7 hidden sm:block" delay={1.05} />
      </div>

      <div className="absolute left-[2%] top-[36%] w-[6.5rem] sm:w-28 z-[3] hero-octopus-seek opacity-95">
        <OctopusSticker className="w-full h-auto drop-shadow-[3px_4px_0_#1A1A1A]" />
      </div>

      <div className="absolute top-[32%] w-[7rem] sm:w-[8.5rem] hero-fish-ltr z-[2]" style={{ animationDelay: '0s' }}>
        <FishTropical className="w-full h-auto drop-shadow-[2px_2px_0_#1A1A1A]" />
      </div>
      <div className="absolute top-[48%] w-[6rem] sm:w-32 hero-fish-swim-left z-[2]" style={{ animationDelay: '-5s' }}>
        <div className="h-full w-full -scale-x-100 origin-center">
          <FishSilver className="w-full h-auto drop-shadow-[2px_2px_0_#1A1A1A]" />
        </div>
      </div>
      <div className="absolute top-[22%] w-[5.5rem] sm:w-28 hero-fish-ltr-slow z-[2]" style={{ animationDelay: '-8s' }}>
        <FishReef className="w-full h-auto drop-shadow-[2px_2px_0_#1A1A1A]" />
      </div>
      <div className="absolute top-[58%] w-[5.25rem] sm:w-28 hero-fish-swim-left z-[2]" style={{ animationDelay: '-2.5s' }}>
        <div className="h-full w-full -scale-x-100 origin-center">
          <FishReef className="w-full h-auto opacity-90 drop-shadow-[2px_2px_0_#1A1A1A]" />
        </div>
      </div>
      <div className="absolute top-[40%] w-[6.5rem] sm:w-[7.5rem] hero-fish-ltr z-[2]" style={{ animationDelay: '-11s' }}>
        <FishSilver className="w-full h-auto opacity-88 drop-shadow-[2px_2px_0_#1A1A1A]" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[34%] min-h-[5rem] bg-[#e8d4b8] border-t-2 border-[#5aa3c4]/80">
        <div className="absolute -top-px left-0 w-[32%] max-w-[220px] opacity-95">
          <RockPile className="w-full h-auto" />
        </div>
        <div className="absolute -top-px right-0 w-[34%] max-w-[240px] opacity-95 scale-x-[-1]">
          <RockPile className="w-full h-auto" />
        </div>

        <div className="absolute bottom-2 left-[8%] w-10 sm:w-11 rotate-12">
          <Starfish fill="#F5B7B1" className="w-full h-auto drop-shadow-[2px_2px_0_#1A1A1A]" />
        </div>
        <div className="absolute bottom-3 left-[22%] w-8 sm:w-9 -rotate-[18deg]">
          <Starfish fill="#FFDE59" className="w-full h-auto drop-shadow-[2px_2px_0_#1A1A1A]" />
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-9 sm:w-10 rotate-6">
          <Starfish fill="#FF914D" className="w-full h-auto drop-shadow-[2px_2px_0_#1A1A1A]" />
        </div>
        <div className="absolute bottom-2 right-[26%] w-7 sm:w-8 -rotate-12">
          <Starfish fill="#D2B4DE" className="w-full h-auto drop-shadow-[2px_2px_0_#1A1A1A]" />
        </div>
        <div className="absolute bottom-2 right-[14%] w-11 sm:w-12 rotate-[22deg]">
          <Starfish fill="#FF914D" className="w-full h-auto drop-shadow-[2px_2px_0_#1A1A1A]" />
        </div>

        <div className="absolute bottom-3 right-[6%] w-10 sm:w-11">
          <AnchorSticker className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

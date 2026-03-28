import React from 'react';

/** Shared underwater atmosphere for the full hero (matches HeroUnderwater palette) */
export default function HeroOceanBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#c8eefc] via-[#7ecae8] to-[#4a9fd4]" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '22px 22px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-[#1a6a94]/14 mix-blend-soft-light" />
      <div className="absolute inset-0 overflow-hidden">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="hero-ray absolute top-0 left-1/2 h-[min(85%,520px)] w-[7%] -translate-x-1/2 origin-top mix-blend-overlay opacity-90"
            style={{
              transform: `translateX(-50%) rotate(${-30 + i * 12}deg)`,
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.08) 45%, transparent 100%)',
              marginLeft: `${(i - 2.5) * 14}px`,
              animationDelay: `${i * 0.28}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

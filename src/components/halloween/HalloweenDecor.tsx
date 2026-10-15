"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Telaraña generada de forma determinista (sin aleatoriedad, seguro para SSR)
const WEB_PATH = (() => {
  const spokes = 8;
  const rings = [30, 60, 90, 120, 150, 180];
  const angle = (i: number) => (Math.PI / 2) * (i / (spokes - 1));
  let d = "";

  for (let i = 0; i < spokes; i++) {
    const a = angle(i);
    d += `M0 0 L${(Math.cos(a) * 200).toFixed(1)} ${(Math.sin(a) * 200).toFixed(1)} `;
  }

  for (const r of rings) {
    for (let i = 0; i < spokes - 1; i++) {
      const a1 = angle(i);
      const a2 = angle(i + 1);
      const am = (a1 + a2) / 2;
      const p1 = [Math.cos(a1) * r, Math.sin(a1) * r];
      const p2 = [Math.cos(a2) * r, Math.sin(a2) * r];
      const c = [Math.cos(am) * r * 0.82, Math.sin(am) * r * 0.82];
      d += `M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} Q${c[0].toFixed(1)} ${c[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} `;
    }
  }
  return d;
})();

type Spider = { x: string; top: string; drop: string; dur: string; delay: string; cls?: string };
type Bat = { x: string; top: string; dur: string; delay: string; cls?: string };
type WebPos = "tl" | "tr" | "bl" | "br" | "ml" | "mr";

// "top" + "drop" se mantienen dentro de la pantalla para que nada se salga
const SPIDERS: Spider[] = [
  { x: "25%", top: "10%", drop: "16vh", dur: "8s", delay: "0s" },
  { x: "72%", top: "32%", drop: "18vh", dur: "10s", delay: "-4s", cls: "hw-md" },
  { x: "40%", top: "50%", drop: "12vh", dur: "9s", delay: "-6s" },
];

const BATS: Bat[] = [
  { x: "32%", top: "22%", dur: "9s", delay: "0s" },
  { x: "66%", top: "58%", dur: "12s", delay: "-5s", cls: "hw-md" },
  { x: "36%", top: "80%", dur: "10s", delay: "-2s", cls: "hw-md" },
];

function BatSVG() {
  return (
    <svg viewBox="0 0 100 60" fill="#1b1b1b" aria-hidden="true" className="hw-flap">
      <path d="M50 20 C40 5 20 0 0 15 C10 14 15 20 18 28 C25 24 30 26 34 32 C40 28 45 30 50 34 C55 30 60 28 66 32 C70 26 75 24 82 28 C85 20 90 14 100 15 C80 0 60 5 50 20Z" />
      <ellipse cx="50" cy="28" rx="6" ry="9" />
      <path d="M45 20 L42 11 L48 18Z M55 20 L58 11 L52 18Z" />
    </svg>
  );
}

function SpiderSVG() {
  return (
    <svg viewBox="0 0 100 80" aria-hidden="true">
      <g className="hw-legs" fill="none" stroke="#1b1b1b" strokeWidth="4" strokeLinecap="round">
        <path d="M50 25 Q30 20 15 35 M50 25 Q70 20 85 35 M50 30 Q25 35 10 55 M50 30 Q75 35 90 55 M50 35 Q30 50 22 72 M50 35 Q70 50 78 72 M50 25 Q40 15 30 10 M50 25 Q60 15 70 10" />
      </g>
      <ellipse cx="50" cy="42" rx="14" ry="16" fill="#1b1b1b" />
      <circle cx="50" cy="22" r="8" fill="#1b1b1b" />
      <circle className="hw-eye" cx="47" cy="20" r="2" fill="#ff7a18" />
      <circle className="hw-eye hw-eye-2" cx="53" cy="20" r="2" fill="#ff7a18" />
    </svg>
  );
}

function PumpkinSVG() {
  return (
    <svg viewBox="0 0 100 90" aria-hidden="true">
      <ellipse cx="32" cy="50" rx="24" ry="34" fill="#e8650a" />
      <ellipse cx="68" cy="50" rx="24" ry="34" fill="#e8650a" />
      <ellipse cx="50" cy="50" rx="26" ry="36" fill="#ff7a18" />
      <rect x="45" y="6" width="10" height="14" rx="3" fill="#2e7d32" />
      <path className="hw-pumpkin-eyes" d="M28 42 L40 52 L28 52Z M72 42 L60 52 L72 52Z" fill="#1b1b1b" />
      <path d="M30 64 L70 64 L64 74 L56 64 L50 74 L44 64 L36 74 Z" fill="#1b1b1b" />
    </svg>
  );
}

function Cobweb({ pos, cls = "" }: { pos: WebPos; cls?: string }) {
  return (
    <svg
      className={`hw-web hw-web-${pos} ${cls}`}
      viewBox="0 0 200 200"
      fill="none"
      stroke="#8a8a8a"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d={WEB_PATH} />
    </svg>
  );
}

function SideColumn({ side }: { side: "left" | "right" }) {
  const spiders = side === "left" ? SPIDERS : [...SPIDERS].reverse();
  const bats = side === "left" ? BATS : [...BATS].reverse();

  return (
    <div className={`hw-side hw-side-${side}`}>
      {spiders.map((s, i) => (
        <div
          key={`spider-${i}`}
          className={`hw-lane ${s.cls ?? ""}`}
          style={{ left: s.x, top: s.top } as CSSProperties}
        >
          <div
            className="hw-spider"
            style={
              {
                "--drop": s.drop,
                animationDuration: s.dur,
                animationDelay: s.delay,
              } as CSSProperties
            }
          >
            <div className="hw-thread" />
            <SpiderSVG />
          </div>
        </div>
      ))}

      {bats.map((b, i) => (
        <div
          key={`bat-${i}`}
          className={`hw-lane ${b.cls ?? ""}`}
          style={{ left: b.x, top: b.top } as CSSProperties}
        >
          <div
            className="hw-bat"
            style={{ animationDuration: b.dur, animationDelay: b.delay }}
          >
            <BatSVG />
          </div>
        </div>
      ))}

      <div className="hw-lane hw-pumpkin-lane">
        <div className="hw-pumpkin">
          <span className="hw-halo" aria-hidden="true" />
          <PumpkinSVG />
        </div>
      </div>
    </div>
  );
}

export default function HalloweenDecor() {
  const [mounted, setMounted] = useState(false);

  // El portal necesita document, así que solo se monta en el cliente
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <div className="hw-layer">
      <Cobweb pos="tl" />
      <Cobweb pos="tr" />
      <Cobweb pos="bl" />
      <Cobweb pos="br" />
      <Cobweb pos="ml" cls="hw-md" />
      <Cobweb pos="mr" cls="hw-md" />

      <SideColumn side="left" />
      <SideColumn side="right" />
    </div>,
    document.body
  );
}
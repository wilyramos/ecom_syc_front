"use client";

import { useEffect, useState } from "react";

export default function HalloweenOverlay() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();

    setActive(month === 9 || (month === 10 && day === 1));
  }, []);

  if (!active) return null;

  return (
    <div
      className="halloween-overlay"
      aria-hidden="true"
    >
      <div className="halloween-web halloween-web-left" />
      <div className="halloween-web halloween-web-right" />

      <div className="halloween-spider halloween-spider-left">
        <span className="halloween-spider-thread" />
        <span className="halloween-spider-body">🕷️</span>
      </div>

      <div className="halloween-spider halloween-spider-right">
        <span className="halloween-spider-thread" />
        <span className="halloween-spider-body">🕷️</span>
      </div>

      <span className="halloween-bat halloween-bat-one">
        🦇
      </span>

      <span className="halloween-bat halloween-bat-two">
        🦇
      </span>

      <span className="halloween-bat halloween-bat-three">
        🦇
      </span>
    </div>
  );
}
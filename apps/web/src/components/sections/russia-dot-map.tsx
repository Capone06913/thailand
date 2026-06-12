"use client";

import { motion } from "framer-motion";

const cities = [
  { name: "Москва", x: 18, y: 52 },
  { name: "СПб", x: 14, y: 38 },
  { name: "Казань", x: 28, y: 48 },
  { name: "Екб", x: 38, y: 50 },
  { name: "Новосибирск", x: 58, y: 52 },
  { name: "Краснодар", x: 22, y: 62 },
  { name: "Сочи", x: 20, y: 68 },
  { name: "Владивосток", x: 88, y: 58 },
];

export function RussiaDotMap() {
  return (
    <svg
      viewBox="0 0 100 80"
      className="h-full w-full"
      aria-hidden
      role="img"
    >
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M8 42 C12 28, 22 22, 35 26 C42 18, 55 20, 62 28 C72 24, 82 30, 90 38 C94 48, 88 58, 78 62 C70 70, 55 72, 42 68 C30 74, 18 68, 12 58 C6 52, 4 46, 8 42 Z"
        fill="url(#mapGlow)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="0.4"
      />

      {cities.map((city, i) => (
        <g key={city.name}>
          <motion.circle
            cx={city.x}
            cy={city.y}
            r="1.8"
            fill="var(--color-gold)"
            initial={{ opacity: 0.4, scale: 0.8 }}
            className="motion-reduce:animate-none"
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.15, 0.9] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
          <circle
            cx={city.x}
            cy={city.y}
            r="3.5"
            fill="var(--color-gold)"
            opacity="0.15"
          />
        </g>
      ))}
    </svg>
  );
}

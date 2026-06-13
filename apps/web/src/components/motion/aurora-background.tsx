"use client";

export function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full opacity-30 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(13,79,79,0.4) 0%, transparent 70%)",
          animation: "aurora-drift 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-1/4 top-1/4 h-[500px] w-[500px] rounded-full opacity-25 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,162,39,0.35) 0%, transparent 70%)",
          animation: "aurora-drift 15s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full opacity-20 blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(30,58,95,0.4) 0%, transparent 70%)",
          animation: "aurora-drift 18s ease-in-out infinite 2s",
        }}
      />
    </div>
  );
}


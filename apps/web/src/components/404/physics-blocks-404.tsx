"use client";

import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  FileText,
  Palmtree,
  Plane,
  Stamp,
} from "lucide-react";
import { createRoot } from "react-dom/client";

const BLOCKS = [
  { Icon: Plane, color: "#4a9fd4", w: 72, h: 72 },
  { Icon: Stamp, color: "#d4a853", w: 64, h: 80 },
  { Icon: Palmtree, color: "#0a4a48", w: 68, h: 68 },
  { Icon: FileText, color: "#142a45", w: 60, h: 76 },
  { Icon: Briefcase, color: "#c9a227", w: 70, h: 70 },
] as const;

export function PhysicsBlocks404() {
  const mountRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.innerWidth < 768;
    if (reduced || narrow) {
      setStaticMode(true);
      return;
    }

    let disposed = false;
    let spawnTimer: ReturnType<typeof setInterval>;
    const pairs: { body: import("matter-js").Body; el: HTMLDivElement }[] = [];

    async function init() {
      const Matter = await import("matter-js");
      const mount = mountRef.current;
      const layer = layerRef.current;
      if (!mount || !layer || disposed) return;

      const width = mount.clientWidth;
      const height = mount.clientHeight;

      const engine = Matter.Engine.create({
        gravity: { x: 0, y: 1, scale: 0.0012 },
      });
      const world = engine.world;

      Matter.World.add(world, [
        Matter.Bodies.rectangle(width / 2, height + 40, width + 240, 80, {
          isStatic: true,
          render: { visible: false },
        }),
        Matter.Bodies.rectangle(-40, height / 2, 80, height + 200, {
          isStatic: true,
          render: { visible: false },
        }),
        Matter.Bodies.rectangle(width + 40, height / 2, 80, height + 200, {
          isStatic: true,
          render: { visible: false },
        }),
      ]);

      const render = Matter.Render.create({
        element: mount,
        engine,
        options: {
          width,
          height,
          background: "transparent",
          wireframes: false,
          pixelRatio: Math.min(window.devicePixelRatio, 2),
        },
      });
      render.canvas.style.pointerEvents = "auto";
      render.canvas.style.position = "absolute";
      render.canvas.style.inset = "0";
      render.canvas.style.zIndex = "2";

      Matter.Render.run(render);
      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      const mouse = Matter.Mouse.create(render.canvas);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.18, render: { visible: false } },
      });
      Matter.World.add(world, mouseConstraint);
      render.mouse = mouse;

      function spawnBlock() {
        if (disposed || pairs.length >= 14 || !layer) return;
        const def = BLOCKS[Math.floor(Math.random() * BLOCKS.length)];
        const el = document.createElement("div");
        el.className =
          "pointer-events-none absolute z-[1] flex items-center justify-center rounded-2xl text-white shadow-lg";
        el.style.width = `${def.w}px`;
        el.style.height = `${def.h}px`;
        el.style.background = def.color;
        layer.appendChild(el);

        const iconHost = document.createElement("div");
        el.appendChild(iconHost);
        const root = createRoot(iconHost);
        root.render(<def.Icon size={28} strokeWidth={1.75} />);

        const body = Matter.Bodies.rectangle(
          Math.random() * (width - 100) + 50,
          -60,
          def.w,
          def.h,
          {
            chamfer: { radius: 14 },
            restitution: 0.5,
            friction: 0.06,
            angle: (Math.random() - 0.5) * 0.8,
            render: { visible: false },
          },
        );
        Matter.World.add(world, body);
        pairs.push({ body, el });
      }

      Matter.Events.on(engine, "afterUpdate", () => {
        pairs.forEach(({ body, el }) => {
          el.style.left = `${body.position.x}px`;
          el.style.top = `${body.position.y}px`;
          el.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
        });
      });

      spawnTimer = setInterval(spawnBlock, 850);
      for (let i = 0; i < 7; i++) setTimeout(spawnBlock, i * 180);

      const onResize = () => {
        if (disposed) return;
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        render.canvas.width = w;
        render.canvas.height = h;
        render.options.width = w;
        render.options.height = h;
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        clearInterval(spawnTimer);
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
        Matter.World.clear(world, false);
        Matter.Engine.clear(engine);
        render.canvas.remove();
        pairs.forEach((p) => p.el.remove());
      };
    }

    const cleanupPromise = init();

    return () => {
      disposed = true;
      cleanupPromise.then((cleanup) => cleanup?.());
    };
  }, []);

  if (staticMode) {
    return (
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute bottom-8 left-[10%] flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4a9fd4] text-white shadow-lg">
          <Plane size={28} />
        </div>
        <div className="absolute bottom-12 left-[35%] flex h-20 w-14 items-center justify-center rounded-2xl bg-[#d4a853] text-white shadow-lg">
          <Stamp size={26} />
        </div>
        <div className="absolute bottom-6 right-[30%] flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0a4a48] text-white shadow-lg">
          <Palmtree size={28} />
        </div>
        <div className="absolute bottom-10 right-[8%] flex h-14 w-16 items-center justify-center rounded-2xl bg-[#142a45] text-white shadow-lg">
          <FileText size={24} />
        </div>
      </div>
    );
  }

  return (
    <div ref={mountRef} className="absolute inset-0 overflow-hidden" aria-hidden>
      <div ref={layerRef} className="absolute inset-0 z-[1]" />
    </div>
  );
}


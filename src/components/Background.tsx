import { useEffect, useRef } from "react";
import { createRenderer, stepPointer, IDLE_POINTER } from "hazeglow/core";
import type { GradientConfig, PointerState } from "hazeglow/core";

type Props = { dark: GradientConfig; light: GradientConfig };

// One full-viewport canvas. Pointer is tracked on window because the canvas sits behind the page.
export default function Background({ dark, light }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const renderer = createRenderer(canvas);
    if (!renderer) return; // no WebGL2: solid --bg shows through
    const mq = matchMedia("(prefers-color-scheme: dark)");
    let config = mq.matches ? dark : light;
    let time = 0;
    let pointer: PointerState = IDLE_POINTER;
    let target = { x: 0.5, y: 0.5, inside: false };
    let raf = 0;
    let last = performance.now();

        const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      renderer.resize(innerWidth * dpr, innerHeight * dpr);
    };
    const onPointer = (e: PointerEvent) => {
      target = { x: e.clientX / innerWidth, y: e.clientY / innerHeight, inside: true };
    };
    const onLeave = () => (target = { ...target, inside: false });
    const onScheme = () => (config = mq.matches ? dark : light);
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (document.hidden) return;
      time += dt * config.speed;
      pointer = stepPointer(pointer, target, dt);
      renderer.render(config, time, pointer);
    };

    // size after the renderer is ready, or the canvas stays 1x1
    renderer.ready.then((ok) => {
      if (!ok) return;
      resize();
      canvas.style.opacity = "1";
    });
    addEventListener("resize", resize);
    addEventListener("pointermove", onPointer);
    addEventListener("pointerdown", onPointer);
    document.documentElement.addEventListener("pointerleave", onLeave);
    mq.addEventListener("change", onScheme);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onPointer);
      removeEventListener("pointerdown", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      mq.removeEventListener("change", onScheme);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: 0,
        transition: "opacity 400ms",
        pointerEvents: "none",
      }}
    />
  );
}

import { useEffect, useRef } from "react";

interface BlobConfig {
  id: number;
  color: string;
  size: number;
  baseX: number;
  baseY: number;
  scrollX: number;
  scrollY: number;
  scrollOpacity: number;
  baseOpacity: number;
  driftAmp: number;
  driftSpeed: number;
  driftPhaseX: number;
  driftPhaseY: number;
}

const blobs: BlobConfig[] = [
  { id: 1, color: "#7B9FD4", size: 1100, baseX: -120, baseY: -80, scrollX: 0.18, scrollY: -0.55, scrollOpacity: 0.04, baseOpacity: 0.13, driftAmp: 65, driftSpeed: 0.00018, driftPhaseX: 0, driftPhaseY: 1.2 },
  { id: 2, color: "#A8C0E8", size: 940, baseX: 700, baseY: 0, scrollX: -0.22, scrollY: -0.38, scrollOpacity: -0.02, baseOpacity: 0.14, driftAmp: 55, driftSpeed: 0.00014, driftPhaseX: 2.4, driftPhaseY: 0.8 },
  { id: 3, color: "#6B92C8", size: 800, baseX: 120, baseY: 350, scrollX: 0.28, scrollY: -0.18, scrollOpacity: 0.05, baseOpacity: 0.10, driftAmp: 48, driftSpeed: 0.00022, driftPhaseX: 1.1, driftPhaseY: 3.0 },
  { id: 4, color: "#B2C8EA", size: 860, baseX: 820, baseY: 480, scrollX: -0.14, scrollY: -0.44, scrollOpacity: 0.03, baseOpacity: 0.12, driftAmp: 58, driftSpeed: 0.00012, driftPhaseX: 3.6, driftPhaseY: 0.4 },
  { id: 5, color: "#8AAAD8", size: 700, baseX: 380, baseY: 180, scrollX: -0.08, scrollY: -0.62, scrollOpacity: 0.06, baseOpacity: 0.09, driftAmp: 42, driftSpeed: 0.00016, driftPhaseX: 0.7, driftPhaseY: 2.1 },
  { id: 6, color: "#5C80C0", size: 620, baseX: -60, baseY: 600, scrollX: 0.20, scrollY: -0.70, scrollOpacity: 0.07, baseOpacity: 0.08, driftAmp: 38, driftSpeed: 0.00020, driftPhaseX: 5.1, driftPhaseY: 1.6 },
];

const morphSequence = [
  "60% 40% 55% 45% / 50% 60% 40% 50%",
  "45% 55% 60% 40% / 60% 40% 55% 45%",
  "55% 45% 40% 60% / 45% 55% 60% 40%",
  "40% 60% 50% 50% / 55% 45% 50% 50%",
  "65% 35% 50% 50% / 40% 60% 55% 45%",
  "60% 40% 55% 45% / 50% 60% 40% 50%",
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function GlobalAmbientLayer() {
  const blobRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rawScrollY = useRef(0);
  const smoothScrollY = useRef(0);
  const prevScrollY = useRef(0);
  const smoothVelocity = useRef(0);
  const rafId = useRef(0);
  const morphIndex = useRef(0);
  const morphTimer = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      rawScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const tick = (time: number) => {
      const dt = lastTime.current === 0 ? 16 : Math.min(time - lastTime.current, 50);
      lastTime.current = time;

      smoothScrollY.current = lerp(smoothScrollY.current, rawScrollY.current, 0.07);

      const rawVel = smoothScrollY.current - prevScrollY.current;
      prevScrollY.current = smoothScrollY.current;
      smoothVelocity.current = lerp(smoothVelocity.current, rawVel, 0.12);

      const velAbs = Math.abs(smoothVelocity.current);
      const velNorm = Math.min(velAbs / 18, 1);

      morphTimer.current += dt;
      const morphInterval = lerp(6000, 1800, velNorm);
      if (morphTimer.current > morphInterval) {
        morphTimer.current = 0;
        morphIndex.current = (morphIndex.current + 1) % (morphSequence.length - 1);
      }
      const borderRadius = morphSequence[morphIndex.current];

      const sy = smoothScrollY.current;

      blobs.forEach((blob, i) => {
        const el = blobRefs.current[i];
        if (!el) return;

        const driftX = Math.sin(time * blob.driftSpeed + blob.driftPhaseX) * blob.driftAmp;
        const driftY = Math.cos(time * blob.driftSpeed * 0.8 + blob.driftPhaseY) * blob.driftAmp;

        const x = blob.baseX + driftX + sy * blob.scrollX;
        const y = blob.baseY + driftY + sy * blob.scrollY;

        const baseScale = 1 + Math.sin(time * blob.driftSpeed * 0.5 + blob.driftPhaseX) * 0.05;
        const velStretchX = 1 + velNorm * 0.18 * (smoothVelocity.current > 0 ? 1 : -1) * 0.3;
        const velStretchY = 1 + velNorm * 0.22;
        const scaleX = baseScale * velStretchX;
        const scaleY = baseScale * velStretchY;

        const scrollDepth = Math.min(sy / 2000, 1);
        const opacity = Math.min(
          Math.max(blob.baseOpacity + scrollDepth * blob.scrollOpacity + velNorm * 0.04, 0.04),
          0.22
        );

        el.style.transform = `translate(${x}px, ${y}px) scaleX(${scaleX}) scaleY(${scaleY})`;
        el.style.borderRadius = borderRadius;
        el.style.opacity = String(opacity);
      });

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {blobs.map((blob, i) => (
        <div
          key={blob.id}
          ref={(el) => { blobRefs.current[i] = el; }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: blob.size,
            height: blob.size,
            background: blob.color,
            opacity: blob.baseOpacity,
            filter: "blur(100px)",
            willChange: "transform, border-radius, opacity",
            transform: `translate(${blob.baseX}px, ${blob.baseY}px)`,
            transition: "border-radius 4s ease-in-out",
          }}
        />
      ))}
    </div>
  );
}

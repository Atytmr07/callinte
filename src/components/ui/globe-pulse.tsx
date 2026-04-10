"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

interface PulseMarker {
    id: string;
    location: [number, number];
    delay: number;
}

interface GlobePulseProps {
    markers?: PulseMarker[];
    className?: string;
    speed?: number;
}

const defaultMarkers: PulseMarker[] = [
    { id: "pulse-1", location: [41.01, 28.97] /* Istanbul */, delay: 0 },
    { id: "pulse-2", location: [51.51, -0.13] /* London */, delay: 0.5 },
    { id: "pulse-3", location: [40.71, -74.01] /* New York */, delay: 1 },
    { id: "pulse-4", location: [25.20, 55.27] /* Dubai */, delay: 1.5 },
    { id: "pulse-5", location: [1.35, 103.81] /* Singapore */, delay: 2 },
];

export function GlobePulse({
    markers = defaultMarkers,
    className = "",
    speed = 0.003,
}: GlobePulseProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
    const dragOffset = useRef({ phi: 0, theta: 0 });
    const phiOffsetRef = useRef(0);
    const thetaOffsetRef = useRef(0);
    const isPausedRef = useRef(false);

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        pointerInteracting.current = { x: e.clientX, y: e.clientY };
        if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        isPausedRef.current = true;
    }, []);

    const handlePointerUp = useCallback(() => {
        if (pointerInteracting.current !== null) {
            phiOffsetRef.current += dragOffset.current.phi;
            thetaOffsetRef.current += dragOffset.current.theta;
            dragOffset.current = { phi: 0, theta: 0 };
        }
        pointerInteracting.current = null;
        if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        isPausedRef.current = false;
    }, []);

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (pointerInteracting.current !== null) {
                dragOffset.current = {
                    phi: (e.clientX - pointerInteracting.current.x) / 300,
                    theta: (e.clientY - pointerInteracting.current.y) / 1000,
                };
            }
        };
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("pointerup", handlePointerUp, { passive: true });
        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [handlePointerUp]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        let globe: ReturnType<typeof createGlobe> | null = null;
        let animationId: number;
        let phi = 0;

        function init() {
            const width = canvas.offsetWidth;
            if (width === 0 || globe) return;

            globe = createGlobe(canvas, {
                devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
                width,
                height: width,
                phi: 0,
                theta: 0.2, // Tilted globe
                dark: 0,    // Light mode design
                diffuse: 1.2,
                mapSamples: 16000,
                mapBrightness: 6,
                baseColor: [0.93, 0.94, 0.96], // slate-100 base
                markerColor: [0.14, 0.39, 0.92], // blue-600
                glowColor: [0.96, 0.97, 0.98], // Light background glow
                markerElevation: 0,
                markers: markers.map((m) => ({ location: m.location, size: 0.05, id: m.id })),
                arcs: [],
                arcColor: [0.3, 0.85, 0.95],
                arcWidth: 0.5,
                arcHeight: 0.25,
                opacity: 0.8,
            });

            function animate() {
                if (!isPausedRef.current) phi += speed;
                // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                globe?.update({
                    phi: phi + phiOffsetRef.current + dragOffset.current.phi,
                    theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
                });
                animationId = requestAnimationFrame(animate);
            }
            animate();
            setTimeout(() => canvas && (canvas.style.opacity = "1"));
        }

        if (canvas.offsetWidth > 0) {
            init();
        } else {
            const ro = new ResizeObserver((entries) => {
                if (entries[0]?.contentRect.width > 0) {
                    ro.disconnect();
                    init();
                }
            });
            ro.observe(canvas);
        }

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
            if (globe) globe.destroy();
        };
    }, [markers, speed]);

    return (
        <div className={`relative aspect-square select-none ${className}`}>
            <style>{`
        @keyframes pulse-expand {
          0% { transform: scaleX(0.3) scaleY(0.3); opacity: 0.8; }
          100% { transform: scaleX(1.5) scaleY(1.5); opacity: 0; }
        }
      `}</style>
            <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                style={{
                    width: "100%",
                    height: "100%",
                    cursor: "grab",
                    opacity: 0,
                    transition: "opacity 1.2s ease",
                    borderRadius: "50%",
                    touchAction: "none",
                }}
            />
            {markers.map((m) => (
                <div
                    key={m.id}
                    style={
                        {
                            position: "absolute",
                            positionAnchor: `--cobe-${m.id}`,
                            bottom: "anchor(center)",
                            left: "anchor(center)",
                            translate: "-50% 50%",
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            pointerEvents: "none" as const,
                            opacity: `var(--cobe-visible-${m.id}, 0)`,
                            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
                            transition: "opacity 0.4s, filter 0.4s",
                        } as any
                    }
                >
                    <span
                        style={{
                            position: "absolute",
                            inset: 0,
                            border: "2px solid #2563eb",
                            borderRadius: "50%",
                            opacity: 0,
                            animation: `pulse-expand 2s ease-out infinite ${m.delay}s`,
                        }}
                    />
                    <span
                        style={{
                            position: "absolute",
                            inset: 0,
                            border: "2px solid #2563eb",
                            borderRadius: "50%",
                            opacity: 0,
                            animation: `pulse-expand 2s ease-out infinite ${m.delay + 0.5}s`,
                        }}
                    />
                    <span
                        style={{
                            width: 10,
                            height: 10,
                            background: "#2563eb",
                            borderRadius: "50%",
                            boxShadow: "0 0 0 3px rgba(255,255,255,0.8), 0 0 0 5px rgba(37,99,235,0.5)",
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

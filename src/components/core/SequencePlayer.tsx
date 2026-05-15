"use client";

import { useEffect, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";

export function SequencePlayer({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let rafId = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const progress = smoothProgress.get();
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#10302E";
      context.fillRect(0, 0, width, height);
      context.strokeStyle = "rgba(224, 140, 113, 0.75)";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(width * 0.12, height * 0.68);
      context.bezierCurveTo(width * 0.34, height * 0.3, width * 0.58, height * 0.86, width * 0.88, height * 0.34);
      context.setLineDash([Math.max(1, progress * width), width]);
      context.stroke();
      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [smoothProgress]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

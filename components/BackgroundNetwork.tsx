"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  glowRadius: number;
}

export default function BackgroundNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates tracking
    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initialize nodes based on device resolution (screen width)
    const initNodes = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      // Lower density on mobile screens, slightly higher on desktop
      const isMobile = width < 768;
      const count = isMobile ? 32 : 88;
      nodes = [];

      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // Extremely slow velocity for gentle float
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          radius: Math.random() * 1.2 + 1.2,
          glowRadius: Math.random() * 3 + 3,
        });
      }
    };

    initNodes();

    const handleResize = () => {
      initNodes();
    };
    window.addEventListener("resize", handleResize);

    // Drawing loops
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background dark fill
      ctx.fillStyle = "#0a0a0c";
      ctx.fillRect(0, 0, width, height);

      const maxDistance = width < 768 ? 95 : 135;
      const mouseMaxDistance = 160;

      // Update positions and draw connections
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Update position
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        // Boundary checks (bounce with tiny friction)
        if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
        if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

        // Draw connections between nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Calculate opacity proportional to closeness
            const alpha = (1 - dist / maxDistance) * 0.11;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(200, 205, 215, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }

        // Draw connection to mouse position
        if (mouse.x > -1000) {
          const dx = nodeA.x - mouse.x;
          const dy = nodeA.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseMaxDistance) {
            const alpha = (1 - dist / mouseMaxDistance) * 0.14;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(197, 168, 128, ${alpha})`; // Soft gold connection indicator
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }

        // Draw tiny nodes
        // Main Core Node
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220, 222, 226, 0.24)";
        ctx.fill();

        // Subtle Outer Node Glow (Warm Gold accent)
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(197, 168, 128, 0.05)";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: "#0a0a0c" }}
    />
  );
}

'use client';

import { useEffect, useRef, RefObject } from "react";

export default function useMatrixRain(): RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    
    if (!ctx) return;

    // Make canvas fullscreen
    const resizeCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters
    const matrixChars: string =
      "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ1234567890";

    // Drops initial position
    const columns: number = Math.floor(canvas.width / 20);
    const drops: number[] = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * canvas.height)
    );

    // Animation ID for cleanup
    let animationId: number;

    // Drawing green rain
    function draw(): void {
      // We already checked if ctx is null above
      const context = ctx as CanvasRenderingContext2D;
      
      // Semi-transparent black background to create trail effect
      context.fillStyle = "rgba(0, 0, 0, 0.05)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "#0f0";
      context.font = "20px monospace";

      // Draw each character
      for (let i = 0; i < drops.length; i++) {
        // Get random character
        const char: string = matrixChars.charAt(
          Math.floor(Math.random() * matrixChars.length)
        );

        // Draw character
        context.fillText(char, i * 20, drops[i] * 20);

        // Randomize the opacity a bit for more visual interest
        context.globalAlpha = Math.random() * 0.5 + 0.5;

        // Iterate through drops, incrementing each one
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Reset alpha
      context.globalAlpha = 1;

      // Request next frame
      animationId = requestAnimationFrame(draw);
    }

    // Start animation
    draw();

    // Clean up
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return canvasRef;
}

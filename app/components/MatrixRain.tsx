'use client';

import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  density?: number;
  speed?: number;
  fontSize?: number;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ 
  density = 0.05, 
  speed = 0.05, 
  fontSize = 14 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Characters to display
    const chars = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑".split("");
    
    // Initialize drops array here before any functions try to use it
    const drops: number[] = [];

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initMatrix();
    };

    // Initialize the matrix drops
    function initMatrix() {
      // Clear the drops array
      drops.length = 0;
      
      const columns = Math.floor(width / fontSize);
      
      // Initialize drops at random positions
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
      }
    }

    window.addEventListener('resize', setCanvasDimensions);
    setCanvasDimensions();

    const draw = () => {
      // Add semi-transparent black background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      // Set text color and font
      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px 'Courier New', monospace`;
      
      // Loop through drops
      for (let i = 0; i < drops.length; i++) {
        // Generate random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reset drop position when it reaches bottom or randomly for rainfall effect
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move drop down
        drops[i] += speed * 0.05;
      }
    };

    // Animation
    let animationId: number;
    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationId);
    };
  }, [density, speed, fontSize]);

  return <canvas ref={canvasRef} id="matrix-canvas" />;
};

export default MatrixRain; 
'use client';

import { useState, useEffect } from 'react';
import Me from "../../public/images/me.jpg"

interface HeroProps {
  active: boolean;
}

export default function Hero({ active }: HeroProps) {
  const [binaryCircleContent, setBinaryCircleContent] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Function to generate binary circle for profile
  useEffect(() => {
    generateBinaryCircle();

    // Check screen height for responsive adjustments
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerHeight < 700);
    };

    // Initial check
    checkScreenSize();

    // Add listener for resize events
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Generate binary circle content
  const generateBinaryCircle = () => {
    const center = 100;
    const radius = 95;
    const binaryText = '01';
    const numPoints = 120;
    
    let content = '';
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      const binary = binaryText[Math.floor(Math.random() * 2)];
      const fontSize = 8 + Math.random() * 4;
      const opacity = 0.3 + Math.random() * 0.7;
      
      content += `<text x="${x}" y="${y}" fill="#0f0" font-size="${fontSize}" opacity="${opacity}" transform="rotate(${angle * 180 / Math.PI + 90}, ${x}, ${y})">${binary}</text>`;
    }
    
    setBinaryCircleContent(content);
  };

  // Handle explore button click
  const handleExploreClick = () => {
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const targetPosition = skillsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className={`hero ${active ? 'active' : ''} ${isSmallScreen ? 'small-screen' : ''}`}>
      <div className="digital-bg"></div>
      <div className="hero-content">
        <div className="profile-container">
          <div className="profile-img">
            <img src={Me.src} height={200} width={200}/>
            <div className="profile-data-overlay">
              <div>SUBJECT: JUAN FLORES</div>
              <div>STATUS: ONLINE</div>
              <div>SKILL LEVEL: MAXIMUM</div>
            </div>
          </div>
          <svg 
            className="profile-binary" 
            viewBox="0 0 200 200"
            dangerouslySetInnerHTML={{ __html: binaryCircleContent }}
          />
        </div>
        
        <h1>Juan Flores</h1>
        <h2>Senior Full Stack Developer</h2>
        <p>"I've been tearing apart code and building dope shit since forever. Now, I'm a Senior Full Stack Dev who turns chaos into clean, fast solutions. Step into my world."</p>
        
        <button className="pill-button" onClick={handleExploreClick}>
          Explore My Work
        </button>
      </div>
    </section>
  );
}
'use client';

import { useState } from 'react';
import useScrollAnimations from '../hooks/useScrollAnimations';

export default function Education() {
  // State for diploma button
  const [diplomaUnlocked, setDiplomaUnlocked] = useState<boolean>(false);
  
  // Initialize scroll animations
  useScrollAnimations();
  
  // Handle diploma button click
  const handleDiplomaClick = () => {
    setDiplomaUnlocked(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setDiplomaUnlocked(false);
    }, 3000);
  };
  
  return (
    <section id="education">
      <div className="container">
        <h2 className="section-title">The Origin Story</h2>
        <div className="education-card">
          <div className="education-icon">⚡</div>
          <div className="education-info">
            <h3 className="education-degree">B.S. Computer Science, Software Engineering</h3>
            <p className="education-school">UNC Charlotte, May 2016</p>
            
            <div className="education-highlights">
              <h4>Training Arc Highlights:</h4>
              <ul>
                <li>🏆 Led team to victory in regional hackathon</li>
                <li>💻 Published first open-source project</li>
                <li>🚀 Internship at tech startup</li>
                <li>📊 Research assistant for data visualization lab</li>
              </ul>
            </div>
            
            <button 
              className="diploma-btn" 
              onClick={handleDiplomaClick}
              style={{
                backgroundColor: diplomaUnlocked ? '#0f0' : '',
                color: diplomaUnlocked ? '#000' : '',
                boxShadow: diplomaUnlocked ? '0 0 20px rgba(0, 255, 0, 0.7)' : ''
              }}
            >
              {diplomaUnlocked ? 'Achievement Unlocked! 🏆' : 'Diploma Unlocked!'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
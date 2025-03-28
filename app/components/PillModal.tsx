'use client';

import { useEffect } from 'react';

interface PillModalProps {
  active: boolean;
  onRedPill: () => void;
  onBluePill: () => void;
}

export default function PillModal({ active, onRedPill, onBluePill }: PillModalProps) {
  return (
    <div className={`pill-modal ${active ? 'active' : ''}`}>
      <div className="pill-container">
        <div className="pill-message">
          Take the red pill to see how deep the rabbit hole goes.<br />
          Take the blue pill and the story ends.
        </div>
        
        <div 
          id="red-pill" 
          className="pill-choice red-pill" 
          onClick={onRedPill}
        >
          <div className="pill-text">RED PILL</div>
        </div>
        
        <div 
          id="blue-pill" 
          className="pill-choice blue-pill" 
          onClick={onBluePill}
        >
          <div className="pill-text">BLUE PILL</div>
        </div>
      </div>
    </div>
  );
}
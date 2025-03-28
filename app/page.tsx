'use client';

import { useState, useEffect } from 'react';
import MatrixEntry from './components/MatrixEntry';
import PillModal from './components/PillModal';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import useMatrixRain from './hooks/useMatrixRain';

export default function Home() {
  // State to control visibility of components
  const [showMatrixEntry, setShowMatrixEntry] = useState(true);
  const [showPillModal, setShowPillModal] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [matrix3DOpacity, setMatrix3DOpacity] = useState(0);
  const [heroActive, setHeroActive] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Initialize Matrix Rain effect
  const matrixCanvasRef = useMatrixRain();

  // Function to handle red pill choice
  const handleRedPill = () => {
    setShowPillModal(false);
    setTimeout(() => {
      setShowMainContent(true);
      setHeaderVisible(true);
      setHeroActive(true);
      setMatrix3DOpacity(1);
    }, 500);
  };

  // Function to handle blue pill choice
  const handleBluePill = () => {
    window.location.href = 'https://www.google.com';
  };

  // Function to finish the matrix entry sequence and show pill modal
  const finishEntrySequence = () => {
    setShowMatrixEntry(false);
    setTimeout(() => {
      // Skip pill modal and go directly to main content
      setShowMainContent(true);
      setHeaderVisible(true); 
      setHeroActive(true);
      setMatrix3DOpacity(1);
    }, 1000);
  };

  return (
    <div>
      {/* CRT effects */}
      <div className="scan-line"></div>
      <div className="crt-overlay"></div>

      {/* Matrix entry sequence */}
      {showMatrixEntry && (
        <MatrixEntry onFinishSequence={finishEntrySequence} />
      )}

      {/* Red Pill / Blue Pill Modal */}
      {showPillModal && (
        <PillModal
          onRedPill={handleRedPill}
          onBluePill={handleBluePill}
          active={showPillModal}
        />
      )}

      {/* Digital Rain Canvas */}
      <canvas id="matrix-canvas" ref={matrixCanvasRef}></canvas>

      {/* 3D Matrix World Canvas - would be implemented with Three.js */}
      <canvas
        id="matrix-3d-canvas"
        style={{ opacity: matrix3DOpacity, transition: 'opacity 3s ease' }}
      ></canvas>

      {/* Main Content */}
      <div id="main-content" style={{
        opacity: showMainContent ? 1 : 0,
        transition: 'opacity 2s ease-in-out'
      }}>
        {/* Header */}
        <Header visible={headerVisible} />

        {/* Main sections */}
        <Hero active={heroActive} />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
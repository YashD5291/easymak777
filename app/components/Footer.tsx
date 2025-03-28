'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-links">
          <a href="https://github.com/EASYMAK777" target="_blank" rel="noreferrer" className="footer-link">GH</a>
          <a href="mailto:juan.flores.engineer@gmail.com" className="footer-link">@</a>
          <a href="https://jflores.vercel.app" target="_blank" rel="noreferrer" className="footer-link">🌐</a>
        </div>
        <p className="footer-text">© {new Date().getFullYear()} Juan Flores | Senior Full Stack Developer</p>
      </div>
      <div className="footer-matrix"></div>
    </footer>
  );
}
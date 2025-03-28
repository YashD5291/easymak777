'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  visible: boolean;
}

export default function Header({ visible }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('home');
  
  // Function to handle smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
    }
  };
  
  // Set up scroll observer to highlight active nav item
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    
    const options = {
      rootMargin: '-30% 0px -70% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  return (
    <header id="site-header" className={visible ? 'visible' : ''}>
      <nav>
        <a href="#home" className="logo" onClick={(e) => handleNavClick(e, 'home')}>
          EASYMAK777
        </a>
        <div className="nav-links">
          <a 
            href="#home" 
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'home')}
          >
            Home
          </a>
          <a 
            href="#skills" 
            className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'skills')}
          >
            Skills
          </a>
          <a 
            href="#projects" 
            className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'projects')}
          >
            Projects
          </a>
          <a 
            href="#experience" 
            className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'experience')}
          >
            Experience
          </a>
          <a 
            href="#education" 
            className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'education')}
          >
            Education
          </a>
          <a 
            href="#contact" 
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
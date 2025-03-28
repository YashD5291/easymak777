'use client';

import { useEffect } from 'react';

export default function useScrollAnimations(): void {
  useEffect(() => {
    // Elements to animate
    const sectionTitles = document.querySelectorAll<HTMLElement>('.section-title');
    const skillsContainer = document.querySelector<HTMLElement>('.skills-container');
    const projectCards = document.querySelectorAll<HTMLElement>('.project-card');
    const experienceItems = document.querySelectorAll<HTMLElement>('.experience-item');
    const educationCard = document.querySelector<HTMLElement>('.education-card');
    const contactInfo = document.querySelector<HTMLElement>('.contact-info');
    const contactForm = document.querySelector<HTMLElement>('.contact-form');
    
    // Intersection Observer options
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    // Observe section titles
    const titleObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('visible');
        }
      });
    }, options);
    
    sectionTitles.forEach(title => {
      titleObserver.observe(title);
    });
    
    // Observe skills container
    if (skillsContainer) {
      const skillsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('visible');
            
            // Animate skill bars
            const skillBars = entry.target.querySelectorAll<HTMLElement>('.skill-progress-bar');
            skillBars.forEach((bar, index) => {
              setTimeout(() => {
                const width = bar.getAttribute('data-width') || '0%';
                bar.style.width = width;
              }, index * 100);
            });
          }
        });
      }, options);
      
      skillsObserver.observe(skillsContainer);
    }
    
    // Observe project cards
    const projectObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('visible');
          
          // Animate deploy button progress
          setTimeout(() => {
            const progressBar = entry.target.querySelector<HTMLElement>('.deploy-btn .deploy-progress');
            if (progressBar) progressBar.style.width = '100%';
          }, 500);
        }
      });
    }, options);
    
    projectCards.forEach(card => {
      projectObserver.observe(card);
    });
    
    // Observe experience items
    const experienceObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger animation
          const index = Array.from(experienceItems).indexOf(entry.target as HTMLElement);
          setTimeout(() => {
            (entry.target as HTMLElement).classList.add('visible');
          }, index * 200);
        }
      });
    }, options);
    
    experienceItems.forEach(item => {
      experienceObserver.observe(item);
    });
    
    // Observe education card
    if (educationCard) {
      const educationObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('visible');
          }
        });
      }, options);
      
      educationObserver.observe(educationCard);
    }
    
    // Observe contact sections
    const contactObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('visible');
        }
      });
    }, options);
    
    if (contactInfo) contactObserver.observe(contactInfo);
    if (contactForm) contactObserver.observe(contactForm);
    
    // Clean up
    return () => {
      titleObserver.disconnect();
      projectObserver.disconnect();
      experienceObserver.disconnect();
      if (skillsContainer) skillsContainer.classList.remove('visible');
      if (educationCard && educationCard.classList.contains('visible')) {
        educationCard.classList.remove('visible');
      }
      if (contactInfo) contactObserver.disconnect();
      if (contactForm) contactObserver.disconnect();
    };
  }, []);
}
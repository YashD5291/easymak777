'use client';

import { useState } from 'react';
import useScrollAnimations from '../hooks/useScrollAnimations';

interface Project {
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  role: string[];
  win: string;
  link: string;
}

interface DeployState {
  progress: boolean;
  deployed: boolean;
}

// Project data
const projects: Project[] = [
  {
    title: "Bright Horizons",
    tagline: "CMS That Punches Traffic in the Face",
    description: "Built a Sitecore CMS for 300+ childcare centers that eats heavy loads for breakfast.",
    techStack: ["Sitecore", "React", "Cloudflare", "Google Maps API"],
    role: [
      "Kicked Backbone.js and jQuery to the curb for React—legacy code can suck it.",
      "Added Google Maps so parents don't lose their shit finding centers.",
      "Used Cloudflare to keep it fast when the internet's a mess."
    ],
    win: "Cut load times by 40%. Parents love it.",
    link: "https://brighthorizons.com"
  },
  {
    title: "AACSB",
    tagline: "APIs Faster Than Your Mom's Wi-Fi",
    description: "High-performance platform with Java and GraphQL that's lean and cheap.",
    techStack: ["Java", "Spring Boot", "GraphQL", "PostgreSQL", "GCP"],
    role: [
      "Wrote Java APIs that slashed retrieval by 25%—slow code's for losers.",
      "Tuned PostgreSQL queries for 30% faster analytics.",
      "Put it on GCP and saved 15% cash—efficiency, baby."
    ],
    win: "Fast data, low costs, happy clients.",
    link: "https://aacsb.edu"
  },
  {
    title: "Operation: TaskMaster",
    tagline: "Personal Project Beast Mode",
    description: "Task management app with real-time updates and smart prioritization.",
    techStack: ["React", "Firebase", "Node.js", "Express"],
    role: [
      "Built the entire stack from scratch",
      "Implemented real-time updates with WebSockets",
      "Created smart task prioritization algorithm"
    ],
    win: "Used by 500+ users with 4.8/5 rating",
    link: "https://github.com/EASYMAK777/taskmaster"
  }
];

export default function Projects() {
  // States for deploy buttons
  const [deployStates, setDeployStates] = useState<DeployState[]>(
    projects.map(() => ({ progress: false, deployed: false }))
  );
  
  // Initialize scroll animations
  useScrollAnimations();
  
  // Handle deploy button click
  const handleDeploy = (index: number) => {
    // Set progress
    setDeployStates(prev => {
      const newStates = [...prev];
      newStates[index] = { ...newStates[index], progress: true };
      return newStates;
    });
    
    // After progress animation completes, set to deployed
    setTimeout(() => {
      setDeployStates(prev => {
        const newStates = [...prev];
        newStates[index] = { progress: false, deployed: true };
        return newStates;
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setDeployStates(prev => {
          const newStates = [...prev];
          newStates[index] = { progress: false, deployed: false };
          return newStates;
        });
      }, 3000);
    }, 1500);
  };
  
  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">Hall of Legends</h2>
        <div className="projects-container">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-tagline">{project.tagline}</p>
                <p>{project.description}</p>
                
                <div className="tech-stack">
                  {project.techStack.map((tech, techIndex) => (
                    <span className="tech-tag" key={techIndex}>{tech}</span>
                  ))}
                </div>
                
                <div className="project-role">
                  <h4>My Role:</h4>
                  <ul>
                    {project.role.map((item, roleIndex) => (
                      <li key={roleIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="project-wins">
                  <h4>Wins:</h4>
                  <p>{project.win}</p>
                </div>
                
                <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                  View Project →
                </a>
              </div>
              <div className="project-visual">
                <button 
                  className="deploy-btn" 
                  onClick={() => handleDeploy(index)}
                  style={{
                    color: deployStates[index].deployed ? '#000' : '',
                    backgroundColor: deployStates[index].deployed ? '#0f0' : '',
                    boxShadow: deployStates[index].deployed ? '0 0 20px rgba(0, 255, 0, 0.7)' : ''
                  }}
                >
                  {deployStates[index].deployed ? 'Live!' : (deployStates[index].progress ? 'Deploying...' : 'Deploy')}
                  <div 
                    className="deploy-progress" 
                    style={{ width: deployStates[index].progress || deployStates[index].deployed ? '100%' : '0%' }}
                  ></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
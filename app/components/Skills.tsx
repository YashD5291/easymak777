'use client';

import { useState } from 'react';
import useScrollAnimations from '../hooks/useScrollAnimations';

interface SkillsProps {
  active?: boolean;
}

export default function Skills({ active }: SkillsProps) {
  // Initialize scroll animations
  useScrollAnimations();

  // Skill categories
  const skillCategories = [
    {
      name: "Languages",
      skills: [
        { name: "JavaScript", level: "90%" },
        { name: "TypeScript", level: "85%" },
        { name: "Python", level: "70%" },
        { name: "Java", level: "65%" },
        { name: "C#", level: "60%" },
      ]
    },
    {
      name: "Front-End",
      skills: [
        { name: "React", level: "95%" },
        { name: "Angular", level: "80%" },
        { name: "Next.js", level: "90%" },
        { name: "HTML", level: "100%" },
        { name: "CSS", level: "95%" },
      ]
    },
    {
      name: "Back-End",
      skills: [
        { name: "Node.js", level: "90%" },
        { name: "Express.js", level: "90%" },
        { name: "Django", level: "70%" },
        { name: "Spring Boot", level: "60%" },
        { name: "ASP.NET Core", level: "60%" },
      ]
    },
    {
      name: "Databases",
      skills: [
        { name: "MySQL", level: "85%" },
        { name: "PostgreSQL", level: "80%" },
        { name: "MongoDB", level: "75%" },
      ]
    },
    {
      name: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: "80%" },
        { name: "Docker", level: "75%" },
        { name: "CI/CD", level: "85%" },
      ]
    },
    {
      name: "APIs & Architecture",
      skills: [
        { name: "REST", level: "95%" },
        { name: "GraphQL", level: "80%" },
        { name: "Microservices", level: "75%" },
        { name: "Serverless", level: "70%" },
      ]
    }
  ];

  return (
    <section id="skills" className={active ? 'active' : ''}>
      <div className="container">
        <h2 className="section-title">Tech Arsenal</h2>

        <div className="skills-container">
          {skillCategories.map((category, catIndex) => (
            <div className="skill-category" key={catIndex}>
              <h3>{category.name}</h3>
              {category.skills.map((skill, skillIndex) => (
                <div className="skill-item" key={skillIndex}>
                  <div className="skill-name">
                    <span>{skill.name}</span>
                    <span className="skill-level">{skill.level}</span>
                  </div>
                  <div className="skill-progress">
                    <div
                      className="skill-progress-bar"
                      data-width={skill.level}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
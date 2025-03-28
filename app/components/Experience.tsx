'use client';

import { useState } from 'react';
import useScrollAnimations from '../hooks/useScrollAnimations';

interface Experience {
    date: string;
    company: string;
    win: string;
    details: string;
}

// Experience data
const experiences: Experience[] = [
    {
        date: "Nov 2022 – Jan 2025",
        company: "Hub International",
        win: "Revamped Insureon and TechInsurance with React—30% easier to maintain, 1.2s faster loads.",
        details: "Led frontend team of 5 engineers, implemented CI/CD pipeline, mentored junior developers. Transformed legacy codebase into modern architecture using React and TypeScript, resulting in significant performance improvements and reduced maintenance overhead."
    },
    {
        date: "Jan 2022 – Oct 2022",
        company: "Blue Sky Commerce",
        win: "Led Rural King to Next.js—25% better mobile, 35% faster APIs.",
        details: "Architected new e-commerce platform, integrated payment APIs, improved SEO scores. Implemented responsive design principles that significantly boosted mobile conversion rates and optimized backend API performance for faster product catalog searches."
    },
    {
        date: "Apr 2021 – Dec 2021",
        company: "USDM",
        win: "Slashed EHR errors by 20% at USDM.",
        details: "Developed healthcare compliance software, worked with HIPAA regulations, optimized database performance. Created validation systems that caught potential data entry errors before they could impact patient care, saving healthcare providers time and improving data accuracy."
    },
    {
        date: "Aug 2019 – Mar 2021",
        company: "Healthcare.com",
        win: "Boosted conversion rates by 15% with optimized user flows.",
        details: "Built comparison tool, integrated with multiple insurance APIs, implemented AB testing framework. Redesigned the user journey using data-driven insights that dramatically improved user engagement and conversion metrics."
    },
    {
        date: "Jun 2017 – Jul 2019",
        company: "College H.U.N.K.S",
        win: "Created booking system that increased efficiency by 30%.",
        details: "Built route optimization algorithms, developed customer portal, implemented real-time tracking. Created an intelligent scheduling system that maximized truck capacity and minimized travel time, resulting in more jobs completed per day and higher customer satisfaction."
    }
];

export default function Experience() {
    // Initialize scroll animations
    useScrollAnimations();

    return (
        <section id="experience">
            <div className="container">
                <h2 className="section-title">Career Chronicles</h2>
                <div className="experience-timeline">
                    {experiences.map((item, index) => (
                        <div className="experience-item" key={index}>
                            <div className="experience-content">
                                <div className="experience-date">{item.date}</div>
                                <h3 className="experience-company">{item.company}</h3>
                                <p className="experience-win">{item.win}</p>
                                <div className="experience-details">
                                    <p>{item.details}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
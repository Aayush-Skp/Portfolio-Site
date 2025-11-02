import React from 'react';
import "./Experience.css";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaLink } from 'react-icons/fa';

const Experience = () => {
    const experiences = [
        {
            id: 1,
            title: "Mobile Application Developer",
            company: "Devana soft",
            employmentType: "Full-time",
            duration: "Jun 2024 - Present · 1 yr 6 mos",
            location: "Kathmandu, Bāgmatī, Nepal · On-site",
            responsibilities: [
                "Developed key features for iSmart, a banking app serving 50k+ users, including QR payment integration, bill utilities, and real-time balance updates.",
                "Built the web version of iSmart Banking using Flutter, ensuring consistent UI and performance across platforms.",
                "Developed the Collector App, a mobile solution for field agents to manage and collect customer payments efficiently.",
                "Implemented QR code scanning, geolocation tracking, and POS printing for fast, secure, and reliable transactions.",
                "Enabled real-time and scheduled data sync with the central server for seamless reporting and accuracy.",
                "Focused on data integrity, secure authentication, and optimized user workflows for field operations.",
                "Developed the frontend of the iSmart website using Angular, enhancing accessibility and user experience."
            ],
            skills: ["Mobile Application Development", "iOS", "Flutter", "Angular"]
        },
        {
            id: 2,
            title: "Co-Founder | tech lead",
            company: "Itech Karnali",
            employmentType: "Part-time",
            duration: "Jul 2023 - Present · 2 yrs 5 mos",
            location: "Karnālī, Nepal · Hybrid",
            responsibilities: [
                "Co-founded and Co-led iTech Karnali, a tech community dedicated to empowering IT enthusiasts across the Karnali region.",
                "Served as Vice Coordinator and Tech Lead, overseeing community operations, events, and technical initiatives.",
                "Organized 30+ workshops and sessions, fostering technical skill development for 1000+ participants.",
                "Connected Karnali students with the wider Kathmandu tech ecosystem through mentorship and resource sharing.",
                "Encouraged volunteering and built a networking platform to unite tech enthusiasts within and beyond Karnali."
            ],
            skills: ["Cross-functional Team Leadership", "Project Planning", "Community Building"],
            companyLink: "https://www.linkedin.com/company/itech-karnali"
        },
        {
            id: 3,
            title: "Creative Team Lead",
            company: "AWS Cloud Club - Tribhuvan University",
            employmentType: "Part-time",
            duration: "Nov 2023 - Oct 2024 · 1 yr",
            location: "Remote",
            responsibilities: [
                "Creative Team lead at AWS Cloud Club – Nepal, contributing to the club's digital presence and outreach.",
                "Designed promotional and branding assets, enhancing event visibility and boosting social media engagement.",
                "Assisted in digital marketing strategy and content design, strengthening the club's overall brand identity and reach."
            ],
            skills: ["Design Leadership", "Adobe Photoshop", "Digital Marketing"]
        }
    ];

    return (
        <section className="experience">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="experience-bx">
                            <h2>Experience</h2>
                            <p>My professional journey and contributions.</p>

                            <div className="experience-timeline">
                                {experiences.map((exp, index) => (
                                    <div key={exp.id} className="experience-card">
                                        <div className="experience-header">
                                            <div className="experience-icon">
                                                <FaBriefcase />
                                            </div>
                                            <div className="experience-title-section">
                                                <h3>{exp.title}</h3>
                                                <div className="experience-company">
                                                    <span className="company-name">{exp.company}</span>
                                                    {exp.companyLink && (
                                                        <a 
                                                            href={exp.companyLink} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="company-link"
                                                        >
                                                            <FaLink />
                                                        </a>
                                                    )}
                                                </div>
                                                <div className="experience-meta">
                                                    <span className="employment-type">{exp.employmentType}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="experience-details">
                                            <div className="experience-duration">
                                                <FaCalendarAlt />
                                                <span>{exp.duration}</span>
                                            </div>
                                            <div className="experience-location">
                                                <FaMapMarkerAlt />
                                                <span>{exp.location}</span>
                                            </div>
                                        </div>

                                        <div className="experience-responsibilities">
                                            <ul>
                                                {exp.responsibilities.map((responsibility, idx) => (
                                                    <li key={idx}>{responsibility}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="experience-skills">
                                            {exp.skills.map((skill, idx) => (
                                                <span key={idx} className="skill-tag">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;


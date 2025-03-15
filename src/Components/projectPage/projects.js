import React, { useState, useEffect } from 'react';
import "./projects.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaGithub, FaGlobe, FaMobile, FaLaptopCode, FaRobot, FaSeedling, FaQrcode, FaUserAlt } from 'react-icons/fa';
import img from "../../Assets/projects-image/personalApp.png";
import iSmart from "../../Assets/projects-image/iSmart Integration.png";
import collectorApp from "../../Assets/projects-image/collectorApp.png";
import techFest from "../../Assets/projects-image/techFest.png";
import smartSoil from "../../Assets/projects-image/smartSoil.jpg";
import devanasoftDashboard from "../../Assets/projects-image/devanasoftDashboard.png";
import faceRecognition from "../../Assets/projects-image/faceRecognition.png";
import angriMonitoring from "../../Assets/projects-image/angriMonitoring.png"

const Projects = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const allProjects = [
        {
            id: 1,
            title: "ISmart-Mobile Banking",
            description: "Services Integration and Improvements(Transaction Limit, Chatbot, Internet and Tv services etc.) ",
            category: "Mobile",
            icon: <FaQrcode />,
            image: iSmart,
            links: {
                // github: "https://github.com/yourusername/qr-scanner",
                live: "https://play.google.com/store/apps/details?id=com.devanasoft.ismart&hl=en"
            },
            tags: ["Flutter", "Dart", "Mobile"]
        },
        {
            id: 2,
            title: "Mid-West Tech Fest Website",
            description: "React-based website for Tech Fest with custom image filtering feature to add event frames.",
            category: "Web",
            icon: <FaLaptopCode />,
            image: techFest,
            links: {
                github: "https://github.com/Aayush-Skp/tech-fest",
                live: "https://tech-fest-henna.vercel.app/"
            },
            tags: ["React", "Image Processing", "Event"]
        },
        // {
        //     id: 2,
        //     title: "ChatBot",
        //     description: "Intelligent chatbot application that provides prompt responses and natural conversations.",
        //     category: "Mobile",
        //     icon: <FaRobot />,
        //     image: "/api/placeholder/400/300",
        //     links: {
        //         github: "https://github.com/yourusername/chatbot",
        //         live: "https://your-chatbot-link.com"
        //     },
        //     tags: ["Flutter", "AI", "NLP"]
        // },
        {
            id: 3,
            title: "Collector App",
            description: "CBS money collection app with QR scanning technology, reducing manual errors by 80%.",
            category: "Mobile",
            icon: <FaMobile />,
            image: collectorApp,
            links: {
                // github: "https://github.com/yourusername/collector-app",
                // live: "https://your-collector-app-link.com"
            },
            tags: ["Flutter", "Payment Integration", "QR"]
        },
        {
            id: 4,
            title: "Personal Productivity App",
            description: "All-in-one productivity app with secure chat rooms, AI chatbot, and task management.",
            category: "Mobile",
            icon: <FaUserAlt />,
            image: img,
            links: {
                // github: "https://github.com/Aayush-Skp/Personal_App",
                // live: "https://your-personal-app-link.com"
            },
            tags: ["Flutter", "Firebase", "Task Management", "Custom Notification"]
        },

        {
            id: 5,
            title: "AI Agriculture System",
            description: "Real-time crop monitoring system with 90% disease detection accuracy using TensorFlow Lite.",
            category: "IoT",
            icon: <FaSeedling />,
            image: angriMonitoring,
            links: {
                github: "https://github.com/Aayush-Skp/Disease_Detection_project",
                // live: "https://your-agriculture-app-link.com"
            },
            tags: ["Python", "TensorFlow", "IoT", "ESP32", "Flutter", "HTML/CSS/JS"]
        },

        {
            id: 7,
            title: "Face Recognition System",
            description: "Fully functional and optimized face recognition system with high accuracy.",
            category: "IoT",
            icon: <FaUserAlt />,
            image: faceRecognition,
            links: {
                github: "https://github.com/Aayush-Skp/Face_Recognition_System",
            },
            tags: ["Python", "OpenCV", "Machine Learning"]
        },
        {
            id: 8,
            title: "Smart-Soil Hackathon Project",
            description: "Agricultural app providing soil information, crop recommendations, and weather-based insights.",
            category: "Web",
            icon: <FaSeedling />,
            image: smartSoil,
            links: {
                github: "https://github.com/Aayush-Skp/First_Hackathon_CFC2023OCT",
                // live: "https://smart-soil-nepal.com"
            },
            tags: ["React", "Weather API", "Map API", "NodeJs", "MongoDB", "Redis"]
        },
        {
            id: 9,
            title: "iSmart Devanasoft Dashboard",
            description: "Worked on the initial setup of the DevanaSoft dashboard, including the development of custom components and charts.",
            category: "Web",
            icon: <FaLaptopCode />,
            image: devanasoftDashboard,
            links: {
                // github: "https://github.com/Aayush-Skp/First_Hackathon_CFC2023OCT",
                live: "https://ismart.devanasoft.com.np/ng/#"
            },
            tags: ["Angular", "Map API", "Chart.js",]
        }
    ];

    const [hoveredProject, setHoveredProject] = useState(null);
    const [currentFilter, setCurrentFilter] = useState("All");
    const [filteredProjects, setFilteredProjects] = useState(allProjects);
    const [key, setKey] = useState(0); // For forcing carousel re-render

    useEffect(() => {
        if (currentFilter === "All") {
            setFilteredProjects(allProjects);
        } else {
            const filtered = allProjects.filter(project => project.category === currentFilter);
            setFilteredProjects(filtered);
        }
        setKey(prevKey => prevKey + 1);
    }, [currentFilter]);

    const handleMouseEnter = (id) => {
        setHoveredProject(id);
    };

    const handleMouseLeave = () => {
        setHoveredProject(null);
    };

    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
    };

    return (
        <section className="projects" id="projects">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="projects-bx">
                            <h2>Project Showcase</h2>
                            <p>My applications and systems across multiple platforms.</p>

                            <div className="filter-tabs">
                                <button
                                    className={`filter-btn ${currentFilter === "All" ? "active" : ""}`}
                                    onClick={() => handleFilterChange("All")}
                                >
                                    All
                                </button>
                                <button
                                    className={`filter-btn ${currentFilter === "Mobile" ? "active" : ""}`}
                                    onClick={() => handleFilterChange("Mobile")}
                                >
                                    Mobile
                                </button>
                                <button
                                    className={`filter-btn ${currentFilter === "Web" ? "active" : ""}`}
                                    onClick={() => handleFilterChange("Web")}
                                >
                                    Web
                                </button>
                                <button
                                    className={`filter-btn ${currentFilter === "IoT" ? "active" : ""}`}
                                    onClick={() => handleFilterChange("IoT")}
                                >
                                    IoT
                                </button>
                            </div>

                            {filteredProjects.length > 0 ? (
                                <Carousel
                                    key={key}
                                    responsive={responsive}
                                    infinite={filteredProjects.length > 3}
                                    autoPlay={false}
                                    keyBoardControl={true}
                                    customTransition="all .5s"
                                    transitionDuration={500}
                                    containerClass="carousel-container"
                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                    className="projects-slider"
                                >
                                    {filteredProjects.map((project) => (
                                        <div
                                            className="project-card"
                                            key={project.id}
                                            onMouseEnter={() => handleMouseEnter(project.id)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <div className="project-image">
                                                <img src={project.image} alt={project.title} />
                                                <div className={`project-overlay ${hoveredProject === project.id ? 'active' : ''}`}>
                                                    <div className="project-links">
                                                        {project.links.github && (
                                                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-link github">
                                                                <FaGithub /> Repository
                                                            </a>
                                                        )}
                                                        {project.links.live && (
                                                            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="project-link live">
                                                                <FaGlobe /> Live Demo
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="project-info">
                                                <div className="project-category">
                                                    <span className="category-icon">{project.icon}</span>
                                                    {project.category}
                                                </div>
                                                <h3>{project.title}</h3>
                                                <p>{project.description}</p>
                                                <div className="project-tags">
                                                    {project.tags.map((tag, index) => (
                                                        <span key={index} className="tag">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Carousel>
                            ) : (
                                <div className="no-projects">
                                    <p>No projects found in this category.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
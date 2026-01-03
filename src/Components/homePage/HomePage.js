import React, { useEffect, useState, useRef } from 'react';
import "./HomePage.css"
import img from "../../Assets/images/homebg.webp";
import About from '../aboutPage/About';
import Skills from "../skillsPage/Skills";
import Projects from '../projectPage/projects';
import Experience from '../experiencePage/Experience';
import Contact from '../contactPage/contact';
import SocialLinks from '../socialLinks/SocialLinks';

export const HomePage = () => {
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const introductionRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize particles
    const initParticles = () => {
      if (introductionRef.current) {
        const rect = introductionRef.current.getBoundingClientRect();
        const newParticles = Array(60).fill(0).map((_, i) => ({
          id: i,
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 3 + Math.random() * 4,
          opacity: 0.5 + Math.random() * 0.5,
          baseOpacity: 0.5 + Math.random() * 0.5,
        }));
        setParticles(newParticles);
        particlesRef.current = newParticles;
      }
    };

    initParticles();
    window.addEventListener('resize', initParticles);
    return () => window.removeEventListener('resize', initParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (introductionRef.current) {
        const rect = introductionRef.current.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const animate = () => {
      if (introductionRef.current && particlesRef.current.length > 0) {
        const rect = introductionRef.current.getBoundingClientRect();
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;
        const mouseRadius = 150; // Interaction radius

        particlesRef.current = particlesRef.current.map(particle => {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRadius) {
            // Push particles away from mouse with stronger force
            const force = (mouseRadius - distance) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            particle.vx -= Math.cos(angle) * force * 0.5;
            particle.vy -= Math.sin(angle) * force * 0.5;
            // Increase opacity when near mouse
            particle.opacity = Math.min(1, particle.baseOpacity + force * 0.5);
          } else {
            // Gradually return to base opacity
            particle.opacity = particle.baseOpacity;
          }

          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Apply friction
          particle.vx *= 0.98;
          particle.vy *= 0.98;

          // Boundary bounce
          if (particle.x < 0 || particle.x > rect.width) {
            particle.vx *= -0.8;
            particle.x = Math.max(0, Math.min(rect.width, particle.x));
          }
          if (particle.y < 0 || particle.y > rect.height) {
            particle.vy *= -0.8;
            particle.y = Math.max(0, Math.min(rect.height, particle.y));
          }

          return particle;
        });

        setParticles([...particlesRef.current]);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const introduction = introductionRef.current;
    if (introduction) {
      introduction.addEventListener('mousemove', handleMouseMove);
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (introduction) {
        introduction.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const toggleBtn = document.querySelector('.toggle_btn');
    const dropDownMenu = document.querySelector('.dropdown_menu');
    const navbar = document.querySelector('.navbar');
    const intermediateContainer = document.querySelector('.intermediate-container');

    let prevScrollPos = window.pageYOffset;
    let isNavbarHidden = false;

    toggleBtn.onclick = () => {
      dropDownMenu.classList.toggle('open');
    };

    const checkNavbarVisibility = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > intermediateContainer.offsetTop) {
        if (!isNavbarHidden) {
          navbar.style.transform = 'scale(0)';
          dropDownMenu.style.transform = 'scale(0)';
          isNavbarHidden = true;
        }
      } else {
        if (isNavbarHidden) {
          navbar.style.transform = 'scale(1)';
          dropDownMenu.style.transform = 'scale(1)';
          isNavbarHidden = false;
        }
      }

      if (currentScrollPos < prevScrollPos) {
        navbar.style.transform = 'scale(1)';
        dropDownMenu.style.transform = 'scale(1)';
        isNavbarHidden = false;
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', checkNavbarVisibility);

    return () => {
      window.removeEventListener('scroll', checkNavbarVisibility);
    };
  }, []);

  return (
    <>
      <header>
        <div className="navbar">
          <div className="logo"><a href="#homepage_section">Aayush SKP</a></div>
          <ul className="links">
            <li><a href="#about_section">About</a></li>
            <li><a href="#skill_section">Skills</a></li>
            <li><a href="#projects_section">Projects</a></li>
            <li><a href="#experience_section">Experience</a></li>
            <li><a href="#contact_section">Contacts</a></li>
          </ul>
          <a href="https://www.linkedin.com/in/krishna-panthi/" className="connect_btn" target="_blank" rel="noopener noreferrer">Connect With Me</a>
          <div className="toggle_btn">
            <i className="Drop_down_btn"></i>
          </div>
        </div>
        <div className="dropdown_menu">
          <li><a href="#about_section">About</a></li>
          <li><a href="#skill_section">Skills</a></li>
          <li><a href="#projects_section">Projects</a></li>
          <li><a href="#experience_section">Experience</a></li>
          <li><a href="#contact_section">Contacts</a></li>
          <li><a href="https://www.linkedin.com/in/krishna-panthi/" className="connect_btn" target="_blank" rel="noopener noreferrer">Connect With Me</a></li>
        </div>
      </header>

      <div className="introduction" id='homepage_section' ref={introductionRef}>
        <div className="golden-dust-container">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="golden-dust-particle"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                boxShadow: `0 0 ${particle.size * 4}px rgba(255, 215, 0, ${particle.opacity * 0.8}), 0 0 ${particle.size * 2}px rgba(248, 200, 100, ${particle.opacity * 0.6})`,
              }}
            />
          ))}
          <div 
            className="mouse-glow"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
            }}
          />
        </div>
        <div className="my_title">
          <p>Krishna Panthi<br />Web/App Developer</p>
        </div>
        <div className="image_container">
          <img src={img} alt="Background Image" />
        </div>
      </div>
      <div className="intermediate-container" id='about_section'>
        <About />
      </div>
      <div className="container-third" id='skill_section'>
        <Skills />
      </div>
      <div className="container-fourth" id='projects_section'>
        <Projects />
      </div>
      <div className="container-experience" id='experience_section'>
        <Experience />
      </div>
      <footer>
        <div className="footer" id="contact_section">
          <Contact />
        </div>
      </footer>
      <SocialLinks />
    </>
  );
}

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
  const [showMouseGlow, setShowMouseGlow] = useState(true);
  const introductionRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Ensure page starts at top on load and prevent scroll issues
  useEffect(() => {
    // Prevent scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top on mount
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    };
    
    // Immediate scroll
    scrollToTop();
    
    // Also scroll after a tiny delay to catch any layout shifts
    const timeoutId = setTimeout(scrollToTop, 0);
    
    // Handle hash links - if there's a hash, scroll after layout is ready
    if (window.location.hash) {
      const hashElement = document.querySelector(window.location.hash);
      if (hashElement) {
        setTimeout(() => {
          hashElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    
    return () => clearTimeout(timeoutId);
  }, []);

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
          twinkleDelay: Math.random() * 3, // Random delay for twinkling
          twinkleSpeed: 2 + Math.random() * 3, // Random twinkle speed
          scale: 1,
          glowIntensity: 0.7,
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
        const relativeY = e.clientY - rect.top;
        const navbarThreshold = 150; // Hide glow when within 150px from top
        
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: relativeY
        };
        setMousePos({
          x: e.clientX - rect.left,
          y: relativeY
        });
        
        // Hide mouse glow near navbar
        setShowMouseGlow(relativeY > navbarThreshold);
      }
    };

    const animate = () => {
      if (introductionRef.current && particlesRef.current.length > 0) {
        const rect = introductionRef.current.getBoundingClientRect();
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;
        const mouseRadius = 150; // Interaction radius
        const time = Date.now() * 0.001; // Time in seconds

        particlesRef.current = particlesRef.current.map(particle => {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Twinkling effect - each particle twinkles independently
          const twinkle = Math.sin(time * particle.twinkleSpeed + particle.twinkleDelay) * 0.4 + 0.6;
          const twinkleIntensity = Math.max(0.3, twinkle); // Minimum visibility
          let twinkleOpacity = particle.baseOpacity * twinkleIntensity;
          const twinkleScale = 0.9 + (twinkle * 0.2); // Scale between 0.9 and 1.1
          const twinkleGlow = twinkle * 0.8; // Glow intensity based on twinkle

          if (distance < mouseRadius) {
            // Push particles away from mouse with stronger force
            const force = (mouseRadius - distance) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            particle.vx -= Math.cos(angle) * force * 0.5;
            particle.vy -= Math.sin(angle) * force * 0.5;
            // Increase opacity when near mouse (combine with twinkle)
            particle.opacity = Math.min(1, twinkleOpacity + force * 0.5);
            particle.scale = twinkleScale;
            particle.glowIntensity = Math.min(1, twinkleGlow + force * 0.3);
          } else {
            // Use twinkling opacity
            particle.opacity = twinkleOpacity;
            particle.scale = twinkleScale;
            particle.glowIntensity = twinkleGlow;
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
                transform: `translate(-50%, -50%) scale(${particle.scale || 1})`,
                boxShadow: `0 0 ${particle.size * 5 * (particle.glowIntensity || 0.7)}px rgba(255, 215, 0, ${(particle.glowIntensity || 0.7) * 0.9}), 0 0 ${particle.size * 3 * (particle.glowIntensity || 0.7)}px rgba(248, 200, 100, ${(particle.glowIntensity || 0.7) * 0.7}), 0 0 ${particle.size * 1.5 * (particle.glowIntensity || 0.7)}px rgba(255, 255, 255, ${(particle.glowIntensity || 0.7) * 0.5})`,
              }}
            />
          ))}
          {showMouseGlow && (
            <div 
              className="mouse-glow"
              style={{
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
              }}
            />
          )}
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

import React, { useEffect, useState, useRef } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../../utils/device';
import "./HomePage.css"
import img from "../../Assets/images/homebg.webp";
import About from '../aboutPage/About';
import Skills from "../skillsPage/Skills";
import Projects from '../projectPage/projects';
import Experience from '../experiencePage/Experience';
import Contact from '../contactPage/contact';
import SocialLinks from '../socialLinks/SocialLinks';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';

const LINKEDIN_URL = 'https://www.linkedin.com/in/krishna-panthi/';
const NAV_LINKS = [
  ['#about_section', 'About'],
  ['#skill_section', 'Skills'],
  ['#projects_section', 'Projects'],
  ['#experience_section', 'Experience'],
  ['#contact_section', 'Contacts'],
];

// The original three-layer golden glow (kept as-is for desktop).
const glowShadow = (size, g) =>
  `0 0 ${size * 5 * g}px rgba(255, 215, 0, ${g * 0.9}), 0 0 ${size * 3 * g}px rgba(248, 200, 100, ${g * 0.7}), 0 0 ${size * 1.5 * g}px rgba(255, 255, 255, ${g * 0.5})`;

export const HomePage = () => {
  const [particles, setParticles] = useState([]);
  // Mouse interaction only makes sense with a real mouse.
  const [finePointer] = useState(() => hasFinePointer());
  const introductionRef = useRef(null);
  const particlesRef = useRef([]);
  const particleEls = useRef([]);
  const animationFrameRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);

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
    // Phones get fewer, cheaper particles; desktop keeps the full effect.
    const count = finePointer ? 60 : 26;
    const initParticles = () => {
      if (introductionRef.current) {
        const rect = introductionRef.current.getBoundingClientRect();
        const newParticles = Array(count).fill(0).map((_, i) => ({
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
    // Mobile browsers fire resize when the URL bar shows/hides; only rebuild
    // when the width actually changes so the dust doesn't jump while scrolling.
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        initParticles();
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [finePointer]);

  useEffect(() => {
    const introduction = introductionRef.current;
    if (!introduction) return undefined;
    const reduceMotion = prefersReducedMotion();
    let visible = true;
    let running = false;
    let frame = 0;

    const handleMouseMove = (e) => {
      const rect = introduction.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y };
    };

    // Particles are moved by writing styles straight to the DOM instead of
    // re-rendering React every frame — same look, a fraction of the work.
    const animate = () => {
      animationFrameRef.current = null;
      if (!visible) { running = false; return; }
      const list = particlesRef.current;
      if (list.length > 0) {
        const rect = introduction.getBoundingClientRect();
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;
        const mouseRadius = 150; // Interaction radius
        const time = Date.now() * 0.001; // Time in seconds
        frame++;

        for (let i = 0; i < list.length; i++) {
          const particle = list[i];
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Twinkling effect - each particle twinkles independently
          const twinkle = Math.sin(time * particle.twinkleSpeed + particle.twinkleDelay) * 0.4 + 0.6;
          const twinkleIntensity = Math.max(0.3, twinkle); // Minimum visibility
          const twinkleOpacity = particle.baseOpacity * twinkleIntensity;
          const twinkleScale = 0.9 + (twinkle * 0.2); // Scale between 0.9 and 1.1
          const twinkleGlow = twinkle * 0.8; // Glow intensity based on twinkle

          if (distance < mouseRadius) {
            // Push particles away from mouse with stronger force
            const force = (mouseRadius - distance) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            particle.vx -= Math.cos(angle) * force * 0.5;
            particle.vy -= Math.sin(angle) * force * 0.5;
            particle.opacity = Math.min(1, twinkleOpacity + force * 0.5);
            particle.scale = twinkleScale;
            particle.glowIntensity = Math.min(1, twinkleGlow + force * 0.3);
          } else {
            particle.opacity = twinkleOpacity;
            particle.scale = twinkleScale;
            particle.glowIntensity = twinkleGlow;
          }

          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx *= 0.98;
          particle.vy *= 0.98;

          if (particle.x < 0 || particle.x > rect.width) {
            particle.vx *= -0.8;
            particle.x = Math.max(0, Math.min(rect.width, particle.x));
          }
          if (particle.y < 0 || particle.y > rect.height) {
            particle.vy *= -0.8;
            particle.y = Math.max(0, Math.min(rect.height, particle.y));
          }

          const el = particleEls.current[i];
          if (el) {
            // translate3d keeps movement on the GPU compositor
            el.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0) translate(-50%, -50%) scale(${particle.scale})`;
            el.style.opacity = particle.opacity;
            // The multi-layer glow is costly to repaint, so each particle refreshes
            // it every 4th frame (staggered); the CSS box-shadow transition
            // smooths it. Desktop only — phones use a fixed glow.
            if (finePointer && (frame + i) % 4 === 0) el.style.boxShadow = glowShadow(particle.size, particle.glowIntensity);
          }
        }
      }
      if (!reduceMotion) animationFrameRef.current = requestAnimationFrame(animate);
      else running = false;
    };

    const start = () => {
      if (running || !visible) return;
      running = true;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Stop animating once the hero is scrolled away or the tab is hidden.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      if (visible) start();
    });
    io.observe(introduction);
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    if (finePointer) introduction.addEventListener('mousemove', handleMouseMove, { passive: true });
    start();

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      introduction.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [finePointer, particles]);

  // Hide the navbar while scrolling down past the hero; any scroll up brings it back.
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    let hidden = false;

    const onScroll = () => {
      const current = window.pageYOffset;
      const heroEnd = introductionRef.current ? introductionRef.current.offsetHeight : 0;
      let next = hidden;
      if (current < prevScrollPos) next = false;
      else if (current > prevScrollPos) next = current > heroEnd;
      prevScrollPos = current;
      if (next !== hidden) {
        hidden = next;
        setNavHidden(next);
        if (next) setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape, a tap outside it, or when the screen gets wide.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    const onPointer = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setMenuOpen(false);
    };
    const wide = window.matchMedia('(min-width: 992px)');
    const onWide = (e) => { if (e.matches) setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    wide.addEventListener('change', onWide);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      wide.removeEventListener('change', onWide);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header ref={headerRef} className={`site-header${navHidden ? ' is-hidden' : ''}`}>
        <nav className="navbar" aria-label="Primary">
          <a href="#homepage_section" className="logo">Aayush SKP</a>
          <ul className="links">
            {NAV_LINKS.map(([href, label]) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
          </ul>
          <a href={LINKEDIN_URL} className="connect_btn" target="_blank" rel="noopener noreferrer">Connect With Me</a>
          <button
            type="button"
            className="toggle_btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <HiX aria-hidden="true" /> : <HiMenuAlt3 aria-hidden="true" />}
          </button>
        </nav>
        <div id="mobile-menu" className={`dropdown_menu${menuOpen ? ' open' : ''}`}>
          <ul>
            {NAV_LINKS.map(([href, label]) => (
              <li key={href}><a href={href} onClick={closeMenu}>{label}</a></li>
            ))}
          </ul>
          <a href={LINKEDIN_URL} className="connect_btn" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Connect With Me</a>
        </div>
      </header>

      <section className="introduction" id='homepage_section' ref={introductionRef}>
        <div className="golden-dust-container">
          {particles.map((particle, i) => (
            <div
              key={particle.id}
              ref={(el) => { particleEls.current[i] = el; }}
              className="golden-dust-particle"
              style={{
                left: 0,
                top: 0,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                transform: `translate3d(${particle.x}px, ${particle.y}px, 0) translate(-50%, -50%)`,
                boxShadow: finePointer
                  ? glowShadow(particle.size, particle.glowIntensity)
                  : `0 0 ${particle.size * 2.5}px rgba(255, 215, 0, 0.6)`,
              }}
            />
          ))}
        </div>
        <div className="image_container">
          <img src={img} alt="" fetchpriority="high" decoding="async" />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Krishna Panthi</h1>
          <p className="hero-role">Web / App Developer</p>
          <div className="hero-actions">
            <a href="#projects_section" className="hero-btn hero-btn-primary">
              View Projects <FiArrowRight aria-hidden="true" />
            </a>
            <a href="#contact_section" className="hero-btn hero-btn-ghost">Get in Touch</a>
          </div>
        </div>
      </section>
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

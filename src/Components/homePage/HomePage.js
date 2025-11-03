import React, { useEffect } from 'react';
import "./HomePage.css"
import img from "../../Assets/images/homebg.jpg";
import About from '../aboutPage/About';
import Skills from "../skillsPage/Skills";
import Projects from '../projectPage/projects';
import Experience from '../experiencePage/Experience';
import Contact from '../contactPage/contact';
import SocialLinks from '../socialLinks/SocialLinks';

export const HomePage = () => {
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

      <div className="introduction" id='homepage_section'>
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

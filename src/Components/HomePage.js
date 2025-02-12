import React, { useEffect } from 'react';
import "./HomePage.css"
import img from "./homebg.jpg"
import About from './About';
import  Skills  from "./Skills"

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
          <div className="logo"><a href="#">Aayush SKP</a></div>
          <ul className="links">
            <li><a href="#">About</a></li>
            <li><a href="#">Skills</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Contacts</a></li>
          </ul>
          <a href="#" className="connect_btn">Connect With Me</a>
          <div className="toggle_btn">
            <i className="Drop_down_btn"></i>
          </div>
        </div>
        <div className="dropdown_menu">
          <li><a href="#">About</a></li>
          <li><a href="#">Skills</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Contacts</a></li>
          <li><a href="#" className="connect_btn">Connect With Me</a></li>
        </div>
      </header>

      <div className="introduction">
        <div className="my_title">
          <p>Krishna Panthi<br />Web Developer</p>
        </div>
        <div className="image_container">
          <img src={img} alt="Background Image" />
        </div>
      </div>

      <div className="intermediate-container">
        <About/>
      </div>

      <div className="container-third">
        <Skills/>
      </div>

      <div className="container-fourth">DreamForge <br />Construction Zone</div>

      <footer>
        <div className="footer"></div>
      </footer>
    </>
  );
}

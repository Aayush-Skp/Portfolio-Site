import React, { useEffect, useState } from 'react'
import "./About.css"
import img from "./../../Assets/images/my_transpatent.webp"
import { hasFinePointer } from '../../utils/device';

const About = () => {
  const [finePointer] = useState(() => hasFinePointer());
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [petals, setPetals] = useState([]);
  const textContent = "Passionate about turning ideas into reality through code. Every project is an opportunity to push boundaries, solve challenges, and create something impactful. Determined to grow, adapt, and build, I am always on a journey to turn visions into digital solutions that make a difference.";
  const words = textContent.split(' ');

  // Word-by-word reading animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWordIndex((prevIndex) => {
        return (prevIndex + 1) % words.length;
      });
    }, 350); // Change word every 350ms for slower, natural reading pace

    return () => clearInterval(interval);
  }, [words.length]);

  // Create falling petals
  useEffect(() => {
    const petalColors = [
      'rgba(0, 0, 0, 0.3)', // Light black
      'rgba(0, 0, 0, 0.25)', // Lighter black
      'rgba(0, 0, 0, 0.35)', // Slightly darker
      'rgba(0, 0, 0, 0.2)', // Very light black
      'rgba(20, 20, 20, 0.3)', // Slightly gray-black
      'rgba(0, 0, 0, 0.28)', // Light black variant
    ];

    const createPetals = () => {
      // fewer falling petals on touch devices keeps scrolling smooth
      const newPetals = Array(finePointer ? 25 : 10).fill(0).map((_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 10,
        size: 14 + Math.random() * 16, // More variable and bigger: 14-30px
        rotation: Math.random() * 360,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      }));
      setPetals(newPetals);
    };

    createPetals();
  }, [finePointer]);

  return (
    <>
      <div className="about-container">
        <div className="petals-container">
          {petals.map((petal) => (
            <div
              key={petal.id}
              className="petal"
              style={{
                left: `${petal.left}%`,
                animationDelay: `${petal.delay}s`,
                animationDuration: `${petal.duration}s`,
                width: `${petal.size}px`,
                height: `${petal.size}px`,
                borderColor: petal.color,
                transform: `rotate(${petal.rotation}deg)`,
              }}
            />
          ))}
        </div>
        <div className="Description">
          <div className="text-content">
            {words.map((word, index) => (
              <span
                key={index}
                className={`word ${index === activeWordIndex ? 'active' : ''}`}
              >
                {word}{' '}
              </span>
            ))}
          </div>
        </div>
        <div className="my-dp-box">
          <img src={img} alt="My-DP" loading="lazy" decoding="async" />
        </div>
      </div>
    </>
  );
}

export default About
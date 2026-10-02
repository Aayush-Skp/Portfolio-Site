import React, { useEffect, useState, useRef } from 'react'
import "./About.css"
import img from "./../../Assets/images/my_transpatent.webp"
import { hasFinePointer } from '../../utils/device';

const About = () => {
  // The cursor trail follows a mouse; touch screens don't get one.
  const [finePointer] = useState(() => hasFinePointer());
  const coordsRef = useRef({ x: -100, y: -100 });
  const [circles, setCircles] = useState([]);
  const circleRefs = useRef([]);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [petals, setPetals] = useState([]);
  const textContent = "Passionate about turning ideas into reality through code. Every project is an opportunity to push boundaries, solve challenges, and create something impactful. Determined to grow, adapt, and build, I am always on a journey to turn visions into digital solutions that make a difference.";
  const words = textContent.split(' ');

  const colors = [
    "#ffb56b",
    "#fdaf69",
    "#f89d63",
    "#f59761",
    "#ef865e",
    "#ec805d",
    "#e36e5c",
    "#df685c",
    "#d5585c",
    "#d1525c",
    "#c5415d",
    "#c03b5d",
    "#b22c5e",
    "#ac265e",
    "#9c155f",
    "#950f5f",
    "#830060",
    "#7c0060",
    "#680060",
    "#60005f",
    "#48005f",
    "#3d005e"
  ];

  useEffect(() => {
    if (!finePointer) return;
    const circleElements = Array(20).fill(0).map((_, index) => (
      <div
        key={index}
        className="circle"
        ref={(ref) => (circleRefs.current[index] = ref)}
        style={{
          backgroundColor: colors[index % colors.length],
          left: 0,
          top: 0,
          transform: `scale(${(20 - index) / 20})`
        }}
      />
    ));
    setCircles(circleElements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finePointer]);

  useEffect(() => {
    if (!finePointer) return;
    const handleMouseMove = (e) => {
      coordsRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [finePointer]);

  useEffect(() => {
    if (!finePointer || circles.length === 0) return;
    let animationFrameId;
    // Same trailing motion as before, but one long-lived loop that keeps the
    // positions in memory (no restart per mouse move, no layout reads).
    const positions = circleRefs.current.map(() => ({ x: -100, y: -100 }));
    function animateCircles() {
      let x = coordsRef.current.x;
      let y = coordsRef.current.y;
      circleRefs.current.forEach((circle, index) => {
        if (!circle) return;
        circle.style.left = x + "px";
        circle.style.top = y + "px";
        positions[index].x = x;
        positions[index].y = y;
        const next = positions[index + 1] || positions[0];
        x += (next.x - x) * 0.5;
        y += (next.y - y) * 0.5;
      });
      animationFrameId = requestAnimationFrame(animateCircles);
    }
    animateCircles();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [circles, finePointer]);

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
      <div style={{ position: 'absolute' }}>
        {circles}
      </div>
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
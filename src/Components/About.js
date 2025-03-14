import React, { useEffect, useState, useRef } from 'react'
import "./About.css"
import img from "./../Assets/images/my_transpatent.png"

const About = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [circles, setCircles] = useState([]);
  const circleRefs = useRef([]);
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
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let animationFrameId;
    function animateCircles() {
      let x = coords.x;
      let y = coords.y;
      circleRefs.current.forEach((circle, index) => {
        circle.style.left = x + 0 + "px";
        circle.style.top = y + 0 + "px";
        const nextCircle = circleRefs.current[index + 1] || circleRefs.current[0];
        x += (nextCircle.offsetLeft - x) * 0.5;
        y += (nextCircle.offsetTop - y) * 0.5;
      });
      animationFrameId = requestAnimationFrame(animateCircles);
    }
    animateCircles();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [circles, coords]);

  return (
    <>
      <div>
        {circles}
      </div>
      <div className="Description">
        Passionate about turning ideas into reality through code.
        Every project is an opportunity to push boundaries, solve
        challenges, and create something impactful. Determined to
        grow, adapt, and build, I am always on a journey to turn visions
        into digital solutions that make a difference.
      </div>
      <div className="my-dp-box">
        <img src={img} alt="My-DP" /> </div>

    </>
  );
}

export default About
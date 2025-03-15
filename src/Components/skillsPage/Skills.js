import React from 'react';
import "./skills.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Skills = () => {
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

  const skillsData = [
    {
      category: "Frontend",
      skills: [
        { name: "React", percentage: 65 },
        { name: "Angular", percentage: 85 },
        { name: "HTML/CSS", percentage: 90 },
        { name: "JavaScript", percentage: 85 },
        { name: "TypeScript", percentage: 80 },
      ]
    },
    {
      category: "App Development",
      skills: [
        { name: "Flutter/Dart", percentage: 90 },
        { name: "MySQL", percentage: 75 }
      ]
    },
    {
      category: "Design",
      skills: [
        { name: "Figma", percentage: 85 },
        { name: "Photoshop", percentage: 90 }
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Express", percentage: 65 },
        { name: "Node.js", percentage: 65 },
        { name: "MongoDB", percentage: 50 },
        { name: "MySQL", percentage: 75 }
      ]
    },
    {
      category: "Version Control",
      skills: [
        { name: "Git/GitHub", percentage: 90 }
      ]
    }
  ];

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx">
              <h2>Technical Skills</h2>
              <p>Proficient in various technologies across Web development, mobile development, and design.</p>

              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                className="skill-slider"
              >
                {skillsData.map((categoryData, index) => (
                  <div className="skill-category" key={index}>
                    <h3 className="category-title">{categoryData.category}</h3>
                    <div className="skills-grid">
                      {categoryData.skills.map((skill, skillIndex) => (
                        <div className="skill-item" key={skillIndex}>
                          <div className="skill-progress">
                            <CircularProgressbar
                              value={skill.percentage}
                              text={`${skill.percentage}%`}
                              styles={buildStyles({
                                textSize: '16px',
                                pathColor: `rgba(235, 235, 161, ${skill.percentage / 100})`,
                                textColor: '#f88c00',
                                trailColor: '#151515',
                                backgroundColor: '#3e98c7',
                              })}
                            />
                          </div>
                          <h5>{skill.name}</h5>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
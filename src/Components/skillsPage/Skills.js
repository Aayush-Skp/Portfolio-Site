import React, { useEffect, useRef } from 'react';
import "./skills.css";

const Skills = () => {
  const skillRefs = useRef([]);

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

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector('.progress-fill');
          const percentage = entry.target.dataset.percentage;
          if (progressBar && percentage) {
            // Use requestAnimationFrame for smooth animation
            requestAnimationFrame(() => {
              setTimeout(() => {
                progressBar.style.width = `${percentage}%`;
              }, 200);
            });
          }
        }
      });
    }, observerOptions);

    // Observe all skill items
    Object.values(skillRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(skillRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="skill" id="skills">
      <div className="skill-container">
        <div className="skill-bx">
          <h2>Technical Skills</h2>
          <p>Proficient in various technologies across Web development, mobile development, and design.</p>

          <div className="skills-categories">
            {skillsData.map((categoryData, categoryIndex) => (
              <div 
                className="skill-category-card" 
                key={categoryIndex}
                style={{ '--category-index': categoryIndex }}
              >
                <div className="category-header">
                  <h3 className="category-title">{categoryData.category}</h3>
                </div>
                <div className="skills-list">
                  {categoryData.skills.map((skill, skillIndex) => (
                    <div 
                      className="skill-item" 
                      key={skillIndex}
                      style={{ '--skill-index': skillIndex }}
                      ref={(el) => {
                        const key = `${categoryIndex}-${skillIndex}`;
                        if (el) {
                          skillRefs.current[key] = el;
                          el.dataset.percentage = skill.percentage;
                        } else {
                          delete skillRefs.current[key];
                        }
                      }}
                    >
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.percentage}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
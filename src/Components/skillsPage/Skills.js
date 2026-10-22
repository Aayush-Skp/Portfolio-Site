import React, { useEffect, useRef } from 'react';
import {
  SiReact, SiAngular, SiHtml5, SiJavascript, SiTypescript, SiFlutter, SiMysql,
  SiFigma, SiAdobephotoshop, SiExpress, SiNodedotjs, SiMongodb, SiGit,
  SiNextdotjs, SiTailwindcss, SiFirebase, SiSqlite, SiDart, SiPython,
  SiTensorflow, SiOpencv,
} from 'react-icons/si';
import "./skills.css";

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React", percentage: 65, icon: SiReact },
      { name: "Angular", percentage: 85, icon: SiAngular },
      { name: "HTML/CSS", percentage: 90, icon: SiHtml5 },
      { name: "JavaScript", percentage: 85, icon: SiJavascript },
      { name: "TypeScript", percentage: 80, icon: SiTypescript },
      { name: "Next.js", percentage: 70, icon: SiNextdotjs },
      { name: "Tailwind CSS", percentage: 75, icon: SiTailwindcss },
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Express", percentage: 65, icon: SiExpress },
      { name: "Node.js", percentage: 65, icon: SiNodedotjs },
      { name: "MongoDB", percentage: 50, icon: SiMongodb },
      { name: "MySQL", percentage: 75, icon: SiMysql }
    ]
  },
  {
    category: "App Development",
    skills: [
      { name: "Flutter/Dart", percentage: 90, icon: SiFlutter },
      { name: "BLoC", percentage: 75, icon: SiDart },
      { name: "Firebase", percentage: 70, icon: SiFirebase },
      { name: "SQLite", percentage: 70, icon: SiSqlite }
    ]
  },
  {
    category: "AI / ML",
    skills: [
      { name: "Python", percentage: 70, icon: SiPython },
      { name: "TensorFlow", percentage: 55, icon: SiTensorflow },
      { name: "OpenCV", percentage: 60, icon: SiOpencv }
    ]
  },
  {
    category: "Design & Tools",
    skills: [
      { name: "Figma", percentage: 85, icon: SiFigma },
      { name: "Photoshop", percentage: 90, icon: SiAdobephotoshop },
      { name: "Git/GitHub", percentage: 90, icon: SiGit }
    ]
  }
];

const Skills = () => {
  const gridRef = useRef(null);

  // Fill each card's bars the first time the card scrolls into view.
  useEffect(() => {
    const cards = gridRef.current ? gridRef.current.querySelectorAll('.skill-category-card') : [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skill" id="skills">
      <div className="skill-container">
        <div className="skill-bx">
          <h2>Technical Skills</h2>
          <p>Proficient in various technologies across Web development, mobile development, and design.</p>

          <div className="skills-categories" ref={gridRef}>
            {skillsData.map((categoryData) => (
              <div
                className={`skill-category-card${categoryData.skills.length >= 5 ? ' is-wide' : ''}`}
                key={categoryData.category}
              >
                <div className="category-header">
                  <h3 className="category-title">{categoryData.category}</h3>
                  <span className="category-count">{String(categoryData.skills.length).padStart(2, '0')}</span>
                </div>
                <ul className="skills-list">
                  {categoryData.skills.map(({ name, percentage, icon: Icon }) => (
                    <li className="skill-item" key={name}>
                      <div className="skill-header">
                        <span className="skill-name">
                          <Icon className="skill-icon" aria-hidden="true" />
                          {name}
                        </span>
                        <span className="skill-percentage">{percentage}%</span>
                      </div>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        aria-label={name}
                        aria-valuenow={percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div className="progress-fill" style={{ '--level': percentage / 100 }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

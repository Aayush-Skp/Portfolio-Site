import React from 'react'
import "./skills.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import meter1 from "../Assets/images/meter1.svg"

const Skills = () => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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

  return (
    <section className="skill" id="skills">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="skill-bx">
            <h2>Skills</h2>
            <p>....................</p>
            <Carousel responsive={responsive} infinite={true} className="skill-slider">
              <div className="item">
                <img src={meter1} alt="Image" />
                <h5>FrontEnd</h5>
              </div>
              <div className="item">
                <img src={meter1} alt="Image" />
                <h5>BackEnd</h5>
              </div>
              <div className="item">
                <img src={meter1} alt="Image" />
                <h5>Graphic Design</h5>
              </div>
              <div className="item">
                <img src={meter1} alt="Image" />
                <h5>Video Editing</h5>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
export default Skills
import React from "react";
import "./TestimonialCard.css";

function TestimonialCard(props) {
  return (
    <div className="item">
      <div className="testimonial-item">
        <div className="img-thumb">
          <img src={props.img} alt="" />
        </div>
        <div className="content">
          <h2>
            <a href="/about-us">{props.title}</a>
          </h2>
          <p className="description">
            {props.description}
          </p>
          <h3>
            <a href="/about-us">{props.desgintation}</a>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;

import React from "react";
import "./ServiceCard.css";

function ServiceCard(props) {
  return (
    <div className="col-md-6 col-lg-4 col-xs-12">
      <div className="services-item wow fadeInRight" data-wow-delay="0.2s">
        <div className="icon">
          <i className={props.icon}></i>
        </div>
        <div className="services-content">
          <h3>
            <a href="/about-us">{props.title}</a>
          </h3>
          <p>
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;

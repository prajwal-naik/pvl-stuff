import React from "react";
import "./CounterCard.css";

function CounterCard(props) {
  return (
    <div className="col-md-3 col-sm-6 work-counter-widget text-center">
      <div className="counter">
        <div className="icon">
          <i className={props.icon}></i>
        </div>
        <h2 className="counterUp">{props.count}</h2>
        <p>{props.title}</p>
      </div>
    </div>
  );
}

export default CounterCard;
